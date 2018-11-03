/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('medicalRecordListController', MedicalRecordListController);
    /* @ngInject */
    function MedicalRecordListController($scope, $rootScope, auth,Restangular,$stateParams,toastr, ionicDatePicker,permissions,$state){
        var vm = this;
        vm.page = 0;
        vm.isLock=false;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.personList = [];
        vm.accessDiv = $stateParams.accessDiv;
        vm.memberId = $stateParams.memberId;
        vm.personName = $stateParams.personName;
        vm.permission="HEA310";
        vm.permissions = permissions;
        vm.noData = false;

        //取得老人一览
        function getMedicalRecordList() {
            vm.personList = [];
            vm.message="";
            var account = auth.getObject("account");
            vm.credentials={
                "startNum":vm.page,
                "pageNum":"10",
                "searchContent":vm.memberId
            };
            var proc = Restangular.all('reqMedicalRecordInfoList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {

                    if (vm.page == 0) {
                        var personList = ret.medicalRecordList;
                        for (var i = 0; i < personList.length; i++) {
                            if (personList[i].measureDate != null) {
                                var date = new Date(personList[i].measureDate);
                                personList[i].measureDate =date.Format("yyyy-MM-dd hh:mm");

                            }
                            if(personList[i].disease == null || personList[i].disease == ""){
                                personList[i].disease = "无";
                            }
                            vm.personList.push(personList[i]);
                        }
                    } else {
                        var personList = ret.medicalRecordList;
                        for (var i = 0; i < personList.length; i++) {
                            if (personList[i].measureDate != null) {
                                var date = new Date(personList[i].measureDate);
                                personList[i].measureDate =date.Format("yyyy-MM-dd hh:mm");
                            }
                            if(personList[i].disease == null || personList[i].disease == ""){
                                personList[i].disease = "无";
                            }
                            vm.personList.push(personList[i]);
                        }
                    }

                    if (vm.personList.length == (vm.page+10)){
                        vm.moredata = true;
                    } else {
                        vm.moredata = false;
                    }
                    vm.page = vm.page +10;
                    vm.noData = false;
                    if (vm.personList.length == 0){
                        vm.noData = true;
                    }
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                vm.isLock = false;
            }, function() {
                vm.moredata = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                vm.isLock = false;
            });
        }
        //下拉刷新
        function doRefresh(){
            vm.page = 0;
            loadMore();
        }
        //上拉取得数据
        function loadMore(){
            if(vm.isLock)return;
            vm.isLock=true;
            getMedicalRecordList();

        }
        vm.search = function(){
            vm.page = 0;
            loadMore();
        }
        $scope.$on("$ionicView.beforeEnter",function(){
            vm.page = 0;
            loadMore();
        });

        vm.edit = function(item) {

            $state.go("app.medicalRecordDetail", {
                "recordId":item.recordId,
                "memberId":item.memberId,
                "operator":item.operator
            });

        };

        $rootScope.$on("CallMedicalRecordListMethod",function(){
            vm.personList = [];
            vm.page = 0;
            loadMore();
        });

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