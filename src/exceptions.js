'use strict';

const { translator } = require('./translator');

exports.TypeException = function (format, actor) {
    return new Error(translator.translate(format, { type: typeof actor }));
};
