'use strict';

/* eslint-disable no-console */

const { LoggerFactory } = require('../../src/logger-factory');

describe('logger', () => {
    test('should create multiple instances of Logger and write output to debug console', () => {
        // Given
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
        const component1 = 'Component1';
        const component2 = 'Component1';
        const component3 = 'Component1';
        const message1 = 'Initialized.';
        const expectedOutput1 = `[20/08/1987 13:37:00.100] [${component1}] INFO: ${message1}`;
        const message2 = 'Failed to initialize.';
        const expectedOutput2 = `[20/08/1987 13:37:00.200] [${component2}] ERROR: ${message2}`;
        const message3 = 'Up and running.';
        const expectedOutput3 = `[20/08/1987 13:37:00.300] [${component3}] WARNING: ${message3}`;
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
});
