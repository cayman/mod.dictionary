_dictionaryMod.factory('dictionaryRest', function ($log, dictionaryMod, $resource) {
    $log.info('dictionaryMod.dictionaryRest');

    var urls = dictionaryMod.getUrl();

    if (!angular.isObject(urls)) {
        urls = {
            default: angular.isString(urls) ? urls : undefined
        };
    }

    function getUrl(name){
        var url = urls[name] || urls.default || '/models/:name.json';
        return (url.substr(-5) === '.json')? dictionaryMod.getAppUrl() + url : url;
    }

    var dictionary = {};

    return {
        get: function(name,isObject){
            if (!name) {
                $log.error('Not specified dictionary name for the filter');
                throw 'Not specified dictionary name';
            }
            if(!dictionary[name]){
                var url = getUrl(name);
                var resource = $resource(url,{},{
                        query:{method:'GET',isArray: !isObject, cache: true}
                    });
                dictionary[name] = resource.query({name: name},
                    function success(data) {
                    $log.debug('loaded dictionary name:'+name,'url:'+url);
                 }, function success(data) {
                    $log.error('loading error name:'+name,'url:'+url, data);
                    //   delete dict[name];
                });
            }
            return dictionary[name];
        }

    };
});


_dictionaryMod.factory('dictionaryArray', function ($log, dictionaryRest,dictionaryMod) {

    var defaultFieldKey = dictionaryMod.getKeyField();
    var defaultFieldReg = dictionaryMod.getRegField();
    var defaultFieldValue = dictionaryMod.getValueField();
    var defaultEmptyValue = dictionaryMod.getEmptyValue();
    var defaultLoadingValue = dictionaryMod.getLoadingValue();

    function parseFields(fields, defaultFieldKey, defaultFieldValue){
        var field = {};
        if(angular.isObject(fields)){
            var key = Object.keys(fields)[0];
            field.key = key || defaultFieldKey;
            field.value = key ? fields[key] : defaultFieldValue;
        }else if(angular.isString(fields)){
            field.key = defaultFieldKey;
            field.value = fields;
        }else{
            field.key = defaultFieldKey;
            field.value = defaultFieldValue;
        }
        return field;

    }


    function getDefaultValue(key,defaultValue){
        if(defaultValue === true){
            $log.debug('show key',key);
        }
        return defaultValue ? (defaultValue === true ? key : defaultValue)  : null;
    }
    return {
        getItem: function (dictionary, key, fields, defaultValue) {

            if (!dictionary){
                return null;
            }

            if(dictionary.$resolved === false) {
                return defaultLoadingValue;
            }

            var field = parseFields(fields, defaultFieldKey, defaultFieldValue);

            for (var i = 0, len = dictionary.length; i < len; i++) {
                if (dictionary[i][field.key] === key) {
                    // $log.debug('found ',dictionary[i]);
                    return dictionary[i][field.value];
                }
            }
            return getDefaultValue(key, defaultValue || defaultEmptyValue);

        },
        getMapItem: function (dictionary, key, defaultValue) {
            if (!dictionary){
                return null;
            }

            if(dictionary.$resolved === false) {
                return defaultLoadingValue;
            }
            return dictionary[key] || getDefaultValue(key, defaultValue || defaultEmptyValue);
        },
        getReg: function (dictionary, key, fields, defaultValue ) {
            if (!dictionary){
                return null;
            }

            if(dictionary.$resolved === false) {
                return defaultLoadingValue;
            }

            var field = parseFields(fields, defaultFieldReg, defaultFieldValue);

            for (var i = 0, len = dictionary.length; i < len; i++) {
                if (new RegExp(dictionary[i][field.key], 'i').test(key)) {
                    return dictionary[i][field.value];
                }
            }
            return getDefaultValue(key, defaultValue || defaultEmptyValue);

        }
    };
});
