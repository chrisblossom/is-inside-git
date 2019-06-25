/**
 * https://stackoverflow.com/a/2044714
 */

import path from 'path';
import pathType from 'path-type';
import execa, { sync as execaSync } from 'execa';

const gitCommand = 'git';
const gitCommandArgs = ['rev-parse', '--is-inside-work-tree'];

async function isInsideGit(pathname: string = process.cwd()): Promise<boolean> {
    const absolutePath = path.resolve(pathname);

    const isDirectory = await pathType.isDirectory(absolutePath);

    const nearestDirectory =
        isDirectory === true
            ? absolutePath
            : path.resolve(path.dirname(pathname));

    try {
        await execa(gitCommand, gitCommandArgs, {
            cwd: nearestDirectory,
        });

        return true;
    } catch (error) {
        return false;
    }
}

function isInsideGitSync(dir: string = process.cwd()): boolean {
    const absolutePath = path.resolve(dir);

    const isDirectory = pathType.isDirectorySync(absolutePath);

    const nearestDirectory =
        isDirectory === true ? absolutePath : path.resolve(path.dirname(dir));

    try {
        execaSync(gitCommand, gitCommandArgs, {
            cwd: nearestDirectory,
        });

        return true;
    } catch (error) {
        return false;
    }
}

export { isInsideGit, isInsideGitSync };
