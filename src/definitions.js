'use strict';


const type = {
    name: 'string',
    translateArguments: 'object',
    httpClientSend: 'function'
};

const error = {
    invalidComponentName: `Invalid type provided for component name. Expected ${type.name}, received {type}.`,
    invalidTranslateArguments: `Invalid type provided for translate arguments. Expected ${type.translateArguments}, received {type}.`,
    missingHttpClientSend: 'Missing HttpClient\'s send method.',
    invalidHttpClientSend: `HttpClient's send is not of type ${type.httpClientSend}.`
};

const format = {
    datetime: '{day}/{month}/{fullYear} {hour}:{minute}:{second}.{millisecond}',
    log: '[{datetime}] [{componentName}] {logLevel}: {message}'
};

const logLevel = {
    info: 'INFO',
    warning: 'WARNING',
    error: 'ERROR'
};

exports.definitions = {
    error,
    format,
    logLevel,
    type
};
