/**
 * 配置模块，主要是路由相关.
 *
 * Configures the UI-Router states and their associated URL routes and views
 * Also adds "state-change" reporting for debugging during development
 *
 * Created by longzhiyou on 2016-06-12.
 */
(function(angular){
    "use strict";
    angular.module("app").config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            'http://192.168.1.12/**',
            'http://demo.jkwatch99.com/**',
            'http://community.jkwatch99.com/**',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://192.168.1.98:8080/**']);
    });

})(this.angular);