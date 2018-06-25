/**
 *
 * Angular : Modal(ui.bootstrap.modal)的使用
 * http://www.jianshu.com/p/2cbf835509b1
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .factory('warningModalService', warningModalService);

    /** @ngInject */
    function warningModalService($uibModal) {

        return {
            open: function(data) {
                return $uibModal.open({

                    templateUrl: 'app/theme/components/modals/warningModal.html',
                    size: 'sm',
                    keyboard: false,
                    backdrop: 'static',
                     resolve: {
                        data: data
                    },
                    controller:function ($scope, $uibModalInstance, data) {
                        $scope.data = data;

                        // $scope.ok = function () {
                        //     $uibModalInstance.close($scope.selected.item);
                        // };
                        //
                        // $scope.cancel = function () {
                        //     $uibModalInstance.dismiss('cancel');
                        // };


                    }
                });
            },
            close: function() {
            }
        };
    }

})();