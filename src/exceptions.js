'use strict';

const { translator } = require('./translator');

const getError = (format, args) => {
    return new Error(translator.translate(format, args));
};

exports.TypeException = function (format, name) {
    return getError(format, { type: typeof name });
};
