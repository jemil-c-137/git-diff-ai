import { execSync } from 'child_process';
import { isExcludedFile } from './utils.js';

export class DiffGenerator {
    constructor(maxDiffSize = 10000, maxFiles = 50) {
        this.maxDiffSize = maxDiffSize;
        this.maxFiles = maxFiles;
    }

    async generateDiffs() {
        try {
            const diff = execSync('git diff --cached', { encoding: 'utf-8' });
            return this.streamDiffs(diff);
        } catch (error) {
            throw new Error(`Failed to generate git diff: ${error.message}`);
        }
    }

    streamDiffs(diff) {
        const files = diff.split('diff --git');
        return files.slice(1).map((file) => `diff --git${file}`)
            .filter((fileDiff, index) => {
                if (index >= this.maxFiles) {
                    console.warn(`Skipping files beyond the limit of ${this.maxFiles}`);
                    return false;
                }
                const fileName = fileDiff.split('\n')[0];
                if (isExcludedFile(fileName)) {
                    console.log(`Skipping excluded file: ${fileName}`);
                    return false;
                }
                if (fileDiff.length > this.maxDiffSize) {
                    console.log(`Skipping large diff for file: ${fileName}`);
                    return false;
                }
                return true;
            });
    }
}