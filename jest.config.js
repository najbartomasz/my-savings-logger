'use strict';

module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage/',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    errorOnDeprecated: true,
    resetMocks: true,
    restoreMocks: true,
    testMatch: [
        '**/*.test.js'
    ],
    timers: 'fake',
    verbose: true
};
