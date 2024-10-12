import clipboardy from 'clipboardy';
import { colorizeFileName, colorizeCommitMessage, colorizeSuccess, colorizeError, colorizeWarning } from './utils.js';

export class OutputHandler {
    constructor() {
        this.divider = '🚀 ' + '='.repeat(30) + ' 🚀';
    }

    async displayResults(commitMessages, summaryMessage) {
        if (commitMessages.length === 0) {
            this.displayNoStagedChanges();
            return;
        }

        console.log(colorizeSuccess('\nCommit messages for individual files:'));
        commitMessages.forEach((message, index) => {
            console.log(colorizeFileName(`\nFile ${index + 1}:`));
            console.log(colorizeCommitMessage(message));
        });

        console.log('\n' + colorizeSuccess(this.divider));
        console.log(colorizeSuccess('Summary Commit Message:'));
        console.log(colorizeCommitMessage(summaryMessage));
        console.log(colorizeSuccess(this.divider) + '\n');

        try {
            await clipboardy.write(summaryMessage);
            console.log(colorizeSuccess('Summary message copied to clipboard!'));
        } catch (error) {
            this.logError('Failed to copy summary message to clipboard:', error);
        }
    }

    displayNoChanges() {
        console.log(colorizeWarning('No significant changes detected across all files.'));
    }

    displayNoStagedChanges() {
        console.log(colorizeWarning('No files staged for commit. Use `git add` to stage changes.'));
    }

    logProcessedFile(fileName) {
        console.log(`Processing file: ${colorizeFileName(fileName)}`);
    }

    logCommitMessage(message) {
        console.log(`\nCommit message:\n${colorizeCommitMessage(message)}\n`);
    }

    logSuccess(message) {
        console.log(colorizeSuccess(message));
    }

    logError(message, error) {
        console.error(colorizeError(message), error);
    }

    logWarning(message) {
        console.warn(colorizeWarning(message));
    }
}
