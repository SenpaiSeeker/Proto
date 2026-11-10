import { FileStore } from "../../sessions/FileStore";

export function open(directory: string): Storage {
    return new FileStore(directory) as unknown as Storage;
}
