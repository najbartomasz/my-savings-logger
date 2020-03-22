'use strict';

const { definitions } = require('./definitions');
const { Logger } = require('./logger');
const { HttpClientException, TypeException } = require('./exceptions');

const validateHttpClient = (httpClient) => {
    if (httpClient !== undefined) {
        if (!httpClient.send) {
            return definitions.error.missingHttpClientSend;
        }

        if (typeof httpClient.send !== definitions.type.httpClientSend) {
            return definitions.error.invalidHttpClientSend;
        }
    }

    return undefined;
};

exports.LoggerFactory = function (httpClient) {
    const httpClientError = validateHttpClient(httpClient);
    if (httpClientError) {
        throw new HttpClientException(httpClientError);
    }

    const loggers = new Map();

    return {
        create: (componentName) => {
            if (typeof componentName !== definitions.type.name) {
                throw new TypeException(definitions.error.invalidComponentName, componentName);
            }

            if (!loggers.has(componentName)) {
                loggers.set(componentName, new Logger(componentName, httpClient));
            }

            return loggers.get(componentName);
        }
    };
};
