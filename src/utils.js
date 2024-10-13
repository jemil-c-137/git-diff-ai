const path = require('path');
const colors = require('ansi-colors');

const excludedExtensions = [
    '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp',
    '.mp3', '.wav', '.ogg', '.flac', '.aac',
    '.mp4', '.avi', '.mkv', '.mov', '.wmv',
    '.xml', '.csv', '.yml', '.yaml',
    '.po', '.pot', '.mo',
    '.tar', '.zip', '.rar', '.7z', '.gz',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx',
    '.dmg', '.iso', '.img',
    '.sqlite', '.db',
    '.log', '.tmp',
    '.key', '.p12', '.pem',
    '.bat', '.sh',
];

const excludedDirectories = [
    'node_modules',
    'dist',
    'build',
    '.git',
    'coverage',
    'vendor',
    'tmp',
    'temp',
    'logs',
    'cache',
    '.vscode',
    '.idea',
    '__pycache__',
    'venv',
    'env',
    'bin',
    'obj',
];

const MAX_JSON_DIFF_SIZE = 10000;

function isExcludedFile(filePath) {
    // Check if the file is in an excluded directory
    const normalizedPath = path.normalize(filePath);
    const pathParts = normalizedPath.split(path.sep);
    if (pathParts.some(part => excludedDirectories.includes(part))) {
        return true;
    }

    // Check if the file has an excluded extension
    const ext = path.extname(filePath).toLowerCase();
    return excludedExtensions.includes(ext);
}

function checkNodeVersion() {
    const currentVersion = process.version;
    const requiredMajorVersion = 18;

    const majorVersion = parseInt(currentVersion.slice(1).split('.')[0], 10);

    if (majorVersion < requiredMajorVersion) {
        throw new Error(`Node.js version ${requiredMajorVersion} or higher is required. Current version: ${currentVersion}`);
    }
}

function parseArguments(args) {
    checkNodeVersion();

    const options = {
        modelName: 'qwen2.5:7b',
        maxDiffSize: 10000,
        maxFiles: 50
    };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--model':
                options.modelName = args[++i];
                break;
            case '--max-diff-size':
                options.maxDiffSize = parseInt(args[++i], 10);
                break;
            case '--max-files':
                options.maxFiles = parseInt(args[++i], 10);
                break;
        }
    }

    return options;
}

function isLargeJsonDiff(diff) {
    const fileName = diff.split('\n')[0];
    const ext = path.extname(fileName).toLowerCase();
    
    if (ext === '.json') {
        return diff.length > MAX_JSON_DIFF_SIZE;
    }
    return false;
}

function colorizeFileName(fileName) {
    return colors.cyan(fileName);
}

function colorizeCommitMessage(message) {
    return colors.yellow.bold(message);
}

function colorizeSuccess(message) {
    return colors.green(message);
}

function colorizeError(message) {
    return colors.red(message);
}

function colorizeWarning(message) {
    return colors.yellow(message);
}

module.exports = {
    isExcludedFile,
    checkNodeVersion,
    parseArguments,
    isLargeJsonDiff,
    colorizeFileName,
    colorizeCommitMessage,
    colorizeSuccess,
    colorizeError,
    colorizeWarning
};
