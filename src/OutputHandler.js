export class OutputHandler {
    displayResults(commitMessages, summaryMessage) {
        if (commitMessages.length === 0) {
            this.displayNoStagedChanges();
            return;
        }

        console.log('\nCommit messages for individual files:');
        commitMessages.forEach((message, index) => {
            console.log(`\nFile ${index + 1}:\n${message}`);
        });

        console.log('\nSummary Commit Message:');
        console.log(summaryMessage);
    }

    displayNoChanges() {
        console.log('No significant changes detected across all files.');
    }

    displayNoStagedChanges() {
        console.log('No files staged for commit. Use `git add` to stage changes.');
    }
}
