/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('dutyRosterController', DutyRosterController);
    /* @ngInject */
    function DutyRosterController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$ionicPopup,commonFuncService){
        var vm = this;

        vm.personList;
        vm.planDate = commonFuncService.formatDate("yyyyMM",new Date());
        vm.dispDate = vm.planDate.substr(0,4)+ "年"+vm.planDate.substr(4,6)+ "月";
        vm.credentials;
        vm.scheduleList;
        //取得老人一览
        function getPersonList() {
            vm.message="";
            var account = auth.getObject("account");
            vm.credentials={
                "staffId": account.staffId,
                "workDate":vm.planDate,
                "staffName":account.staffName
            };
            var proc = Restangular.all('reqDutyRosterInfo');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;
                if (ret.returnCode == "0") {
                    vm.scheduleList = ret.scheduleList;
                    for (var i = 0;i<vm.scheduleList.length;i++){
                        for (var j = 0;j<7;j++) {
                            var icon = vm.scheduleList[i][j].icon;
                            if (icon != null && icon != '') {
                                if (icon.indexOf("assets/img/home/icon/") >= 0) {
                                    vm.scheduleList[i][j].icon = MobilePublic.getServerUrl(icon, true);
                                }
                            }
                        }
                    }
                }
            }, function() {

            });
        }

        vm.toLeft = function(){
            var year = Number(vm.planDate.substr(0,4));
            var month = Number(vm.planDate.substr(4,6));
            month--;
            if (month == 0){
                month = 12;
                year--;
            }
            vm.planDate = ""+year + (month<10?"0"+month:month);
            vm.dispDate = vm.planDate.substr(0,4)+ "年"+vm.planDate.substr(4,6)+ "月";
            getPersonList();
        };
        vm.toRight = function(){
            var year = Number(vm.planDate.substr(0,4));
            var month = Number(vm.planDate.substr(4,6));
            month++;
            if (month == 13){
                month = 1;
                year++;
            }
            vm.planDate = ""+year + (month<10?"0"+month:month);
            vm.dispDate = vm.planDate.substr(0,4)+ "年"+vm.planDate.substr(4,6)+ "月";
            getPersonList();
        };

        getPersonList();



    }

})(this.angular);