const ollama  = require('ollama');

class ModelCommunicator {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async generateResponse(prompt, maxAttempts = 3) {
        let attempts = 0;
        while (attempts < maxAttempts) {
            try {
                const response = await ollama.default.chat({
                    model: this.modelName,
                    messages: [{ role: 'user', content: prompt }],
                    stream: false
                });
                return response.message.content.trim();
            } catch (error) {
                attempts++;
                console.warn(`Attempt ${attempts} failed: ${error.message}`);
                if (attempts >= maxAttempts) {
                    throw new Error(`Failed to communicate with the model after ${maxAttempts} attempts`);
                }
                await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
            }
        }
    }
}

module.exports = ModelCommunicator
