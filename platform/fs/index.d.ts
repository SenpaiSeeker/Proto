import type * as browser from "./browser";
import type { Implements } from "../implements";
import type { FileSystem } from "./types";
export type * from "./types";
export type BrowserImplementation = Implements<FileSystem, typeof browser>;
export declare const open: (path: string, flags: "r" | "w") => Promise<import("./types").FileHandle>, readFile: (path: string) => Promise<import("..").Buffer>, size: (path: string) => Promise<number>, isFile: (path: string) => Promise<boolean>, isDirectory: (path: string) => boolean, isDirectoryAsync: (path: string) => Promise<boolean>, exists: (path: string) => boolean, isFileStream: (value: unknown) => value is import("./types").FileStream, resolve: (...paths: string[]) => string, join: (...paths: string[]) => string, basename: (path: string) => string, isAbsolute: (path: string) => boolean;
