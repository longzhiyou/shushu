/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('goInHospitalListController', GoInHospitalListController);
    /* @ngInject */
    function GoInHospitalListController($scope, $rootScope, setting,Restangular,$stateParams,toastr,auth,$state){
        var vm = this;
        vm.accessDiv = $stateParams.accessDiv;
        vm.list;
        vm.noData = false;
        getGoInHospitalList();
        //取得老人一览
        function getGoInHospitalList() {
            var account = auth.getObject("account");
            vm.credentials={
                "userId":account.userId
            };
            var proc = Restangular.all('reqGoInHospitalList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.list = ret.list;
                    vm.noData = false;
                    if (vm.list == null || vm.list.length == 0 ){
                        vm.noData = true;
                    }else {
                        for (var i = 0 ;i<vm.list.length;i++){
                            if (vm.list[i].headIconPath == null){
                                vm.list[i].headIconPath = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            }

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
            $state.go("app.goInHospitalDetail", {
                "personId":item.personId,
                "applyId":item.applyId,
                accessDiv:vm.accessDiv
            });

        }
        $rootScope.$on("CallGoInHospitalListMethod",function(){
            getGoInHospitalList();
        });
    }

})(this.angular);