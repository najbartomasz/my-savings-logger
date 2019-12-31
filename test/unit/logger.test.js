'use strict';

/* eslint-disable no-console */

jest.mock('fs');
jest.mock('../../src/datetime');
jest.mock('../../src/definitions');
jest.mock('../../src/exceptions');
jest.mock('../../src/translator');

const fs = require('fs');
const { datetime } = require('../../src/datetime');
const { definitions } = require('../../src/definitions');
const { translator } = require('../../src/translator');
const { FileInputOutputException } = require('../../src/exceptions');

const { Logger } = require('../../src/logger');

const currentDatetime = '20/08/1987 13:37:00.000';
const componentName = 'Component';
const filePath = 'some/path/to/logfile';
const message = 'Message.';
const expectedLogFormat = 'format';
const expectedParameters = {
    datetime: currentDatetime,
    componentName,
    message
};

describe('logger', () => {
    beforeEach(() => {
        definitions.format.log = expectedLogFormat;
        datetime.getCurrent = jest.fn().mockReturnValue(currentDatetime);
    });

    test('should have defined `info`, `warning` and `error` log methods', () => {
        // Given, When
        const logger = new Logger(componentName, filePath);

        // Then
        expect(logger.info).toBeDefined();
        expect(logger.warning).toBeDefined();
        expect(logger.error).toBeDefined();
    });

    test('should write `info` message to debug console and file', () => {
        // Given
        console.info = jest.fn();
        expectedParameters.logLevel = definitions.logLevel.info;
        const logger = new Logger(componentName, filePath);

        // When
        logger.info(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters);
        expect(console.info).toHaveBeenCalled();
    });

    test('should write `warning` message to debug console and file', () => {
        // Given
        console.warn = jest.fn();
        expectedParameters.logLevel = definitions.logLevel.warning;
        const logger = new Logger(componentName, filePath);

        // When
        logger.warning(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters);
        expect(console.warn).toHaveBeenCalled();
    });

    test('should write `error` message to debug console and file', () => {
        // Given
        console.error = jest.fn();
        expectedParameters.logLevel = definitions.logLevel.error;
        const logger = new Logger(componentName, filePath);

        // When
        logger.error(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters);
        expect(console.error).toHaveBeenCalled();
    });

    test('should print multiple messages with different timestamps', () => {
        // Given
        console.info = jest.fn();
        console.warn = jest.fn();
        console.error = jest.fn();
        const firstDatetime = '20/08/1987 11:35:00.000';
        const secondDatetime = '20/08/1987 11:36:00.000';
        datetime.getCurrent = jest.fn()
            .mockReturnValue(currentDatetime)
            .mockReturnValueOnce(firstDatetime)
            .mockReturnValueOnce(secondDatetime);
        const logger = new Logger(componentName, filePath);
        const expectedParameters1 = {
            ...expectedParameters,
            datetime: firstDatetime,
            logLevel: definitions.logLevel.info
        };
        const expectedParameters2 = {
            ...expectedParameters,
            datetime: secondDatetime,
            logLevel: definitions.logLevel.warning
        };
        const expectedParameters3 = {
            ...expectedParameters,
            datetime: currentDatetime,
            logLevel: definitions.logLevel.error
        };

        // When
        logger.info(message);
        logger.warning(message);
        logger.error(message);

        // Then
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters1);
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters2);
        expect(translator.translate).toHaveBeenCalledWith(expectedLogFormat, expectedParameters3);
    });
});
