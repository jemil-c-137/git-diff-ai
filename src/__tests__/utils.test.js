import { isExcludedFile, parseArguments, isLargeJsonDiff } from '../utils.js';

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
      modelName: 'llama3.2',
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
