/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('checkOutListController', CheckOutListController);
    /* @ngInject */
    function CheckOutListController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.list;
        vm.noData = false;
        getCheckOutList();
        //取得老人一览
        function getCheckOutList() {
            var account = auth.getObject("account");
            vm.credentials={
                "userId":account.userId
            };
            var proc = Restangular.all('reqCheckOutList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.list = ret.list;
                    vm.noData = false;
                    if (vm.list == null || vm.list.length == 0 ){
                        vm.noData = true;
                    }else {
                        for (var i = 0 ;i<vm.list.length;i++){
                            if (vm.list[i].avatarPath == null){
                                vm.list[i].avatarPath = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            }
                            var date = new Date(vm.list[i].admissionDateAct);
                            vm.list[i].admissionDateAct =date.Format("yyyy-MM-dd");

                            var date1 = new Date(vm.list[i].implementationDate);
                            vm.list[i].implementationDate =date1.Format("yyyy-MM-dd");

                            var date2 = new Date(vm.list[i].applyDate);
                            vm.list[i].applyDate =date2.Format("yyyy-MM-dd");
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
            var param = {
                "personName":item.personName,
                "bedInfo":item.bedInfo,
                "applyDate":item.applyDate,
                "implementationDate":item.implementationDate,
                "reason":item.reason,
                "memo":item.memo
            }
            $state.go("app.checkOutDetail", {
                memberId: item.memberId,
                applyId: item.modifyApplyId,
                param: param
            });

        }
        $rootScope.$on("CallCheckOutListMethod",function(){
            getCheckOutList();
        });
    }

})(this.angular);