'use strict';

/* eslint-disable no-console */

const { LoggerFactory } = require('../../src/logger-factory');

describe('logger', () => {
    let component1;
    let component2;
    let component3;
    let message1;
    let message2;
    let message3;
    let expectedOutput1;
    let expectedOutput2;
    let expectedOutput3;

    beforeEach(() => {
        console.info = jest.fn();
        console.warn = jest.fn();
        console.error = jest.fn();
        let milliseconds = 0;
        global.Date = jest.fn().mockReturnValue({
            getDate: () => 20,
            getMonth: () => 7,
            getFullYear: () => 1987,
            getHours: () => 13,
            getMinutes: () => 37,
            getSeconds: () => 0,
            getMilliseconds: () => milliseconds += 100
        });
        component1 = 'Component1';
        component2 = 'Component2';
        component3 = 'Component3';
        message1 = 'Initialized.';
        message2 = 'Failed to initialize.';
        message3 = 'Up and running.';
        expectedOutput1 = `[20/08/1987 13:37:00.100] [${component1}] INFO: ${message1}`;
        expectedOutput2 = `[20/08/1987 13:37:00.200] [${component2}] ERROR: ${message2}`;
        expectedOutput3 = `[20/08/1987 13:37:00.300] [${component3}] WARNING: ${message3}`;
    });

    test('should create multiple instances of Logger and write output to debug console', () => {
        // Given
        const loggerFactory = new LoggerFactory();
        const logger1 = loggerFactory.create(component1);
        const logger2 = loggerFactory.create(component2);
        const logger3 = loggerFactory.create(component3);

        // When
        logger1.info(message1);
        logger2.error(message2);
        logger3.warning(message3);

        // Then
        expect(console.info).toHaveBeenCalledWith(expectedOutput1);
        expect(console.error).toHaveBeenCalledWith(expectedOutput2);
        expect(console.warn).toHaveBeenCalledWith(expectedOutput3);
    });

    test('should create multiple instances of Logger, write output to debug console and send it through http client', () => {
        // Given
        const httpClient = { send: jest.fn() };
        const loggerFactory = new LoggerFactory(httpClient);
        const logger1 = loggerFactory.create(component1);
        const logger2 = loggerFactory.create(component2);
        const logger3 = loggerFactory.create(component3);

        // When
        logger1.info(message1);
        logger2.error(message2);
        logger3.warning(message3);

        // Then
        expect(console.info).toHaveBeenCalledWith(expectedOutput1);
        expect(httpClient.send).toHaveBeenCalledWith(expectedOutput1);
        expect(console.error).toHaveBeenCalledWith(expectedOutput2);
        expect(httpClient.send).toHaveBeenCalledWith(expectedOutput2);
        expect(console.warn).toHaveBeenCalledWith(expectedOutput3);
        expect(httpClient.send).toHaveBeenCalledWith(expectedOutput3);
    });
});
