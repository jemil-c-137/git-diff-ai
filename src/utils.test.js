const { checkNodeVersion } = require('./utils');

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