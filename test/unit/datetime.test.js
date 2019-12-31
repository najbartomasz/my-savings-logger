'use strict';

jest.mock('../../src/definitions');
jest.mock('../../src/translator');

const { translator } = require('../../src/translator');

const { datetime } = require('../../src/datetime');

describe('datetime', () => {
    beforeEach(() => {
        global.Date = jest.fn().mockImplementation(() => ({
            getDate: jest.fn(),
            getMonth: jest.fn(),
            getFullYear: jest.fn(),
            getHours: jest.fn(),
            getMinutes: jest.fn(),
            getSeconds: jest.fn(),
            getMilliseconds: jest.fn()
        }));
    });

    test('should return current date and time', () => {
        // Given
        translator.translate = jest.fn().mockReturnValue('21/12/2018 12:23:29.548');
        const expectedDatetime = '21/12/2018 12:23:29.548';

        // When
        const currentDatetime = datetime.getCurrent();

        // Then
        expect(currentDatetime).toBe(expectedDatetime);
    });

    test('should return current date and time when day is less that 10', () => {
        // Given
        translator.translate = jest.fn().mockReturnValue('4/12/2018 12:23:29.548');
        const expectedDatetime = '04/12/2018 12:23:29.548';

        // When
        const currentDatetime = datetime.getCurrent();

        // Then
        expect(currentDatetime).toBe(expectedDatetime);
    });

    test('should return current date and time when month is less that 10', () => {
        // Given
        translator.translate = jest.fn().mockReturnValue('21/4/2018 12:23:29.548');
        const expectedDatetime = '21/04/2018 12:23:29.548';

        // When
        const currentDatetime = datetime.getCurrent();

        // Then
        expect(currentDatetime).toBe(expectedDatetime);
    });

    test('should return current date and time when hour is less that 10', () => {
        // Given
        translator.translate = jest.fn().mockReturnValue('21/12/2018 4:23:29.548');
        const expectedDatetime = '21/12/2018 04:23:29.548';

        // When
        const currentDatetime = datetime.getCurrent();

        // Then
        expect(currentDatetime).toBe(expectedDatetime);
    });

    test('should return current date and time when minute is less that 10', () => {
        // Given
        translator.translate = jest.fn().mockReturnValue('21/12/2018 12:4:29.548');
        const expectedDatetime = '21/12/2018 12:04:29.548';

        // When
        const currentDatetime = datetime.getCurrent();

        // Then
        expect(currentDatetime).toBe(expectedDatetime);
    });

    test('should return current date and time when second is less that 10', () => {
        // Given
        translator.translate = jest.fn().mockReturnValue('21/12/2018 12:23:4.548');
        const expectedDatetime = '21/12/2018 12:23:04.548';

        // When
        const currentDatetime = datetime.getCurrent();

        // Then
        expect(currentDatetime).toBe(expectedDatetime);
    });

    test('should return current date and time when millisecond is less that 100', () => {
        // Given
        translator.translate = jest.fn().mockReturnValue('21/12/2018 12:23:29.44');
        const expectedDatetime = '21/12/2018 12:23:29.044';

        // When
        const currentDatetime = datetime.getCurrent();

        // Then
        expect(currentDatetime).toBe(expectedDatetime);
    });

    test('should return current date and time when millisecond is less that 10', () => {
        // Given
        translator.translate = jest.fn().mockReturnValue('21/12/2018 12:23:29.4');
        const expectedDatetime = '21/12/2018 12:23:29.004';

        // When
        const currentDatetime = datetime.getCurrent();

        // Then
        expect(currentDatetime).toBe(expectedDatetime);
    });
});
