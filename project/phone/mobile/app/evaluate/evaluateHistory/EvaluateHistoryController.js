/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('evaluateHistoryController', EvaluateHistoryController);
    /* @ngInject */
    function EvaluateHistoryController($scope,$rootScope, Restangular,$stateParams,toastr,$state){
        var vm = this;
        vm.page = 0;
        vm.isLock=false;
        vm.accessDiv = $stateParams.accessDiv;
        vm.personId = $stateParams.personId;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.headIcon;
        vm.personName;
        vm.evaluateHistory;
        vm.nodata = false;
        if (vm.accessDiv == 1){
            vm.state = "app.personEvaluateZfc";
        } else if (vm.accessDiv == 2){
            vm.state = "app.personEvaluateJap";
        } else if (vm.accessDiv == 3){
            vm.state = "app.personEvaluateBadl";
        }
        vm.searchContent="";
        vm.credentials={
            "startNum":vm.page,
            "pageNum":"10",
            "personId":vm.personId
        };
        function getPersonList() {
            vm.credentials={
                "startNum":vm.page,
                "pageNum":"10",
                "personId":vm.personId
            };
            vm.message="";
            var proc = Restangular.all('reqEvaluateHistory');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.nodata = false;
                    if (vm.page == 0) {
                        vm.evaluateHistory = ret.evaluateHistory;
                        vm.headIcon = ret.headIconURL;
                        if (vm.headIcon == null){
                            vm.headIcon = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                        }
                        vm.personName = ret.personName;
                        if (vm.evaluateHistory != null && vm.evaluateHistory.length >0) {
                              for (var i = 0; i < vm.evaluateHistory.length; i++) {
                                  if (vm.accessDiv == 2){
                                      vm.evaluateHistory[i].evaluationLevel = vm.evaluateHistory[i].customLevel;
                                  }
                                  if (vm.accessDiv == 3){
                                      if (vm.evaluateHistory[i].evaluator2 != null && vm.evaluateHistory[i].evaluator2 != '') {
                                          vm.evaluateHistory[i].evaluator = vm.evaluateHistory[i].evaluator + "," + vm.evaluateHistory[i].evaluator2;
                                      }
                                  }
                            }
                        } else {
                            vm.nodata = true;
                        }

                    } else {
                        var evaluateHistory = ret.evaluateHistory;
                        for (var i = 0; i < evaluateHistory.length; i++) {
                            if (vm.accessDiv == 2){
                                evaluateHistory[i].evaluationLevel = evaluateHistory[i].customLevel;
                            }
                            vm.evaluateHistory.push(evaluateHistory[i]);
                        }

                    }
                    if (vm.evaluateHistory.length == (vm.page+10)){
                        vm.moredata = true;
                    } else {
                        vm.moredata = false;
                    }
                    vm.page = vm.page +10;
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
        vm.add = function(){
            $state.go(vm.state, {
                personId: vm.personId,
                accessDiv: vm.accessDiv,
                id:-1
            });
        }

        //保存回调函数
        $rootScope.$on("CallEvaluateHistoryMethod",function(){
            vm.page = 0;
            loadMore();
        });
    }

})(this.angular);