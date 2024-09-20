export class OutputHandler {
    displayResults(commitMessages, summaryMessage) {
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
}