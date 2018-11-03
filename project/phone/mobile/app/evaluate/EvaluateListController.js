/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('evaluateListController', EvaluateListController);
    /* @ngInject */
    function EvaluateListController($scope,$rootScope, Restangular,$stateParams,toastr,$state){
        var vm = this;
        vm.page = 0;
        vm.isLock=false;
        vm.accessDiv = $stateParams.accessDiv;
        vm.type = $stateParams.type;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.personList;
        vm.state = "app.evaluateHistory";
        vm.noData = false;
        if (vm.type == '3') {
            vm.placeholder = "老人姓名/床位/身份证号";
        } else {
            vm.placeholder = "老人姓名";
        }
        vm.searchContent="";
        vm.credentials={
            "startNum":vm.page,
            "pageNum":"10",
            "searchContent":vm.searchContent
        };
        function getPersonList() {
            vm.message="";
            vm.credentials={
                "startNum":vm.page,
                "pageNum":"10",
                "type":vm.type,
                "searchContent":vm.searchContent
            };
            var proc = Restangular.all('reqEvaluateList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {

                    if (vm.page == 0) {
                        vm.personList = ret.personInfoList;
                        for (var i = 0; i < vm.personList.length; i++) {
                            if (vm.personList[i].status == "0") {
                                vm.personList[i].status = "已评估";
                            } else {
                                vm.personList[i].status = "未评估";
                            }
                            if (vm.personList[i].photoFile == "pc/img/avatar.png" || vm.personList[i].photoFile == null){
                                vm.personList[i].photoFile = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            }
                            vm.personList[i].evaluationDate = formatData(vm.personList[i].evaluationDate)
                        }
                    } else {
                        var personList = ret.personInfoList;
                        for (var i = 0; i < personList.length; i++) {
                            if (personList[i].status == "0") {
                                personList[i].status = "已评估";
                            } else {
                                personList[i].status = "未评估";
                            }
                            if (personList[i].photoFile == "pc/img/avatar.png" || personList[i].photoFile == null){
                                personList[i].photoFile = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                            }
                            personList[i].evaluationDate = formatData(personList[i].evaluationDate);
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
        function doRefresh(){
            vm.page = 0;
            loadMore();
        }
        function loadMore(){
            if(vm.isLock)return;
            vm.isLock=true;
            getPersonList();

        }
        //getPersonList();
        function formatData(date){
            if (date.length >=8){
                var year = date.substr(0,4);
                var month = date.substr(4,2);
                var day = date.substr(6,2);
                return year + "-" + month + "-" + day;
            } else {
                return date;
            }
        }
        vm.search = function(){
            vm.page = 0;
            loadMore();
        }

        //保存回调函数
        $rootScope.$on("CallEvaluateMethod",function(){
            vm.page = 0;
            loadMore();
        });
        $scope.$on("$ionicView.beforeEnter",function(){
            vm.page = 0;
            loadMore();
        });
        vm.toSub = function(item){
            if (vm.type == '3') {
                $state.go("app.evaluateHistory", {
                    accessDiv: vm.accessDiv,
                    personId: item.personId
                }, {reload: true});
            } else {
                $state.go("app.evaluateRcyHistory", {
                    accessDiv: vm.accessDiv,
                    personId: item.personId,
                    applyId: item.applyId,
                    path : item.photoFile
                }, {reload: true});
            }
        }
    }

})(this.angular);