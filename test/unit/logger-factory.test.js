'use strict';

jest.mock('../../src/definitions');
jest.mock('../../src/exceptions');
jest.mock('../../src/logger');

const { definitions } = require('../../src/definitions');
const { HttpClientException, TypeException } = require('../../src/exceptions');

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

    test('should throw `missing http client\'s send method` exception, when http client does not contain send function', () => {
        // Given
        const expectedError = 'Error';
        definitions.error.missingHttpClientSend = expectedError;
        const invalidHttpClient = {};

        // When, Then
        expect(() => new LoggerFactory(invalidHttpClient)).toThrow();
        expect(HttpClientException).toHaveBeenCalledWith(expectedError);
    });

    test('should throw `invalid http client\'s send method` exception, when http client send is not of expected type', () => {
        // Given
        const expectedError = 'Error';
        definitions.error.invalidHttpClientSend = expectedError;
        const invalidHttpClient = { send: 1 };

        // When, Then
        expect(() => new LoggerFactory(invalidHttpClient)).toThrow();
        expect(HttpClientException).toHaveBeenCalledWith(expectedError);
    });

    test('should not throw any exception, when correct http client was provided', () => {
        // Given
        const httpClient = { send: jest.fn() };

        // When, Then
        expect(() => new LoggerFactory(httpClient)).not.toThrow();
    });

    test('should throw `invalid component name` exception when component name was not provided', () => {
        // Given
        const expectedError = 'Error';
        definitions.error.invalidComponentName = expectedError;
        const invalidComponentName = undefined;
        const loggerFactory = new LoggerFactory();

        // When, Then
        expect(() => loggerFactory.create()).toThrow();
        expect(TypeException).toHaveBeenCalledWith(expectedError, invalidComponentName);
    });

    test('should throw `invalid component name` error when invalid component name was provided', () => {
        // Given
        const expectedError = 'Error';
        definitions.error.invalidComponentName = expectedError;
        const invalidComponentName = 2;
        const loggerFactory = new LoggerFactory();

        // When, Then
        expect(() => loggerFactory.create(invalidComponentName)).toThrow();
        expect(TypeException).toHaveBeenCalledWith(expectedError, invalidComponentName);
    });

    test('should return new Logger instance if it was not created before', () => {
        // Given
        const componentName = 'Component';
        const loggerFactory = new LoggerFactory();

        // When
        const logger = loggerFactory.create(componentName);

        // Then
        expect(logger).toBeInstanceOf(Logger);
        expect(Logger).toHaveBeenCalledWith(componentName, undefined);
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
