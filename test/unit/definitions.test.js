'use strict';

const { definitions } = require('../../src/definitions');

describe('definitions', () => {
    describe('type', () => {
        test('should be defined', () => {
            // Given, When, Then
            expect(definitions.type).toBeDefined();
        });

        test('should have defined accepted `naming`', () => {
            // Given
            const expectedType = 'string';

            // When, Then
            expect(definitions.type.name).toEqual(expectedType);
        });

        test('should have defined accepted `translate arguments`', () => {
            // Given
            const expectedType = 'object';

            // When, Then
            expect(definitions.type.translateArguments).toEqual(expectedType);
        });

        test('should have defined accepted `http client\'s send method`', () => {
            // Given
            const expectedType = 'function';

            // When, Then
            expect(definitions.type.httpClientSend).toEqual(expectedType);
        });
    });

    describe('error', () => {
        test('should be defined', () => {
            // Given, When, Then
            expect(definitions.error).toBeDefined();
        });

        test('should have defined `invalid component name` message', () => {
            // Given
            const expectedType = definitions.type.name;
            const expectedError = `Invalid type provided for component name. Expected ${expectedType}, received {type}.`;

            // When, Then
            expect(definitions.error.invalidComponentName).toEqual(expectedError);
        });

        test('should have defined `invalid translate arguments` message', () => {
            // Given
            const expectedType = definitions.type.translateArguments;
            const expectedError = `Invalid type provided for translate arguments. Expected ${expectedType}, received {type}.`;

            // When, Then
            expect(definitions.error.invalidTranslateArguments).toEqual(expectedError);
        });

        test('should have defined `missing http client\'s send method` message', () => {
            // Given
            const expectedError = 'Missing HttpClient\'s send method.';

            // When, Then
            expect(definitions.error.missingHttpClientSend).toEqual(expectedError);
        });

        test('should have defined `invalid http client\'s send method` message', () => {
            // Given
            const expectedType = definitions.type.httpClientSend;
            const expectedError = `HttpClient's send is not of type ${expectedType}.`;

            // When, Then
            expect(definitions.error.invalidHttpClientSend).toEqual(expectedError);
        });
    });

    describe('format', () => {
        test('should be defined', () => {
            // Given, When, Then
            expect(definitions.format).toBeDefined();
        });

        test('should have defined `datetime` pattern', () => {
            // Given
            const expectedDatetimeFormat = '{day}/{month}/{fullYear} {hour}:{minute}:{second}.{millisecond}';

            // When, Then
            expect(definitions.format.datetime).toEqual(expectedDatetimeFormat);
        });

        test('should have defined `log` pattern', () => {
            // Given
            const expectedLogFormat = '[{datetime}] [{componentName}] {logLevel}: {message}';

            // When, Then
            expect(definitions.format.log).toEqual(expectedLogFormat);
        });
    });

    describe('logLevel', () => {
        test('should be defined', () => {
            // Give, When, Then
            expect(definitions.logLevel).toBeDefined();
        });

        test('should have defined `info`, `warning` and `error` standard', () => {
            // Given
            const expectedInfoLevel = 'INFO';
            const expectedWarningLevel = 'WARNING';
            const expectedErrorLevel = 'ERROR';

            // When, Then
            expect(definitions.logLevel.info).toEqual(expectedInfoLevel);
            expect(definitions.logLevel.warning).toEqual(expectedWarningLevel);
            expect(definitions.logLevel.error).toEqual(expectedErrorLevel);
        });
    });
});
