import path from "path";
import { stringify, parse } from "zipson";
import Sha1 from "sha1";

const VERSION: number = 2;

type Cache = {
  value: Object;
  expires: number;
  duration: number;
  version: number;
};

// /**
//  * Compiles an object of key-value pairs into a single string
//  * @param keys Map of key value pairs indicating the individual keys
//  * @returns A single key that represents the inputted keys
//  */
// const hashObject = (keys: Object): String => Object.entries(keys).map(([key,value]) => `${key}${value}`).join('');

// const hashObject = (keys: Object): String => path.join(...Object.entries(keys).map(([key, value]) => `${key}${value}`));

const hashKeys = (keys: Object): String =>
  Sha1(
    Object.entries(keys)
      .map(([key, value]) => `${key}${value}`)
      .join("")
  );

// .split("")
// .reduce((a, b) => {
//   a = (a << 5) - a + b.charCodeAt(0);
//   return a & a;
// }, 0)
// .toString();

// const hashCode = function () {
//   var hash = 0,
//     i = 0,
//     len = this.length;
//   while (i < len) {
//     hash = ((hash << 5) - hash + this.charCodeAt(i++)) << 0;
//   }
//   return hash;
// };

export const getCache = (type: Array<string>, keys: Object): Object | null => {
  console.log(hashKeys(keys));
  return null;
};

export const setCache = (type: Array<string>, keys: Object, value: Object): void => {};

// import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
// import path from "path";

// const VERSION: number = 1;

// type Cache = {
//   value: Object;
//   expires: number;
//   duration: number;
//   version: number;
// };

// const hoursToMilliseconds = (hours: number): number => {
//   return 1000 * 60 * 60 * hours;
// };

// const compileKeys = (keys: Object): String => {
//   return path.join(...Object.entries(keys).map(([key, value]) => `${key}${value}`));
// };

// const getTime = () => Date.now();

// const getPath = (type: Array<string>, key: String): string => {
//   return path.join(getDir(type), `${key}.json`);
// };

// const getDir = (type: Array<string>): string => {
//   return path.join("cache", path.join(...type));
// };

// const getFile = (value: string) => {
//   return path.join(value, ".cache");
// };

// const getCacheObject = (type: Array<string>, keys: Object): Cache | null => {
//   const file = getFile(getPath(type, compileKeys(keys)));

//   if (existsSync(file)) {
//     return parse(readFileSync(file).toString());
//   }
// };

// export const getCache = (type: Array<string>, keys: Object): Object | null => {
//   const cache = getCacheObject(type, keys);
//   return cache == null || cache.expires < getTime() || cache.version != VERSION ? null : cache;
// };

// export const setCache = (type: Array<string>, keys: Object, value: Object): void => {
//   const path = getPath(type, compileKeys(keys));
//   if (!existsSync(path)) {
//     mkdirSync(path, {
//       recursive: true,
//     });
//   }

//   var duration: number;

//   const previous = getCacheObject(type, keys);
//   if (previous != null) {
//     duration = previous.duration;
//     const a = JSON.stringify(previous.value);
//     const b = JSON.stringify(value);
//     if (a == b) {
//       duration *= 1.5;
//     } else {
//       duration *= 0.5;
//     }
//   } else {
//     duration = 6;
//   }

//   duration = Math.min(Math.max(1, duration), 24 * 14);

//   const expires = getTime() + hoursToMilliseconds(duration);

//   writeFileSync(
//     getFile(path),
//     stringify({
//       value,
//       duration,
//       expires,
//       version: VERSION,
//     },{
//       detectUtcTimestamps: true
//     })
//   );
// };
