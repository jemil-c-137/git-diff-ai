#!/usr/bin/env node
const DiffGenerator = require('./DiffGenerator.js');
const ModelCommunicator = require('./ModelCommunicator.js');
const CommitMessageGenerator = require('./CommitMessageGenerator.js');
const OutputHandler = require('./OutputHandler.js');
const { parseArguments } = require('./utils.js');
const Ollama = require('ollama');

async function main() {
    try {
        const { modelName, maxDiffSize, maxFiles } = parseArguments(process.argv.slice(2));
        
        const diffGenerator = new DiffGenerator(maxDiffSize, maxFiles);
        const modelCommunicator = new ModelCommunicator(modelName);
        const commitMessageGenerator = new CommitMessageGenerator(modelCommunicator);
        const outputHandler = new OutputHandler();

        const fileDiffs = await diffGenerator.generateDiffs();
        
        if (fileDiffs.length === 0) {
            outputHandler.displayNoStagedChanges();
            return;
        }

        const commitMessages = await commitMessageGenerator.generateMessages(fileDiffs);
        
        if (commitMessages.length > 0) {
            const summaryMessage = await commitMessageGenerator.generateSummaryMessage(commitMessages);
            outputHandler.displayResults(commitMessages, summaryMessage);
        } else {
            outputHandler.displayNoChanges();
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
