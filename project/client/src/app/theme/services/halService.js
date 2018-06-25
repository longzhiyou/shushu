/**
 * 超媒体服务
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('halService', halService);

    /** @ngInject */
    function halService() {

        return {
            getSelfLink: function (item) {
                // set the id from the self link
                if (item._links) {
                    return item._links.self.href;
                }
                return null;
            },
            getId: function (item) {
                // set the id from the self link
                if (item._links && item._links.self.href.match(/\d+$/)) {
                   return parseInt(item._links.self.href.match(/\d+$/)[0]);
                }
                return 0;
            }
        };
    }

})();