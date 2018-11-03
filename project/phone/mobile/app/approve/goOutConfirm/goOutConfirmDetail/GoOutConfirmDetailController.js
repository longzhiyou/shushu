/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('goOutConfirmDetailController', GoOutConfirmDetailController);
    /* @ngInject */
    function GoOutConfirmDetailController(Restangular,$stateParams,auth,$state,$ionicHistory,permissions,$rootScope){
        var vm = this;
        vm.permission="RCY304";
        vm.permissions = permissions;
        vm.memberId = $stateParams.memberId;
        vm.applyId = $stateParams.applyId;
        vm.param = $stateParams.param;
        vm.list;
        vm.auditList = [];
        vm.noData = false;
        getGoOutAuditDetail();
        function getGoOutAuditDetail(){
            var account = auth.getObject("account");
            vm.credentials={
                "userId":account.userId,
                "applyId":vm.applyId
            };
            var proc = Restangular.all('reqGoOutConfirmDetail');
            proc.post(vm.credentials).then(function(ret) {

                if (ret.returnCode == "0") {
                    vm.list = ret.list;
                    vm.noData = false;
                    if (vm.list == null || vm.list.length == 0 ){
                        vm.noData = true;
                    }else {
                        for (var i = 0 ;i<vm.list.length;i++){
                            if(vm.list[i].division==3){
                                var date = new Date(vm.list[i].operateDate);
                                vm.operateDate =date.Format("yyyy-MM-dd");
                                vm.resultName = vm.list[i].resultName;
                            }
                            if(vm.list[i].division==4){
                                if(vm.list[i].operateDate != null){
                                    var date = new Date(vm.list[i].operateDate);
                                    vm.list[i].operateDate =date.Format("yyyy-MM-dd");
                                }
                                vm.auditList.push(vm.list[i]);
                            }
                        }
                    }

                }
            }, function() {

            });
        }

        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        vm.agreeApply = function(){
            var account = auth.getObject("account");
            vm.credentials={
                "memberId" : vm.memberId,
                "applyId" : vm.applyId,
                "staffId": account.staffId,
                "staffName": account.staffName,
                "groupName":account.groupName,
                "instituteName":account.instituteName,
                "userId":account.userId
            };

            var proc = Restangular.all("reqGoOutConfirmAudit");
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallGoOutConfirmListMethod",{});
                    $rootScope.$emit("CallApproveListMethod",{});
                    $ionicHistory.goBack(-1);

                }
            }, function() {

            });
        }
    }

})(this.angular);