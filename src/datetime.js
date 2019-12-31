'use strict';

const { definitions } = require('./definitions');
const { translator } = require('./translator');

const getDate = () => new Date();

exports.datetime = {
    getCurrent: () => {
        const date = getDate();

        const currentDatetime = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            fullYear: date.getFullYear(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            millisecond: date.getMilliseconds()
        };

        return translator.translate(definitions.format.datetime, currentDatetime)
            .replace(/\d+/g, (match) => match.padStart(2, '0'))
            .replace(/\.\d+/, (match) => `.${match.substr(1).padStart(3, '0')}`);
    }
};
