'use strict';

const { datetime } = require('./datetime');
const { definitions } = require('./definitions');
const { translator } = require('./translator');

exports.Logger = function (componentName) {
    const getTranslatedMessage = (logLevel, message) => {
        return translator.translate(
            definitions.format.log, { datetime: datetime.toFormattedString(), componentName, logLevel, message });
    };

    return {
        info: (message) => {
            const translatedMessage = getTranslatedMessage(definitions.logLevel.info, message);
            /* eslint-disable-next-line no-console */
            console.info(translatedMessage);
        },
        warning: (message) => {
            const translatedMessage = getTranslatedMessage(definitions.logLevel.warning, message);
            /* eslint-disable-next-line no-console */
            console.warn(translatedMessage);
        },
        error: (message) => {
            const translatedMessage = getTranslatedMessage(definitions.logLevel.error, message);
            /* eslint-disable-next-line no-console */
            console.error(translatedMessage);
        }
    };
};
