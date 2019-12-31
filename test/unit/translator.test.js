'use strict';

jest.mock('../../src/definitions');
jest.mock('../../src/exceptions');

const { definitions } = require('../../src/definitions');
const { TypeException } = require('../../src/exceptions');

const { translator } = require('../../src/translator');

describe('translator', () => {
    test('should have defined `translate` method', () => {
        // Given,, When, Then
        expect(translator.translate).toBeDefined();
    });

    test('shoud throw `invalid translate argument` exception when invalid translate arguments were provided', () => {
        // Given
        const message = '';
        const invalidTranstaleArguments = 1;
        const exceptedError = 'Error';
        definitions.error.invalidTranslateArguments = exceptedError;

        // When, Then
        expect(() => translator.translate(message, invalidTranstaleArguments)).toThrow();
        expect(TypeException).toHaveBeenCalledWith(exceptedError, invalidTranstaleArguments);
    });

    test('should translate message when additional parameters were not provided', () => {
        // Given
        const message = 'Some message to translate.';
        const expectedOutput = message;

        // When
        const output = translator.translate(message);

        // Then
        expect(output).toEqual(expectedOutput);
    });

    test('should translate message when unique parameters were provided', () => {
        // Given
        const message = 'Some {parameter1} to {parameter2}.';
        const parameter1 = 'message';
        const parameter2 = 'translate';
        const expectedOutput = 'Some message to translate.';

        // When
        const output = translator.translate(message, { parameter1, parameter2 });

        // Then
        expect(output).toEqual(expectedOutput);
    });

    test('should translate message when multiplicated parameters were provided', () => {
        // Given
        const message = 'The first seven numbers of fibonnaci are {arg1} {arg1} {arg2} {arg3} {arg5} {arg8} {arg1}{arg3}.';
        const parameters = {
            arg1: '1',
            arg2: '2',
            arg3: '3',
            arg5: '5',
            arg8: '8'
        };
        const expectedOutput = 'The first seven numbers of fibonnaci are 1 1 2 3 5 8 13.';

        // When
        const output = translator.translate(message, parameters);

        // Then
        expect(output).toEqual(expectedOutput);
    });
});
