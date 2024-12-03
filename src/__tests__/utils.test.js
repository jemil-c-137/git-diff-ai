const { isExcludedFile, parseArguments, isLargeJsonDiff, colorizeSuccess, colorizeError, colorizeWarning, colorizeFileName, colorizeCommitMessage, checkNodeVersion } = require('../utils.js');

describe('isExcludedFile', () => {
  test('should return true for excluded file extensions', () => {
    expect(isExcludedFile('image.png')).toBe(true);
    expect(isExcludedFile('audio.mp3')).toBe(true);
    expect(isExcludedFile('document.pdf')).toBe(true);
  });

  test('should return false for non-excluded file extensions', () => {
    expect(isExcludedFile('script.js')).toBe(false);
    expect(isExcludedFile('styles.css')).toBe(false);
    expect(isExcludedFile('index.html')).toBe(false);
  });

  test('should be case-insensitive', () => {
    expect(isExcludedFile('IMAGE.PNG')).toBe(true);
    expect(isExcludedFile('Script.JS')).toBe(false);
  });
});

describe('parseArguments', () => {
  test('should return default values when no arguments are provided', () => {
    const result = parseArguments([]);
    expect(result).toEqual({
      modelName: 'qwen2.5:7b',
      maxDiffSize: 10000,
      maxFiles: 50
    });
  });

  test('should parse model name correctly', () => {
    const result = parseArguments(['--model', 'gpt-3.5-turbo']);
    expect(result.modelName).toBe('gpt-3.5-turbo');
  });

  test('should parse maxDiffSize correctly', () => {
    const result = parseArguments(['--max-diff-size', '5000']);
    expect(result.maxDiffSize).toBe(5000);
  });

  test('should parse maxFiles correctly', () => {
    const result = parseArguments(['--max-files', '30']);
    expect(result.maxFiles).toBe(30);
  });

  test('should parse multiple arguments correctly', () => {
    const result = parseArguments(['--model', 'gpt-4', '--max-diff-size', '8000', '--max-files', '40']);
    expect(result).toEqual({
      modelName: 'gpt-4',
      maxDiffSize: 8000,
      maxFiles: 40
    });
  });
});

describe('isLargeJsonDiff', () => {
  test('should return true for large JSON diffs', () => {
    const largeDiff = 'diff --git a/large.json b/large.json\n' + 'a'.repeat(10001);
    expect(isLargeJsonDiff(largeDiff)).toBe(true);
  });

  test('should return false for small JSON diffs', () => {
    const smallDiff = 'diff --git a/small.json b/small.json\n' + 'a'.repeat(999);
    expect(isLargeJsonDiff(smallDiff)).toBe(false);
  });

  test('should return false for non-JSON files', () => {
    const nonJsonDiff = 'diff --git a/script.js b/script.js\n' + 'a'.repeat(15000);
    expect(isLargeJsonDiff(nonJsonDiff)).toBe(false);
  });

  test('should be case-insensitive for file extensions', () => {
    const upperCaseDiff = 'diff --git a/data.JSON b/data.JSON\n' + 'a'.repeat(10001);
    expect(isLargeJsonDiff(upperCaseDiff)).toBe(true);
  });
});

describe('colorization functions', () => {
  test('should format success messages in green', () => {
    const message = 'Operation successful';
    const colorized = colorizeSuccess(message);
    expect(colorized).toContain(message);
  });

  test('should format error messages in red', () => {
    const message = 'Operation failed';
    const colorized = colorizeError(message);
    expect(colorized).toContain(message);
  });

  test('should format warning messages in yellow', () => {
    const message = 'Proceed with caution';
    const colorized = colorizeWarning(message);
    expect(colorized).toContain(message);
  });

  test('should format file names in cyan', () => {
    const fileName = 'example.js';
    const colorized = colorizeFileName(fileName);
    expect(colorized).toContain(fileName);
  });

  test('should format commit messages in bold yellow', () => {
    const message = 'feat: add new feature';
    const colorized = colorizeCommitMessage(message);
    expect(colorized).toContain(message);
  });

  test('should handle empty messages', () => {
    expect(colorizeSuccess('')).toBeFalsy();
    expect(colorizeError('')).toBeFalsy();
    expect(colorizeWarning('')).toBeFalsy();
    expect(colorizeFileName('')).toBeFalsy();
    expect(colorizeCommitMessage('')).toBeFalsy();
  });
});

describe('isExcludedFile directory checks', () => {
  test('should exclude file in node_modules directory', () => {
    expect(isExcludedFile('node_modules/some-package/index.js')).toBe(true);
  });

  test('should exclude file in nested node_modules directory', () => {
    expect(isExcludedFile('packages/myapp/node_modules/some-package/index.js')).toBe(true);
  });

  test('should not exclude file with partial match to excluded directory', () => {
    expect(isExcludedFile('my_node_modules_app/file.js')).toBe(false);
  });

  test('should not exclude file in valid directory', () => {
    expect(isExcludedFile('src/components/Button.js')).toBe(false);
  });
});

describe('checkNodeVersion', () => {
    // Store the original version
    const originalVersion = process.version;
    
    // Restore the original version after all tests
    afterAll(() => {
        Object.defineProperty(process, 'version', {
            value: originalVersion,
            writable: true
        });
    });

    // Helper to mock Node.js version
    const mockNodeVersion = (version) => {
        Object.defineProperty(process, 'version', {
            value: `v${version}`,
            writable: true
        });
    };

    test('accepts Node.js version 18.x', () => {
        mockNodeVersion('18.0.0');
        expect(() => checkNodeVersion()).not.toThrow();
    });

    test('accepts Node.js version 20.x', () => {
        mockNodeVersion('20.0.0');
        expect(() => checkNodeVersion()).not.toThrow();
    });

    test('throws error for Node.js version 16.x', () => {
        mockNodeVersion('16.0.0');
        expect(() => checkNodeVersion()).toThrow(
            'Node.js version 18 or higher is required. Current version: v16.0.0'
        );
    });

    test('throws error for Node.js version 17.x', () => {
        mockNodeVersion('17.9.9');
        expect(() => checkNodeVersion()).toThrow(
            'Node.js version 18 or higher is required. Current version: v17.9.9'
        );
    });
});
