# Git Diff AI

Git Diff AI is a powerful tool that generates commit messages based on your staged changes using AI. It analyzes your git diff and produces both individual file commit messages and a summary commit message, making your git workflow more efficient and descriptive.

## Description

This tool uses Ollama's AI models to analyze git diffs and generate meaningful commit messages. It processes each changed file individually and then creates an overall summary, helping developers create more descriptive and consistent commit messages with minimal effort.

## Dependencies

- Node.js:
  - For CLI tool: version 20 or higher
  - For npm package: version 18 or higher
- Ollama CLI (installed and configured on your system)

### Checking Dependencies

1. Check your Node.js version:
```
node -v
```

2. Check if Ollama is installed:
```
ollama --help
```

If you see the help output, Ollama is installed correctly.

### Installing Ollama

If Ollama is not installed, follow these steps:

1. Visit the [Ollama installation page](https://ollama.ai/download).
2. Download and install the appropriate version for your operating system.
3. After installation, run `ollama --help` to verify the installation.

## Installation

### As a CLI tool (requires Node.js 20+)

1. Clone this repository:
```
git clone https://github.com/yourusername/git-diff-ai.git
cd git-diff-ai
```

2. Build and install the tool globally:

- For macOS:
```
npm run setup:mac
```

- For Linux:
```
npm run setup:linux
```

- For Windows:
```
npm run setup:windows
```

After installation, you can run `git-diff-ai` from anywhere in your terminal.

### As an npm package (requires Node.js 18+)

1. Install the package in your project:
```
npm install git-diff-ai
```

2. Add a script to your `package.json`:
```json
"scripts": {
  "git-diff-ai": "git-diff-ai"
}
```

## Usage

### As a CLI tool

Run the command directly:
```
git-diff-ai [options]
```

**Note:** The CLI tool currently only works with the default model qwen2.5:7b. Other model options are not supported in the CLI version at this time.

### As an npm package

Run the script using npm:
```
npm run git-diff-ai -- [options]
```

### Options

- `--model <model-name>`: Specify the Ollama model to use (default: qwen2.5:7b)
- `--max-diff-size <size>`: Maximum size of diff to process in characters (default: 10000)
- `--max-files <number>`: Maximum number of files to process (default: 50)

### Examples

1. Using default settings:
```
git-diff-ai
```

2. Using a specific model and increased diff size (model has to be pulled with ollama before):
```
git-diff-ai --model gpt-4 --max-diff-size 50000
```

3. Processing more files:
```
git-diff-ai --max-files 100
```

## How It Works

1. The tool retrieves the git diff for staged changes.
2. It processes each file diff individually, skipping excluded file types and large diffs.
3. For each valid diff, it generates a commit message using the specified AI model.
4. After processing all files, it generates a summary commit message.
5. The individual file commit messages and the summary message are displayed in the console.

## General Recommendations and Explanations

1. **Hardware Considerations**: This tool uses your local hardware for computations. Choose an appropriate model based on your machine's capabilities. Larger models may provide better results but require more computational power and time.

2. **Data Privacy**: All processing is done locally on your machine. No data is stored or sent to external servers, ensuring the privacy and security of your code.

3. **Git Best Practices**: 
- Avoid staging too many files for a single commit. This not only increases computation time but also goes against the recommended git workflow.
- Aim for atomic commits: each commit should represent a single logical change. This makes your git history more meaningful and easier to understand. [Learn more about atomic commits](https://www.freshconsulting.com/insights/blog/atomic-commits/).

4. **Model Selection**: Start with smaller models and gradually move to larger ones if needed. The default model (qwen2.5:3b) offers a good balance between performance and quality for most use cases.

5. **Performance**: If you're experiencing slow performance, consider:
- Using a smaller model
- Reducing the `--max-diff-size` or `--max-files` parameters
- Staging fewer files for each commit

6. **Review Generated Messages**: While this tool aims to generate meaningful commit messages, always review and adjust them as necessary to ensure they accurately describe your changes.

## Troubleshooting

1. **Error: Ollama is not installed or configured**
- Make sure Ollama is installed on your system and properly configured.
- Check if you can run Ollama commands directly in your terminal.

2. **Error: No changes detected**
- Ensure you have staged changes in your git repository.
- Run `git status` to verify that there are staged changes.

3. **Error: Model not found**
- Verify that the specified model is available in your Ollama installation.
- Try using a different model or the default model.

4. **Error: Maximum diff size exceeded**
- If you're working with large files, try increasing the `--max-diff-size` parameter.

5. **Error: Too many files**
- If you're committing changes to many files, try increasing the `--max-files` parameter.

6. **Performance issues or slow responses**
- Consider using a smaller or faster model.
- Reduce the `--max-diff-size` or `--max-files` parameters.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Model Recommendations

While this tool supports various language models, we highly recommend using Qwen models for optimal performance. Qwen models are:

1. Compact: They have a smaller footprint, making them easier to deploy and use.
2. Fast: Their efficiency allows for quicker response times.
3. High-quality output: Despite their smaller size, Qwen models produce excellent results for code-related tasks.

To use a Qwen model, you can specify it with the `--model` flag:

```
npm run git-diff-ai -- --model qwen2.5:3b
```

## Uninstallation

To remove the CLI tool:

- For macOS:
```
npm run remove:mac
```

- For Linux:
```
npm run remove:linux
```

- For Windows:
```
npm run remove:windows
```

To remove the npm package from your project:
```
npm uninstall git-diff-ai
```

## NPM Scripts Explanation

Here's an explanation of the npm scripts available in this project:

- `git-diff-ai`: Runs the main application.
- `test`: Runs the Jest test suite with experimental VM modules.
- `test:integration`: Runs integration tests using Jest.
- `build`: Bundles and minifies the application using esbuild for Node.js 18+.
- `build:mac`: Builds the application for macOS.
- `install:mac`: Installs the built application globally on macOS.
- `remove:mac`: Removes the globally installed application on macOS.
- `setup:mac`: Builds and installs the application on macOS (combines `build:mac` and `install:mac`).
- `build:linux`: Builds the application for Linux.
- `install:linux`: Installs the built application globally on Linux.
- `remove:linux`: Removes the globally installed application on Linux.
- `setup:linux`: Builds and installs the application on Linux (combines `build:linux` and `install:linux`).
- `build:windows`: Builds the application for Windows.
- `install:windows`: Installs the built application globally on Windows.
- `remove:windows`: Removes the globally installed application on Windows.
- `setup:windows`: Builds and installs the application on Windows (combines `build:windows` and `install:windows`).

To run any of these scripts, use `npm run <script-name>`. For example:
```
npm run build
```

The setup scripts (`setup:mac`, `setup:linux`, `setup:windows`) are particularly useful for quickly building and installing the application on your respective operating system.
