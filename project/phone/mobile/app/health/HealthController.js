/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('healthController', HealthController);
    /* @ngInject */
    function HealthController(setting,auth,$scope,$stateParams,$state, Restangular,toastr){
        var vm = this;
        vm.state = "app.healthMenus";
        vm.page = 0;
        vm.isLock=false;
        vm.doRefresh = doRefresh;
        vm.loadMore = loadMore;
        vm.moredata = true;
        vm.personList=[];
        vm.searchContent="";
        vm.searchInfo={
            "startNum":0,
            "pageNum":"10",
            "searchContent":vm.searchContent
        };
        vm.noData = false;

        //获取会员列表信息
        function getPersonList(){
            var rest = Restangular.all('mobileEstimateUserList');

            vm.searchInfo.startNum = vm.page;
            vm.searchInfo.searchContent = vm.searchContent;

            rest.post(vm.searchInfo).then(function(ret) {
                vm.error = false;
                // vm.personList = ret.personInfoList;

                var personList = ret.personInfoList;
                if (vm.page===0) {
                    vm.personList = [];
                }
                for (var i = 0; i < personList.length; i++) {

                    if (personList[i].photoFile == "pc/img/avatar.png"){
                        personList[i].photoFile = MobilePublic.getServerUrl('assets/img/home/photo.png',true);
                    }
                    vm.personList.push(personList[i]);
                }

                // vm.personList = vm.personList.concat(ret.personInfoList);//c=[1,2,3,4,5,6]
                if (vm.personList.length == (vm.page+10)){
                    vm.moredata = true;
                } else {
                    vm.moredata = false;
                }
                vm.page = vm.page +10;
                vm.isLock = false;
                vm.noData = false;
                if (vm.personList.length == 0){
                    vm.noData = true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');

            }, function() {
                vm.moredata = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.$broadcast('scroll.refreshComplete');
                vm.isLock = false;
                vm.message="系统异常";
                if (vm.message != '') {
                    toastr.error(vm.message, "错误");
                    return;
                }
            });




        }
        //function selectMember(personId,memberId) {
        //    //根据功能类型切换到对应的画面
        //    var personInfo = {"personId":personId,"memberId":memberId};
        //    $state.go('app.healthMenus',personInfo);
        //}

        function doRefresh(){
            vm.page = 0;
            loadMore();
        }
        function loadMore(){
            if(vm.isLock)return;
            vm.isLock=true;
            getPersonList();

        }


        function init() {

            // getPersonList();
        }
        init();
    }

})(this.angular);