'use strict';

exports.translator = {
    translate: (format, args = {}) => {
        let message = format;
        Object.keys(args).forEach((arg) => {
            message = message.split(`{${arg}}`).join(args[arg]);
        });

        return message;
    }
};
