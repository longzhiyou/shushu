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
            getEmbedded: function (name,hal) {
                // set the id from the self link
                return hal._embedded[name];
            },
            getId: function (item) {
                // set the id from the self link
                if (item._links && item._links.self.href.match(/\d+$/)) {
                   return item._links.self.href.match(/\d+$/)[0];
                }
                return 0;
            }
        };
    }

})();