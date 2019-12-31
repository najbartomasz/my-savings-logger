'use strict';

/* eslint-disable no-new */

jest.mock('../../src/translator');

const { translator } = require('../../src/translator');

const expectedFormat = 'format';

describe('exceptions', () => {
    test('should have defined type exception handling functionality', () => {
        // Given
        const expectedName = 'name';
        const { TypeException } = require('../../src/exceptions');

        // When
        new TypeException(expectedFormat, expectedName);

        // When, Then
        expect(translator.translate).toHaveBeenCalledWith(expectedFormat, { type: typeof expectedName });
    });
});
