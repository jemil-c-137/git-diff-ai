class CommitMessageGenerator {
    constructor(modelCommunicator) {
        this.modelCommunicator = modelCommunicator;
        this.previousMessages = [];
    }

    async generateMessages(fileDiffs) {
        let commitMessages = [];
        for (let fileDiff of fileDiffs) {
            let message = await this.generateCommitMessage(fileDiff.diff);
            if (message) {
                commitMessages.push(message);
                this.previousMessages.push(message);
            }
        }
        return commitMessages;
    }

    async generateCommitMessage(diff) {
        let prompt = this.createCommitPrompt(diff);
        try {
            return await this.modelCommunicator.generateResponse(prompt);
        } catch (error) {
            console.error('Error generating commit message:', error);
            return null;
        }
    }

    async generateSummaryMessage(commitMessages) {
        let prompt = this.createSummaryPrompt(commitMessages);
        try {
            return await this.modelCommunicator.generateResponse(prompt);
        } catch (error) {
            console.error('Error generating summary message:', error);
            return null;
        }
    }

    createCommitPrompt(diff) {
        return `
Generate a Git commit message for the following diff:

${diff}

Previous commit messages:
${this.previousMessages.join('\n')}

Instructions:
1. Summarize the purpose of the changes in under 100 characters.
2. If needed, use bullet points to briefly list key changes.
3. Focus only on the changes in the code diff.
4. If the diff doesn't reflect significant changes, return an empty string.
5. Do not include explanations or analysis in the commit message.

Commit Message:`;
    }

    createSummaryPrompt(commitMessages) {
        return `
Based on the following commit messages for individual files, generate a concise summary commit message:

${commitMessages.join('\n')}

Instructions:
1. Summarize the overall changes in under 100 characters.
2. If needed, use bullet points to highlight key changes across files.
3. Focus on the most important changes.

Summary Commit Message:`;
    }
}

module.exports = CommitMessageGenerator;
