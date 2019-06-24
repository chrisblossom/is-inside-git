import path from 'path';
import { sync as execaSync } from 'execa';
import { TempSandbox } from 'temp-sandbox';
import { isInsideGit, isInsideGitSync } from './is-inside-git';

const sandbox = new TempSandbox({ randomDir: true });

function initializeGit(dir: string = process.cwd()) {
    const absolutePath = path.resolve(dir);

    execaSync('git', ['init'], { cwd: absolutePath });
}

beforeEach(() => {
    process.chdir(sandbox.dir);
    sandbox.cleanSync();
});

afterAll(() => {
    sandbox.destroySandboxSync();
});

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
    beforeEach(() => {
        if (pathname && pathname !== process.cwd()) {
            const parsed = path.parse(pathname);

            const isFile = parsed.ext !== '';

            if (isFile === true) {
                sandbox.createFileSync(pathname);

                return;
            }

            sandbox.createFileSync(pathname);
        }
    });

    describe('true', () => {
        const expected = true;

        beforeEach(() => {
            initializeGit(sandbox.dir);
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
