'use strict';

/* eslint-disable no-console */

jest.mock('../../src/datetime');
jest.mock('../../src/definitions');
jest.mock('../../src/translator');

const { datetime } = require('../../src/datetime');
const { definitions } = require('../../src/definitions');
const { translator } = require('../../src/translator');

const { Logger } = require('../../src/logger');

describe('logger', () => {
    let currentDatetime;
    let componentName;
    let message;
    let expectedLogFormat;
    let expectedParameters;
    let expectedOutput;
    let httpClient;

    beforeEach(() => {
        currentDatetime = '20/08/1987 13:37:00.000';
        componentName = 'Component';
        message = 'Message.';
        expectedLogFormat = 'Format';
        expectedParameters = {
            datetime: currentDatetime,
            componentName,
            message
        };
        expectedOutput = 'Output';

        definitions.format.log = expectedLogFormat;
        datetime.toFormattedString = jest.fn().mockReturnValue(currentDatetime);
        httpClient = { send: jest.fn() };
    });

    test('should have defined `info`, `warning` and `error` log methods', () => {
        // Given, When
        const logger = new Logger(componentName, httpClient);

        // Then
        expect(logger.info).toBeDefined();
        expect(logger.warning).toBeDefined();
        expect(logger.error).toBeDefined();
    });

    test('should write `info` message only to debug console', () => {
        // Given
        console.info = jest.fn();
        expectedParameters.logLevel = definitions.logLevel.info;
        translator.translate = jest.fn().mockReturnValue(expectedOutput);
        const logger = new Logger(componentName);

        // When
        logger.info(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters);
        expect(console.info).toHaveBeenCalledWith(expectedOutput);
        expect(httpClient.send).not.toHaveBeenCalled();
    });

    test('should write `info` message to debug console and send it through http client', () => {
        // Given
        console.info = jest.fn();
        expectedParameters.logLevel = definitions.logLevel.info;
        translator.translate = jest.fn().mockReturnValue(expectedOutput);
        const logger = new Logger(componentName, httpClient);

        // When
        logger.info(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters);
        expect(console.info).toHaveBeenCalledWith(expectedOutput);
        expect(httpClient.send).toHaveBeenCalledWith(expectedOutput);
    });

    test('should write `warning` message only to debug console', () => {
        // Given
        console.warn = jest.fn();
        expectedParameters.logLevel = definitions.logLevel.warning;
        translator.translate = jest.fn().mockReturnValue(expectedOutput);
        const logger = new Logger(componentName);

        // When
        logger.warning(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters);
        expect(console.warn).toHaveBeenCalledWith(expectedOutput);
        expect(httpClient.send).not.toHaveBeenCalled();
    });

    test('should write `warning` message only to debug console and send it through http client', () => {
        // Given
        console.warn = jest.fn();
        expectedParameters.logLevel = definitions.logLevel.warning;
        translator.translate = jest.fn().mockReturnValue(expectedOutput);
        const logger = new Logger(componentName, httpClient);

        // When
        logger.warning(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters);
        expect(console.warn).toHaveBeenCalledWith(expectedOutput);
        expect(httpClient.send).toHaveBeenCalledWith(expectedOutput);
    });

    test('should write `error` message only to debug console', () => {
        // Given
        console.error = jest.fn();
        expectedParameters.logLevel = definitions.logLevel.error;
        translator.translate = jest.fn().mockReturnValue(expectedOutput);
        const logger = new Logger(componentName);

        // When
        logger.error(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters);
        expect(console.error).toHaveBeenCalledWith(expectedOutput);
        expect(httpClient.send).not.toHaveBeenCalled();
    });

    test('should write `error` message to debug console and send it through http client', () => {
        // Given
        console.error = jest.fn();
        expectedParameters.logLevel = definitions.logLevel.error;
        translator.translate = jest.fn().mockReturnValue(expectedOutput);
        const logger = new Logger(componentName, httpClient);

        // When
        logger.error(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters);
        expect(console.error).toHaveBeenCalledWith(expectedOutput);
        expect(httpClient.send).toHaveBeenCalledWith(expectedOutput);
    });
});
