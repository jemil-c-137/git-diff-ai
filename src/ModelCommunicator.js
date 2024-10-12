import ollama from 'ollama';

export class ModelCommunicator {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async generateResponse(prompt, maxRetries = 3) {
        let retries = 0;
        while (retries < maxRetries) {
            try {
                console.log(ollama.chat);
                const response = await ollama.chat({
                    model: this.modelName,
                    messages: [{ role: 'user', content: prompt }],
                    stream: false,
                });
                return response.message.content.trim();
            } catch (error) {
                retries++;
                console.warn(`Attempt ${retries} failed: ${error.message}`);
                if (retries >= maxRetries) {
                    throw new Error(`Failed to communicate with the model after ${maxRetries} attempts`);
                }
                await new Promise(resolve => setTimeout(resolve, 1000 * retries));
            }
        }
    }
}