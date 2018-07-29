/**
 * 超媒体服务
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('dataService', dataService);

    /** @ngInject */
    function dataService() {

        var data = {};
        return {
            set: function (key,item) {
                data[key]=item;
            },
            get: function (key) {
                return  data[key];
            }
        };
    }

})();