/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('goInHospitalDetailController', GoInHospitalDetailController);
    /* @ngInject */
    function GoInHospitalDetailController(Restangular,$stateParams,auth,$state,permissions){
        var vm = this;
        vm.personId = $stateParams.personId;
        vm.applyId = $stateParams.applyId;
        vm.accessDiv = $stateParams.accessDiv;
        vm.permission="RCY060";
        vm.permissions = permissions;
        vm.list;

        getGoHospitalDetailList();
        //取得老人一览
        function getGoHospitalDetailList() {
            var account = auth.getObject("account");
            vm.credentials={
                "personId":vm.personId,
                "applyId":vm.applyId,
                "accessDiv":vm.accessDiv
            };
            var proc = Restangular.all('reqGoInHospitalDetail');
            proc.post(vm.credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    //老人基本信息
                    vm.proposerName = ret.proposerName;
                    vm.age = ret.age;
                    vm.certificateName = ret.certificateName;
                    vm.idNumber = ret.idNumber;
                    //申请状况
                    var date = new Date(ret.applyDate);
                    vm.applyDate = date.Format("yyyy-MM-dd");
                    vm.applyName = ret.applyName;
                    vm.bedString = ret.bedString;
                    vm.compartment = ret.compartment;
                    //评估状况
                    var date1 = new Date(ret.evaluateDate);
                    vm.evaluateDate = date1.Format("yyyy-MM-dd");
                    vm.evaluatePerson = ret.evaluatePerson;
                    vm.evaluationLevel = ret.evaluationLevel;
                    //中福协
                    vm.badlLevel = ret.badlLevel;
                    vm.iadlLevel= ret.iadlLevel;
                    vm.mmseLevel = ret.mmseLevel;
                    vm.spcsLevel = ret.spcsLevel;
                    //日式
                    vm.physical = ret.physical;
                    vm.vitalActivity = ret.vitalActivity;
                    vm.cognitive = ret.cognitive;
                    vm.obstacle = ret.obstacle;
                    vm.socialLife = ret.socialLife;
                    //服务项目
                    vm.careRankName = ret.careRankName;
                    vm.packageName = ret.packageName;
                    vm.listCareServiceType = ret.listCareServiceType;
                    //体检状况
                    if(ret.examDate != null && ret.examDate != ""){
                        var date2 = new Date(ret.examDate);
                        vm.examDate = date2.Format("yyyy-MM-dd");
                    }else {
                        vm.examDate = "";
                    }
                    vm.examinationUnit = ret.examinationUnit;
                    vm.nutritionalStatusText = ret.nutritionalStatusText;
                    vm.careAbilityText = ret.careAbilityText;
                    vm.mentalStateText = ret.mentalStateText;
                    vm.capacityText = ret.capacityText;
                    //付款计划
                    vm.contractTypeName = ret.contractTypeName;
                    vm.allPlanList = ret.allPlanList;
                    //日期
                    var date3 = new Date(ret.auditingDate);
                    vm.auditingDate = date3.Format("yyyy-MM-dd");

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
        vm.agreeApply = function(auditResult){
            var inputParam= {
                "auditingDate": vm.auditingDate,
                "personId" : vm.personId,
                "applyId": vm.applyId,
                flag:1
            }
            $state.go("app.auditDetail", {
                type: 21,
                inputParam: inputParam,
                auditResult:auditResult
            });
        }
        vm.toPaymentInfo = function(){
            $state.go("app.paymentInHospitalInfo", {
                allPlanList:vm.allPlanList,
                contractTypeName:vm.contractTypeName,
                personName:vm.proposerName
            });
        }
        vm.toServiceItem = function(){
            $state.go("app.serviceItemInfo", {
                serviceItem:vm.listCareServiceType,
                careRankName:vm.careRankName,
                packageName:vm.packageName,
                flag:1,
                personName:vm.proposerName
            });
        }
        vm.toApplyStatus = function(){
            var param = {
                "applyDate":vm.applyDate,
                "applyName":vm.applyName,
                "bedString":vm.bedString,
                "compartment":vm.compartment
            }
            $state.go("app.applyGoInHospitalInfo", {
                param: param
            });
        }
        vm.toEvaluateInfo = function(){
            var param = {
                "evaluateDate":vm.evaluateDate,
                "evaluatePerson":vm.evaluatePerson,
                "evaluationLevel":vm.evaluationLevel,
                "badlLevel":vm.badlLevel,
                "iadlLevel":vm.iadlLevel,
                "mmseLevel":vm.mmseLevel,
                "spcsLevel":vm.spcsLevel,
                "physical":vm.physical,
                "vitalActivity":vm.vitalActivity,
                "cognitive":vm.cognitive,
                "obstacle":vm.obstacle,
                "socialLife":vm.socialLife,
                personName:vm.proposerName
            }
            $state.go("app.evaluateGoInHospitalInfo", {
                param: param,
                accessDiv:vm.accessDiv
            });
        }
        vm.toExamItem = function(){
            var param = {
                "examDate":vm.examDate,
                "examinationUnit":vm.examinationUnit,
                "nutritionalStatusText":vm.nutritionalStatusText,
                "careAbilityText":vm.careAbilityText,
                "mentalStateText":vm.mentalStateText,
                "capacityText":vm.capacityText,
                personName:vm.proposerName
            }
            $state.go("app.examGoInHospitalInfo", {
                param: param,
            });
        }
    }

})(this.angular);