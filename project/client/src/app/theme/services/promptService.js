/**
 * 提示框服务
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('promptService', promptService);

    /** @ngInject */
    function promptService(toastr) {

        return {
            success: function (value) {
                toastr.info(value);
            },
            failure: function (value) {
                toastr.error(value);
            }
        };
    }

})();