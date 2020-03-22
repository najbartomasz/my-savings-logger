'use strict';

const { translator } = require('./translator');

exports.HttpClientException = function (format) {
    return new Error(format);
};

exports.TypeException = function (format, actor) {
    return new Error(translator.translate(format, { type: typeof actor }));
};
