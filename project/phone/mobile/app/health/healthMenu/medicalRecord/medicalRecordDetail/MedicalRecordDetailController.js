/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('medicalRecordDetailController', MedicalRecordDetailController);
    /* @ngInject */
    function MedicalRecordDetailController($scope, $rootScope, $ionicHistory,Restangular,$stateParams,toastr,auth,$state,permissions){
        var vm = this;
        vm.recordId = $stateParams.recordId;
        vm.memberId = $stateParams.memberId;
        vm.operator = $stateParams.operator;
        vm.permission="HEA310";
        vm.permissions = permissions;

        getMedicalRecordDetail();
        //取得老人一览
        function getMedicalRecordDetail() {
            var account = auth.getObject("account");
            vm.credentials={
                "recordId":vm.recordId,
                "department":account.department,
                "operator":vm.operator,
                "memberId":vm.memberId
            };
            var proc = Restangular.all('reqMedicalRecordDetail');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    //加班详细
                    vm.personName = ret.personName;
                    var date = new Date(ret.measureDate);
                    vm.measureDate = date.Format("yyyy-MM-dd hh:mm");
                    vm.listStaff = ret.listStaff;
                    vm.comment = ret.comment;
                    vm.countAuditLeave = ret.countAuditLeave;
                    vm.operators = ret.operator;
                    vm.operator={};
                    if (vm.operators && vm.operators.length>0) {

                        var operatorList = vm.operators.split(",");
                        for(var i=0;i<operatorList.length;i++){
                            vm.operator[operatorList[i].trim()]=true;
                        }
                    }

                }
            }, function() {

            });
        }
        vm.modify =save;

        function save() {

            var operator=[];
            for(var key in vm.operator){
                if (vm.operator[key]) {
                    operator.push(key);
                }
            }
            if(operator.length < 1){
                toastr.error("参加者不能为空");
                return;
            }
            var account = auth.getObject("account");
            vm.credentials={
                recordId:vm.recordId,
                memberId:vm.memberId,
                /** 测量日期时间. */
                measureDate:vm.measureDate,
                operator:operator.join(","),
                /** 备注. */
                comment:vm.comment
            };
            var proc = Restangular.all('reqMedicalRecordModify');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    $rootScope.$emit("CallMedicalRecordListMethod",{});
                    $ionicHistory.goBack(-1);

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

    }

})(this.angular);