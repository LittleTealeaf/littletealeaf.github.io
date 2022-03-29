import { join } from 'path';

export function getPath(...dirs) {
    return join(process.cwd(),...dirs);
}