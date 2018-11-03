/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('chgPasswordController', ChgPasswordController);
    /* @ngInject */
    function ChgPasswordController($state,auth,$ionicHistory,Restangular,toastr){
        var vm = this;
        vm.oldPassword;
        vm.newPassword;
        vm.reNewPassword;
        vm.save = function(){
            vm.message="";
            if (vm.oldPassword ==''){
                vm.message="没有输入旧秘密";
                toastr.error(vm.message, "错误");
                return ;
            }
            if (vm.newPassword ==''){
                vm.message="没有输入新秘密";
                toastr.error(vm.message, "错误");
                return ;
            }
            if (vm.newPassword != vm.reNewPassword){
                vm.message="两次输入的密码不一致";
                toastr.error(vm.message, "错误");
                return ;
            }
            doSave();
        };
        function doSave(){
            vm.message="";
            var account = auth.getObject("account")
            vm.credentials={
                "loginId": account.userId,
                "userName":account.staffName,
                "oldpassword":vm.oldPassword,
                "newpassword":vm.newPassword
            };
            var proc = Restangular.all('updUserPassword');
            proc.post(vm.credentials).then(function(ret) {

                if (ret.returnCode == "0") {
                    $ionicHistory.goBack(-1);
                } else if (ret.returnCode == "1") {
                    vm.message=ret.message;
                } else if (ret.returnCode == "8") {
                    vm.message=ret.message;
                } else {
                    vm.message="系统异常";
                }
                if (vm.message != '') {
                    toastr.error(vm.message, "错误");
                    vm.message="";
                }

            }, function() {
                vm.message="系统异常";
                if (vm.message != '') {
                    toastr.error(vm.message, "错误");
                    vm.message="";
                }
            });
        }

    }

})(this.angular);