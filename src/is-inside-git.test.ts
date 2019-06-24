import path from 'path';
import execa from 'execa';
import { TempSandbox } from 'temp-sandbox';
import { isInsideGit, isInsideGitSync } from './is-inside-git';

const sandbox = new TempSandbox({ randomDir: true });

async function initializeGit(dir: string = process.cwd()) {
    const absolutePath = path.resolve(dir);

    await execa('git', ['init'], { cwd: absolutePath });
}

beforeEach(async () => {
    process.chdir(sandbox.dir);
    await sandbox.clean();
});

afterAll(async () => {
    await sandbox.destroySandbox();
});

/*

 */
describe.each`
    pathname
    ${undefined}
    ${'nested'}
    ${'nested/inside.js'}
    ${'file.js'}
    ${sandbox.dir}
    ${sandbox.path.resolve('nested')}
    ${sandbox.path.resolve('file.js')}
    ${sandbox.path.resolve('nested/inside.js')}
`(`$pathname`, ({ pathname }) => {
    beforeEach(async () => {
        if (pathname && pathname !== process.cwd()) {
            const parsed = path.parse(pathname);

            const isFile = parsed.ext !== '';

            if (isFile === true) {
                await sandbox.createFile(pathname);

                return;
            }

            await sandbox.createFile(pathname);
        }
    });

    describe('true', () => {
        const expected = true;

        beforeEach(async () => {
            await initializeGit(sandbox.dir);
        });

        test('async', async () => {
            const isGit = await isInsideGit(pathname);

            expect(isGit).toEqual(expected);
        });

        test('sync', () => {
            const isGit = isInsideGitSync(pathname);

            expect(isGit).toEqual(expected);
        });
    });

    describe('false', () => {
        const expected = false;

        test('async', async () => {
            const isGit = await isInsideGit(pathname);

            expect(isGit).toEqual(expected);
        });

        test('sync', () => {
            const isGit = isInsideGitSync(pathname);

            expect(isGit).toEqual(expected);
        });
    });
});
