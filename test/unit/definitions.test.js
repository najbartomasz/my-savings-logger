'use strict';

const { definitions } = require('../../src/definitions');

describe('definitions', () => {
    describe('error', () => {
        test('should be defined', () => {
            // Given, When, Then
            expect(definitions.error).toBeDefined();
        });

        test('should have defined error for invalid component name', () => {
            // Given
            const expectedError = `Invalid component name provided. Expected ${definitions.type.naming}, received {type}.`;

            // When, Then
            expect(definitions.error.invalidComponentName).toBe(expectedError);
        });
    });

    describe('format', () => {
        test('should be defined', () => {
            // Given, When, Then
            expect(definitions.format).toBeDefined();
        });

        test('should have defined datetime format', () => {
            // Given
            const expectedDatetimeFormat = '{day}/{month}/{fullYear} {hour}:{minute}:{second}.{millisecond}';

            // When, Then
            expect(definitions.format.datetime).toBe(expectedDatetimeFormat);
        });

        test('should have defined log format', () => {
            // Given
            const expectedLogFormat = '[{datetime}] [{componentName}] {logLevel}: {message}';

            // When, Then
            expect(definitions.format.log).toBe(expectedLogFormat);
        });
    });

    describe('logLevel', () => {
        test('should be defined', () => {
            // Give, When, Then
            expect(definitions.logLevel).toBeDefined();
        });

        test('should have defined `info`, `warning` and `error` level', () => {
            // Given
            const expectedInfoLevel = 'INFO';
            const expectedWarningLevel = 'WARNING';
            const expectedErrorLevel = 'ERROR';

            // When, Then
            expect(definitions.logLevel.info).toBe(expectedInfoLevel);
            expect(definitions.logLevel.warning).toBe(expectedWarningLevel);
            expect(definitions.logLevel.error).toBe(expectedErrorLevel);
        });
    });

    describe('type', () => {
        test('should be defined', () => {
            // Given, When, Then
            expect(definitions.type).toBeDefined();
        });

        test('should have defined accepted type of naming', () => {
            // Given
            const expectedType = 'string';

            // When, Then
            expect(definitions.type.naming).toBe(expectedType);
        });
    });
});
