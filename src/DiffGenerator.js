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
        const files = this.splitDiffs(diff);
        return files
            .map((fileDiff, index) => {
                const fileName = this.extractFileName(fileDiff);
                if (!fileName) return null;
                if (index >= this.maxFiles) {
                    console.warn(`Skipping file beyond the limit of ${this.maxFiles}: ${fileName}`);
                    return null;
                }
                if (isExcludedFile(fileName)) return null;
                if (fileDiff.length > this.maxDiffSize) {
                    console.log(`Skipping large diff for file: ${fileName}`);
                    return null;
                }
                return { fileName, diff: fileDiff };
            })
            .filter(Boolean);
    }

    splitDiffs(diff) {
        const diffRegex = /(?<=\n)(?=diff --git )/g;
        return diff.split(diffRegex);
    }

    extractFileName(fileDiff) {
        const match = fileDiff.match(/^diff --git a\/(.*?) b\/(.*?)$/m);
        return match ? match[2] : null;
    }
}
