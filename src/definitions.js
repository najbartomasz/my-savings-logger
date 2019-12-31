'use strict';

const format = {
    datetime: '{day}/{month}/{fullYear} {hour}:{minute}:{second}.{millisecond}',
    log: '[{datetime}] [{componentName}] {logLevel}: {message}'
};

const type = {
    naming: 'string'
};

const error = {
    invalidComponentName: `Invalid component name provided. Expected ${type.naming}, received {type}.`,
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
