/**
 * 配置模块，主要是路由相关.
 *
 * Configures the UI-Router states and their associated URL routes and views
 * Also adds "state-change" reporting for debugging during development
 *
 * Created by longzhiyou on 2016-06-12.
 */
(function(angular){
    "use strict";
    angular.module("app").config(MemberListConfig);

    /* @ngInject */
    function MemberListConfig($stateProvider) {

        $stateProvider

            .state('app.intentionalityCustomerInfo',
                {
                    url: '/intentionalityList/intentionalityCustomerInfo',
                    params: {
                        customerId: null,
                        personName:""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/CustomerInfo.html'),
                            controller: 'customerInfoController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/CustomerInfoService.js'),
                                                MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/CustomerInfoController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }

                    }
                })
            .state('app.detailCustomer',
                {
                    url: '/intentionalityList/intentionalityCustomerInfo/detailCustomer',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/CustomerDetailInfo.html'),
                            controllerAs: 'vm',
                            controller:function ($scope,$ionicHistory,baseDataService, customerInfoService,Restangular) {
                                var vm = this;
                                vm.allInfo = customerInfoService.get();
                                vm.baseData = baseDataService.get();
                                vm.allInfo.age = parseInt(vm.allInfo.age);

                                //收入来源多选
                                vm.selectIncomeSource={};
                                if (vm.allInfo.incomeSource&&vm.allInfo.incomeSource.length>0) {

                                    var selectIncomeSourceList = vm.allInfo.incomeSource.split(",");
                                    for(var i=0;i<selectIncomeSourceList.length;i++){
                                        vm.selectIncomeSource[selectIncomeSourceList[i].trim()]=true;
                                    }
                                }

                                vm.confirm=function(){

                                    var incomeSource=[];
                                    for(var key in vm.selectIncomeSource){
                                        if (vm.selectIncomeSource[key]) {
                                            incomeSource.push(key);
                                        }
                                    }

                                    vm.allInfo.incomeSource = incomeSource.join(",");

                                };

                                $scope.$on('$ionicView.leave',
                                    function () {
                                        vm.confirm();
                                    });

                                //查询省市区
                                vm.changeList = function(idx){
                                    if(idx == 2){
                                        vm.allInfo.addressCity = "";
                                        vm.allInfo.addressCountry = "";
                                    }
                                    if(idx == 3){
                                        vm.allInfo.addressCountry = "";
                                    }

                                    doChange();
                                }
                                function doChange(){
                                    var getMap={
                                        "province": vm.allInfo.addressProvince,
                                        "city": vm.allInfo.addressCity,
                                        "county":vm.allInfo.addressCountry
                                    };

                                    var proc = Restangular.all('reqAddressInfo');
                                    proc.post(getMap).then(function(ret) {
                                        if (ret.returnCode == "0") {
                                            vm.cityList = ret.cityList;
                                            vm.countyList = ret.countyList;
                                        }

                                    }, function() {

                                    });
                                }
                                doChange();

                            }
                        }

                    }
                })
            .state('app.sibCustomer',
                {
                    url: '/intentionalityList/intentionalityCustomerInfo/sibCustomer',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/SibCustomer.html'),
                            controllerAs: 'vm',
                            controller:function ($ionicHistory,baseDataService, customerInfoService) {
                                var vm = this;
                                vm.allInfo = customerInfoService.get();
                                vm.baseData = baseDataService.get();

                            }
                        }

                    }
                })
            .state('app.concernInfo',
                {
                    url: '/intentionalityList/intentionalityCustomerInfo/concernInfo',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/ConcernInfo.html'),
                            controllerAs: 'vm',
                            controller:function ($scope,$ionicHistory,baseDataService, customerInfoService, ionicDatePicker) {
                                var vm = this;
                                vm.allInfo = customerInfoService.get();
                                vm.baseData = baseDataService.get();
                                if(vm.allInfo.returnVisitDate){
                                    vm.allInfo.returnVisitDate = moment(vm.allInfo.returnVisitDate).format("YYYY-MM-DD");
                                }
                                if(!vm.allInfo.intentionality){
                                    vm.allInfo.intentionality="";
                                }
                                var ipObj1 = {
                                    callback: function (val) {  //Mandatory
                                        vm.allInfo.returnVisitDate = moment(val).format("YYYY-MM-DD");
                                    },
                                    to: null, //选择任意日期
                                };

                                vm.openDatePicker = function(){
                                    ionicDatePicker.openDatePicker(ipObj1);
                                };

                                //信息获取渠道多选
                                vm.selectInformationChannel={};
                                if (vm.allInfo.informationChannel&&vm.allInfo.informationChannel.length>0) {

                                    var selectInformationChannelList = vm.allInfo.informationChannel.split(",");
                                    for(var i=0;i<selectInformationChannelList.length;i++){
                                        vm.selectInformationChannel[selectInformationChannelList[i].trim()]=true;
                                    }
                                }
                                //付款方式多选
                                vm.selectPayType={};
                                if (vm.allInfo.payType&&vm.allInfo.payType.length>0) {
                                    var list = vm.allInfo.payType.trim().split(",");
                                    for(var i=0;i<list.length;i++){
                                        vm.selectPayType[list[i].trim()]=true;
                                    }
                                }
                                //关注点多选
                                vm.selectConcerns={};
                                if (vm.allInfo.concerns&&vm.allInfo.concerns.length>0) {
                                    var selectConcernsList = vm.allInfo.concerns.trim().split(",");
                                    for(var i=0;i<selectConcernsList.length;i++){
                                        vm.selectConcerns[selectConcernsList[i].trim()]=true;
                                    }
                                }

                                vm.confirm=function(){

                                    var informationChannel=[];
                                    for(var key in vm.selectInformationChannel){
                                        if (vm.selectInformationChannel[key]) {
                                            informationChannel.push(key);
                                        }
                                    }

                                    vm.allInfo.informationChannel = informationChannel.join(",");

                                    var list=[];
                                    for(var key in vm.selectPayType){
                                        if (vm.selectPayType[key]) {
                                            list.push(key);
                                        }
                                    }
                                    vm.allInfo.payType = list.join(",");

                                    var selectConcernsList=[];
                                    for(var key in vm.selectConcerns){
                                        if (vm.selectConcerns[key]) {
                                            selectConcernsList.push(key);
                                        }
                                    }
                                    vm.allInfo.concerns = selectConcernsList.join(",");

                                };


                                $scope.$on('$ionicView.leave',
                                    function () {
                                        vm.confirm();
                                    });

                            }
                        }

                    }
                })

            .state('app.saleSummary',
                {
                    url: '/intentionalityList/intentionalityCustomerInfo/saleSummary',
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/SaleSummary.html'),
                            controllerAs: 'vm',
                            controller:function ($ionicHistory,baseDataService, customerInfoService) {
                                var vm = this;
                                vm.allInfo = customerInfoService.get();
                                vm.baseData = baseDataService.get();

                            }

                        }

                    }
                })

            .state('app.returnVisit',
                {
                    url: '/intentionalityList/intentionalityCustomerInfo/returnVisitInfo/returnVisitList',
                    params: {
                        customerId: null
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/returnVisitInfo/ReturnVisitList.html'),
                            controllerAs: 'vm',
                            controller:'returnVisitListController',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/returnVisitInfo/ReturnVisitListConfig.js')
                                                ,MobilePublic.getServerUrl('app/intentionalityCustomer/customerInfo/returnVisitInfo/ReturnVisitListController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }

                    }


                })

        ;
  
    }

})(this.angular);