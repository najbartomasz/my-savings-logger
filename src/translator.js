'use strict';

const { definitions } = require('./definitions');
const { TypeException } = require('./exceptions');

exports.translator = {
    translate: (format, args = {}) => {
        if (typeof args !== definitions.type.translateArguments) {
            throw new TypeException(definitions.error.invalidTranslateArguments, args);
        }

        let message = format;
        for (const [ key, value ] of Object.entries(args)) {
            message = message.split(`{${key}}`).join(value);
        }

        return message;
    }
};
