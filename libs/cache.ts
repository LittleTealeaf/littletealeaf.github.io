import path from "path";
import { stringify, parse } from "zipson";
import Sha1 from "sha1";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

const VERSION: number = 2;

type Cache = {
  value: Object;
  expires: number;
  duration: number;
  version: number;
};

const hashKeys = (keys: Object): string =>
  Sha1(
    Object.entries(keys)
      .map(([key, value]) => `${key}${value}`)
      .join("")
  );

const getDirectory = (type: Array<string>): string => path.join("cache", ...type);

const getFile = (type: Array<string>, keys: Object): string => path.join(getDirectory(type), `${hashKeys(keys)}.cache`);

const getCache = (type: Array<string>, keys: Object): Cache | null => {
  const filePath = getFile(type, keys);
  const cache: Cache = existsSync(filePath) ? parse(readFileSync(filePath).toString()) : null;
  return cache != null && cache.version == VERSION ? cache : null;
};

export const getCacheValue = (type: Array<string>, keys: Object): any | null => {
  const cache: Cache = getCache(type, keys);
  return cache != null && cache.expires >= Date.now() ? cache.value : null;
};

export const setCacheValue = (type: Array<string>, keys: Object, value: Object): void => {
  const path = getDirectory(type);
  if (!existsSync(path)) {
    mkdirSync(path, {
      recursive: true,
    });
  }

  const obj: Cache = {
    value,
    duration: 6,
    expires: 0,
    version: VERSION,
  };

  const cache = getCache(type, keys);
  if (cache != null) {
    obj.duration = cache.duration;
    const a = JSON.stringify(value);
    const b = JSON.stringify(cache.value);
    //Scale based on the equality
    obj.duration *= a === b ? 1.5 : 0.5;

    //Keep within range
    obj.duration = Math.min(14 * 2 * 24, Math.max(1, obj.duration));
  }

  obj.expires = Date.now() + 1000 * 60 * 60 * obj.duration;

  writeFileSync(getFile(type, keys), stringify(obj));
};
