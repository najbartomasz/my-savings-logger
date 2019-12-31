'use strict';

/* eslint-disable no-console */

jest.mock('fs');

const fs = require('fs');
const path = require('path');

const { LoggerFactory } = require('../../src/logger-factory');

describe('logger', () => {
    test('should create multiple instances of Logger and write output to debug console', () => {
        // Given
        console.info = jest.fn();
        console.warn = jest.fn();
        console.error = jest.fn();
        let milliseconds = 0;
        const mockDate = {
            getDate: () => 20,
            getMonth: () => 7,
            getFullYear: () => 1987,
            getHours: () => 13,
            getMinutes: () => 37,
            getSeconds: () => 0,
            getMilliseconds: () => milliseconds += 100
        };
        global.Date = jest.fn().mockImplementation(() => mockDate);
        const message1 = 'Initialized.';
        const expectedMessage1 = `[20/08/1987 13:37:00.100] [Component1] INFO: ${message1}`;
        const message2 = 'Failed to initialize.';
        const expectedMessage2 = `[20/08/1987 13:37:00.200] [Component2] ERROR: ${message2}`;
        const message3 = 'Up and running.';
        const expectedMessage3 = `[20/08/1987 13:37:00.300] [Component3] INFO: ${message3}`;
        const message4 = 'Still running.';
        const expectedMessage4 = `[20/08/1987 13:37:00.400] [Component3] INFO: ${message4}`;
        const message5 = 'Something is wrong.';
        const expectedMessage5 = `[20/08/1987 13:37:00.500] [Component1] WARNING: ${message5}`;
        const message6 = 'Shutting down.';
        const expectedMessage6 = `[20/08/1987 13:37:00.600] [Component3] INFO: ${message6}`;
        const message7 = 'Critical failure!';
        const expectedMessage7 = `[20/08/1987 13:37:00.700] [Component1] ERROR: ${message7}`;
        const message8 = 'Successfully closed.';
        const expectedMessage8 = `[20/08/1987 13:37:00.800] [Component3] INFO: ${message8}`;
        const loggerFactory = new LoggerFactory();
        const logger1 = loggerFactory.create('Component1');
        const logger2 = loggerFactory.create('Component2');
        const logger3 = loggerFactory.create('Component3');

        // When
        logger1.info(message1);
        logger2.error(message2);
        logger3.info(message3);
        logger3.info(message4);
        logger1.warning(message5);
        logger3.info(message6);
        logger1.error(message7);
        logger3.info(message8);

        // Then
        expect(console.info).toHaveBeenCalledWith(expectedMessage1);
        expect(console.error).toHaveBeenCalledWith(expectedMessage2);
        expect(console.info).toHaveBeenCalledWith(expectedMessage3);
        expect(console.info).toHaveBeenCalledWith(expectedMessage4);
        expect(console.warn).toHaveBeenCalledWith(expectedMessage5);
        expect(console.info).toHaveBeenCalledWith(expectedMessage6);
        expect(console.error).toHaveBeenCalledWith(expectedMessage7);
        expect(console.info).toHaveBeenCalledWith(expectedMessage8);
    });
});
