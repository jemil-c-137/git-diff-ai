import path from 'path';

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

const MAX_JSON_DIFF_SIZE = 10000;

export function isExcludedFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return excludedExtensions.includes(ext);
}

export function parseArguments(args) {
    const options = {
        modelName: 'llama3.2',
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

export function isLargeJsonDiff(diff) {
    const fileName = diff.split('\n')[0];
    const ext = path.extname(fileName).toLowerCase();
    
    if (ext === '.json') {
        return diff.length > MAX_JSON_DIFF_SIZE;
    }
    return false;
}