/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('approveListController', ApproveListController);
    /* @ngInject */
    function ApproveListController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state,$ionicLoading){
        var vm = this;
        vm.accessDiv = $stateParams.accessDiv;
        vm.reviewedlist1;
        vm.reviewedlist2;
        vm.noData = false;
        $ionicLoading.show({
            template: 'Loading...'
        });
        getApproveList();
        //取得老人一览
        function getApproveList() {
            var account = auth.getObject("account");
            vm.credentials={
                userId : account.userId
            };
            var proc = Restangular.all('reqApproveList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.reviewedlist1 = ret.reviewedlist1;
                    vm.reviewedlist2 = ret.reviewedlist2;
                    vm.noData = false;
                    if ((vm.reviewedlist1 == null || vm.reviewedlist1.length == 0) && (vm.reviewedlist2 == null || vm.reviewedlist2.length == 0)){
                        vm.noData = true;
                    }
                }
                $ionicLoading.hide();
            }, function() {
                $ionicLoading.hide();
            });
        }
        //迁移到子画面
        vm.toDetail1 = function(index){
            if(index == 0){
                $state.go("app.goInHospitalList", {
                    accessDiv:vm.accessDiv
                });
            }
            if (index == 1) {
                $state.go("app.checkOutList", {});
            }
            if(index == 2){
                $state.go("app.goOutConfirmList", {});
            }
            if (index == 3) {
                $state.go("app.bedAdjustList", {});
            }
            if (index == 4) {
                $state.go("app.paymentList", {});
            }
            if (index == 5) {
                $state.go("app.serviceAdjustList", {});
            }

        }
        vm.toDetail2 = function(index){
            //请假审批
            if (index == 6) {
                $state.go("app.leaveList", {});
            }
            //加班审批
            if(index == 7){
                $state.go("app.overtimeList", {});
            }
            //物资采购审核
            if(index == 8){
                $state.go("app.purchaseAuditList", {});
            }
            //物资申领审核
            if(index == 9){
                $state.go("app.applyAuditList", {});
            }
        }
        $rootScope.$on("CallApproveListMethod",function(){
            getApproveList();
        });
    }

})(this.angular);