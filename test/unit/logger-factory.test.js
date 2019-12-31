'use strict';

jest.mock('fs');
jest.mock('path');
jest.mock('../../src/definitions');
jest.mock('../../src/exceptions');
jest.mock('../../src/logger');

const fs = require('fs');
const path = require('path');
const { definitions } = require('../../src/definitions');
const { DirectoryInputOutputException, FileInputOutputException, TypeException } = require('../../src/exceptions');
const { Logger } = require('../../src/logger');

let LoggerFactory;

describe('logger-factory', () => {
    beforeEach(() => {
        jest.isolateModules(() => {
            LoggerFactory = require('../../src/logger-factory').LoggerFactory;
        });
    });

    test('should have defined `create` method', () => {
        // Given
        const loggerFactory = new LoggerFactory();

        // When, Then
        expect(loggerFactory.create).toBeDefined();
    });

    test('should throw `invalid component name` error when no component name was provided', () => {
        // Given
        const expectedError = 'Error';
        definitions.error.invalidComponentName = expectedError;
        const expectedComponentName = undefined;
        const loggerFactory = new LoggerFactory();

        // When, Then
        expect(() => loggerFactory.create()).toThrow();
        expect(TypeException).toHaveBeenCalledWith(expectedError, expectedComponentName);
    });

    test('should throw `invalid component name` error when invalid component name was provided', () => {
        // Given
        const expectedError = 'Error';
        definitions.error.invalidComponentName = expectedError;
        const expectedComponentName = 2;
        const loggerFactory = new LoggerFactory();

        // When, Then
        expect(() => loggerFactory.create(expectedComponentName)).toThrow();
        expect(TypeException).toHaveBeenCalledWith(expectedError, expectedComponentName);
    });

    test('should return new Logger instance if it was not created before', () => {
        // Given
        const componentName = 'Component';
        const loggerFactory = new LoggerFactory();

        // When
        const logger = loggerFactory.create(componentName);

        // Then
        expect(logger).toBeInstanceOf(Logger);
        expect(Logger).toHaveBeenCalledWith(componentName);
    });

    test('should return existing instance of Logger if called for already created component', () => {
        // Given
        const componentName = 'Component';
        const loggerFactory = new LoggerFactory();

        // When
        const logger1 = loggerFactory.create(componentName);
        const logger2 = loggerFactory.create(componentName);

        // Then
        expect(Logger).toHaveBeenCalledTimes(1);
        expect(logger1).toBe(logger2);
    });
});
