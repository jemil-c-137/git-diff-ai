import { ModelCommunicator } from '../ModelCommunicator';

describe('ModelCommunicator Integration Tests', () => {
  let modelCommunicator;

  beforeEach(() => {
    modelCommunicator = new ModelCommunicator('smollm:360m');
  });

  test('can connect to Ollama and generate a response', async () => {
    const prompt = 'Hello, how are you?';
    const response = await modelCommunicator.generateResponse(prompt);

    expect(response).toBeTruthy();
    expect(typeof response).toBe('string'); 
    expect(response.length).toBeGreaterThan(0);
  }, 60000);  // Increase timeout to 60 seconds

  test('can accept a diff and generate a response', async () => {
    const mockDiff = `
diff --git a/file.txt b/file.txt
index 1234567..abcdefg 100644
--- a/file.txt
+++ b/file.txt
@@ -1,3 +1,3 @@
 Line 1
-Line 2
+Updated Line 2
 Line 3
    `;

    const prompt = `Generate a commit message for this diff:\n${mockDiff}`;
    const response = await modelCommunicator.generateResponse(prompt);

    expect(response).toBeTruthy();
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  }, 60000);  // Increase timeout to 60 seconds

  test('handles connection errors and retries', async () => {
    // This test simulates a connection error by temporarily changing the model name
    const originalModelName = modelCommunicator.modelName;
    modelCommunicator.modelName = 'non_existent_model';

    await expect(modelCommunicator.generateResponse('Test prompt')).rejects.toThrow('Failed to communicate with the model after 3 attempts');

    // Restore the original model name
    modelCommunicator.modelName = originalModelName;
  }, 60000);  // Increase timeout to 60 seconds
});
