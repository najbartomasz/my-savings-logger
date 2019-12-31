'use strict';

jest.mock('../../src/translator');

const { translator } = require('../../src/translator');

const { TypeException } = require('../../src/exceptions');

describe('exceptions', () => {
    test('should have defined `type` exception', () => {
        // Given
        const expectedResult = { error: 'Error' };
        global.Error = jest.fn().mockReturnValue(expectedResult);
        const actor = 'Actor';
        const expectedFormat = 'Format';

        // When
        const exception = new TypeException(expectedFormat, actor);

        // When, Then
        expect(translator.translate).toHaveBeenCalledWith(expectedFormat, { type: typeof actor });
        expect(exception).toBe(expectedResult);
    });
});
