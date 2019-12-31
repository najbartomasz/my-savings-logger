'use strict';

const { definitions } = require('./definitions');
const { Logger } = require('./logger');
const { TypeException } = require('./exceptions');

exports.LoggerFactory = function () {
    const loggers = new Map();

    return {
        create: (componentName) => {
            if (typeof componentName !== definitions.type.name) {
                throw new TypeException(definitions.error.invalidComponentName, componentName);
            }

            if (!loggers.has(componentName)) {
                loggers.set(componentName, new Logger(componentName));
            }

            return loggers.get(componentName);
        }
    };
};
