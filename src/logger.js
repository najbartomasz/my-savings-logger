'use strict';

const { datetime } = require('./datetime');
const { definitions } = require('./definitions');
const { translator } = require('./translator');

exports.Logger = function (componentName, httpClient) {
    const getTranslatedMessage = (logLevel, message) => {
        return translator.translate(
            definitions.format.log, { datetime: datetime.toFormattedString(), componentName, logLevel, message });
    };

    const sendLog = (translatedMessage) => {
        if (httpClient) {
            httpClient.send(translatedMessage);
        }
    };

    return {
        info: (message) => {
            const translatedMessage = getTranslatedMessage(definitions.logLevel.info, message);
            /* eslint-disable-next-line no-console */
            console.info(translatedMessage);
            sendLog(translatedMessage);
        },
        warning: (message) => {
            const translatedMessage = getTranslatedMessage(definitions.logLevel.warning, message);
            /* eslint-disable-next-line no-console */
            console.warn(translatedMessage);
            sendLog(translatedMessage);
        },
        error: (message) => {
            const translatedMessage = getTranslatedMessage(definitions.logLevel.error, message);
            /* eslint-disable-next-line no-console */
            console.error(translatedMessage);
            sendLog(translatedMessage);
        }
    };
};
