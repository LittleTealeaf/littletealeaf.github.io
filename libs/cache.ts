import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import {stringify, parse} from 'zipson';

const VERSION: number = 1;

type Cache = {
  value: Object;
  expires: number;
  duration: number;
  version: number;
};

const hoursToMilliseconds = (hours: number): number => {
  return 1000 * 60 * 60 * hours;
};

const compileKeys = (keys: Object): String => {
  return path.join(...Object.entries(keys).map(([key, value]) => `${key}${value}`));
};

const getTime = () => Date.now();

const getPath = (type: Array<string>, key: String): string => {
  return path.join(getDir(type), `${key}.json`);
};

const getDir = (type: Array<string>): string => {
  return path.join("cache", path.join(...type));
};

const getFile = (value: string) => {
  return path.join(value, ".cache");
};

const getCacheObject = (type: Array<string>, keys: Object): Cache | null => {
  const file = getFile(getPath(type, compileKeys(keys)));

  if (existsSync(file)) {
    return parse(readFileSync(file).toString());
  }
};

export const getCache = (type: Array<string>, keys: Object): Object | null => {
  const cache = getCacheObject(type, keys);
  return cache == null || cache.expires < getTime() || cache.version != VERSION ? null : cache;
};

export const setCache = (type: Array<string>, keys: Object, value: Object): void => {
  const path = getPath(type, compileKeys(keys));
  if (!existsSync(path)) {
    mkdirSync(path, {
      recursive: true,
    });
  }

  var duration: number;

  const previous = getCacheObject(type, keys);
  if (previous != null) {
    duration = previous.duration;
    const a = JSON.stringify(previous.value);
    const b = JSON.stringify(value);
    if (a == b) {
      duration *= 1.5;
    } else {
      duration *= 0.5;
    }
  } else {
    duration = 6;
  }

  duration = Math.min(Math.max(1, duration), 24 * 14);

  const expires = getTime() + hoursToMilliseconds(duration);

  writeFileSync(
    getFile(path),
    stringify({
      value,
      duration,
      expires,
      version: VERSION,
    },{
      detectUtcTimestamps: true
    })
  );
};
