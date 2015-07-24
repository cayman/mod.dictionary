_dictionaryMod.provider('dictionaryMod', function () {
    console.log('dictionaryMod.provider');
    var _name = 'dictionary';
    this.setModName = function (modName) {
        _name = modName;
    };

    var _exampleTemplate = null;
    this.setExampleTemplate = function (template) {
        _exampleTemplate = template;
    };

    this.$get = function ($log, $rootScope, coreMod) {
        $log.log('dictionaryMod.provider.$get');

        var _config = coreMod.configMod(_name);

        return {
            getAppUrl: function () {
                return  coreMod.getAppUrl();
            },
            getUrl: function () {
                return  _config.url;
            },
            getKeyField: function () {
                return  _config.field.key || 'code';
            },
            getRegField: function () {
                return  _config.field.reg || 'reg';
            },
            getValueField: function () {
                return  _config.field.value || 'value';
            },
            getEmptyValue: function () {
                return  _config.value.empty || '';
            },
            getLoadingValue: function () {
                return  _config.value.loading || '...';
            }
        };
    };
    this.$get.$inject = ['$log', '$rootScope', 'coreMod'];
});
