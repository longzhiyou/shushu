/**
 * 本地存储服务
 * Created by longzhiyou on 2016/11/14.
 */

(function (angular) {
    angular.module('app').factory('localService', [factory]);

    function factory() {

        return {
            set: function(key, value) {
                 localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return  localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                 localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse( localStorage[key] || '{}');
            },
            remove: function(key) {
                return  localStorage.removeItem[key];
            },
            clear: function() {
                return  localStorage.clear();
            }
        }

    }




})(this.angular);