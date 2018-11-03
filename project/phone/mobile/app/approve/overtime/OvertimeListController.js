/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('overtimeListController', OvertimeListController);
    /* @ngInject */
    function OvertimeListController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.list;
        vm.noData = false;
        getOvertimeList();
        //取得老人一览
        function getOvertimeList() {
            var account = auth.getObject("account");
            vm.credentials={
            };
            var proc = Restangular.all('reqOvertimeList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.list = ret.list;
                    vm.noData = false;
                    if (vm.list == null || vm.list.length == 0 ){
                        vm.noData = true;
                    }else {
                        for (var i = 0 ;i<vm.list.length;i++){
                            var date = new Date(vm.list[i].insertTime);
                            vm.list[i].insertTime =date.Format("yyyy-MM-dd hh:mm");
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
        //迁移到子画面
        vm.toDetail = function(item){
            var sourceOtApplyId = null;
            if (item.sourceOtApplyId != null && item.sourceOtApplyId != ''){
                sourceOtApplyId = item.sourceOtApplyId;
            }
            //1：一般加班申请  2：调整的申请 3.取消单的申请
            if(item.otApplyType == 1 || item.otApplyType == 2){
                $state.go("app.overtimeDetail", {
                    otApplyId: item.otApplyId,
                    staffId: item.staffId,
                    auditId: item.auditId,
                    sourceOtApplyId: sourceOtApplyId,
                    otApplyType: item.otApplyType
                });
            }else {
                $state.go("app.overtimeDetailCancel", {
                    otApplyId: item.otApplyId,
                    staffId: item.staffId,
                    auditId: item.auditId,
                    sourceOtApplyId: sourceOtApplyId,
                    otApplyType: item.otApplyType
                });
            }


        }
        $rootScope.$on("CallOvertimeListMethod",function(){
            getOvertimeList();
        });
    }

})(this.angular);