'use strict';

const { definitions } = require('./definitions');
const { TypeException } = require('./exceptions');
const { Logger } = require('./logger');

const loggers = new Map();

exports.LoggerFactory = function () {
    return {
        create: (componentName) => {
            if (typeof componentName !== definitions.type.naming) {
                throw new TypeException(definitions.error.invalidComponentName, componentName);
            }

            if (!loggers.has(componentName)) {
                loggers.set(componentName, new Logger(componentName));
            }

            return loggers.get(componentName);
        }
    };
};
