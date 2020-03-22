'use strict';

jest.mock('../../src/translator');

const { translator } = require('../../src/translator');

const { HttpClientException, TypeException } = require('../../src/exceptions');

describe('exceptions', () => {
    let expectedResult;
    let expectedFormat;

    beforeEach(() => {
        expectedResult = { error: 'Error' };
        global.Error = jest.fn().mockReturnValue(expectedResult);
        expectedFormat = 'Format';
    });

    test('should have defined `http client` exception', () => {
        // Given, When
        const exception = new HttpClientException(expectedFormat);

        // Then
        expect(exception).toBe(expectedResult);
    });

    test('should have defined `type` exception', () => {
        // Given
        const actor = 'Actor';

        // When
        const exception = new TypeException(expectedFormat, actor);

        // When, Then
        expect(translator.translate).toHaveBeenCalledWith(expectedFormat, { type: typeof actor });
        expect(exception).toBe(expectedResult);
    });
});
