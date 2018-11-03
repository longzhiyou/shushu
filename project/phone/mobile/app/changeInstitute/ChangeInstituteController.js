/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('changeInstituteController', ChangeInstituteController);
    /* @ngInject */
    function ChangeInstituteController(setting,auth,permissions,Restangular,$rootScope,$ionicHistory,$state,$location){
        var vm = this;
        vm.instituteDtoList = null;
        var account = auth.getObject("account");
        vm.instituteId = account.orgId;
        vm.groupId = account.groupId;
        getData();
        function getData(){
            var credentials={
            };
            var proc = Restangular.all('retGetInstitutes');
            proc.post(credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    vm.instituteDtoList = ret.instituteDtoList;
                    for (var i = 0 ; i < vm.instituteDtoList.length ;i++){
                        if (vm.instituteDtoList[i].instituteId == null){
                            vm.instituteDtoList[i].head = 'background-color: #11c1f3';
                        }
                        if (vm.instituteDtoList[i].instituteId == vm.instituteId && vm.instituteDtoList[i].groupId == vm.groupId) {
                            vm.instituteDtoList[i].ownership = true;
                        } else {
                            vm.instituteDtoList[i].ownership = false;
                        }
                      }
                }
            }, function() {
            });
        }
        //选择按钮处理
        vm.selectBtn = function(idx) {
            var instituteDto = vm.instituteDtoList[idx];
            vm.instituteId = instituteDto.instituteId;
            vm.groupId = instituteDto.groupId;
            for (var i = 0 ; i < vm.instituteDtoList.length ;i++){
                if (i == idx ){
                    vm.instituteDtoList[i].ownership = true;
                } else {
                    vm.instituteDtoList[i].ownership = false;
                }
            }
        };
        vm.save = function(){
            var account = auth.getObject("account");
            var credentials={
                chgGroupId:vm.groupId,
                instituteId : vm.instituteId,
                userId : account.userId
            };
            var proc = Restangular.all('reqChgInstitutes');
            proc.post(credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    auth.setObject("account",ret);
                    $rootScope.$emit("CallHomeMethod",{});
                    $ionicHistory.goBack(-1);
                }
            }, function() {
            });
        };

    }

})(this.angular);