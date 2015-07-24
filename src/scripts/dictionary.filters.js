_dictionaryMod.filter('dictionary', function ($log, dictionaryRest, dictionaryArray, dictionaryMod) {

    return function (key, name, fields, defaultValue) {
        return dictionaryArray.getItem(dictionaryRest.get(name), key, fields, defaultValue);
    };
});

_dictionaryMod.filter('dictionaryReg', function ($log, dictionaryRest, dictionaryArray, dictionaryMod) {

    return function (reg, name, fields, defaultValue) {
        return dictionaryArray.getReg(dictionaryRest.get(name), reg, fields, defaultValue);
    };
});

_dictionaryMod.filter('dictionaryMap', function ($log, dictionaryRest, dictionaryArray) {
    return function (key, name, defaultValue) {
        return dictionaryArray.getMapItem(dictionaryRest.get(name,true), key, defaultValue);
    };
});


_dictionaryMod.filter('dictionaryShortName', function () {

    return function (name, maxLength) {
        var length = maxLength || 59;
        return (name && name.length > length) ? name.substr(0, 19) + '...' + name.substr(-40) : name;
    };
});

_dictionaryMod.filter('dictionaryBytes', function () {
    return function (bytes, precision) {
        if (!bytes || isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
            return '-';
        }
        if (typeof precision === 'undefined') {
            precision = 1;
        }
        var units = ['Б', 'кБ', 'мБ', 'ГБ', 'ТБ', 'ПБ'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
    };
});

_dictionaryMod.filter('dictionaryBase64', function () {
    return function (base64value, field) {
        return (base64value && (!field || field.slice(-6) === 'Base64')) ? atob(base64value) : base64value;
    };
});

_dictionaryMod.filter('dictionaryRuble', function () {
    return function (copeck) {
        if (copeck < 0) {
            return '-';
        }
        return (copeck / 100).toFixed(2) + ' руб.';
    };
});