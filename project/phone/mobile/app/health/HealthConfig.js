/**
 * 健康配置模块，主要是路由相关.
 *
 * Created by longzhiyou on 2016-06-12.
 */
(function(angular){
    "use strict";
    angular.module("app").config(HealthConfig);

    /* @ngInject */
    function HealthConfig($stateProvider) {
        $stateProvider
            .state('app.healthMenus',
                {
                    url: '/health/healthMenu',
                    params: {
                        personId: null,
                        memberId: null,
                        personName:""
                    },
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/health/healthMenu/Health.html'),
                            controller: 'healthMenuController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/health/healthMenu/HealthMenuConfig.js')
                                                ,MobilePublic.getServerUrl('app/health/healthMenu/HealthMenuController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }

                        }
                    }

                })
            //.state('app.vitalSign',
            //    {
            //        url: '/selectMember/vitalSign',
            //        params: {
            //            personId: null,
            //            memberId: null
            //        },
            //        views: {
            //            'tab-home': {
            //                templateUrl: MobilePublic.getServerUrl('app/health/VitalSign.html'),
            //                controllerAs: 'vm',
            //                controller:function ($stateParams,healthService,$ionicHistory,toastr,ionicDatePicker) {
            //                    var vm = this;
            //
            //                    vm.vitalSignInfo={
            //                        personId:$stateParams.personId,
            //                        memberId:$stateParams.memberId,
            //                        /** 测量日期时间. */
            //                        measureDatetime:"",
            //                        /** 体温. */
            //                       temperature:"",
            //                        /** 呼吸. */
            //                        breathing:"",
            //                        /** 低压. */
            //                        bpMin:"",
            //                        /** 高压. */
            //                        bpMax:"",
            //                        /** 脉搏. */
            //                        pulse:"",
            //                        /** 备注. */
            //                        comment:"",
            //                        weight:""
            //                    };
            //                    //if(!vm.vitalSignInfo.measureDatetime){
            //                    //    vm.vitalSignInfo.measureDatetime = moment(new Date()).format("YYYY-MM-DD HH:mm");
            //                    //}
            //                    //
            //                    //var ipObj1 = {
            //                    //    callback: function (val) {  //Mandatory
            //                    //        vm.vitalSignInfo.measureDatetime = moment(val).format("YYYY-MM-DD HH:mm");
            //                    //    },
            //                    //    to: null, //选择任意日期
            //                    //};
            //                    //
            //                    //vm.openDatePicker1 = function(){
            //                    //    ionicDatePicker.openDatePicker(ipObj1);
            //                    //};
            //
            //
            //                    vm.save =save;
            //
            //                    function save() {
            //                        //失败提示，成功返回上一级菜单
            //                        vm.vitalSignInfo.measureDatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            //                        healthService.saveVitalSign(vm.vitalSignInfo).then(function(data) {
            //                                toastr.info("保存成功");
            //                                $ionicHistory.goBack(-1);
            //                            }, function() {
            //                                toastr.error("保存失败");
            //                            }
            //
            //                        );
            //
            //
            //                    }
            //
            //                    function init() {
            //                        healthService.init();
            //                    }
            //                    init();
            //                }
            //            }
            //
            //        }
            //    })
            //.state('app.pasesa',
            //    {
            //        url: '/selectMember/pasesa',
            //        params: {
            //            personId: null,
            //            memberId: null
            //        },
            //        views: {
            //            'tab-home': {
            //                templateUrl: MobilePublic.getServerUrl('app/health/Pasesa.html'),
            //                controllerAs: 'vm',
            //                controller:function ($stateParams,healthService,$ionicHistory,toastr,ionicDatePicker) {
            //                    var vm = this;
            //
            //                    vm.vitalSignInfo={
            //                        personId:$stateParams.personId,
            //                        memberId:$stateParams.memberId,
            //                        /** 测量日期时间. */
            //                        measureDatetime:"",
            //                        /** 体温. */
            //                        temperature:"",
            //                        /** 呼吸. */
            //                        breathing:"",
            //                        /** 低压. */
            //                        bpMin:"",
            //                        /** 高压. */
            //                        bpMax:"",
            //                        /** 脉搏. */
            //                        pulse:"",
            //                        /** 备注. */
            //                        comment:"",
            //
            //                        bloodOxygen:"",
            //
            //                        avi:"",
            //
            //                        api:""
            //                    };
            //
            //                    vm.save =save;
            //
            //                    function save() {
            //                        //失败提示，成功返回上一级菜单
            //                        vm.vitalSignInfo.measureDatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            //                        healthService.saveVitalSign(vm.vitalSignInfo).then(function(data) {
            //                                toastr.info("保存成功");
            //
            //                                $ionicHistory.goBack(-1);
            //                            }, function() {
            //                                toastr.error("保存失败");
            //                            }
            //
            //                        );
            //
            //
            //                    }
            //
            //                    function init() {
            //                        healthService.init();
            //                    }
            //                    init();
            //
            //                }
            //            }
            //
            //        }
            //    })
            //.state('app.heightWeight',
            //    {
            //        url: '/selectMember/heightWeight',
            //        params: {
            //            personId: null,
            //            memberId: null
            //        },
            //        views: {
            //            'tab-home': {
            //                templateUrl: MobilePublic.getServerUrl('app/health/HeightWeight.html'),
            //                controllerAs: 'vm',
            //                controller:function ($scope,$stateParams,healthService,$ionicHistory,toastr) {
            //                    var vm = this;
            //
            //                    vm.info={
            //                        personId:$stateParams.personId,
            //                        memberId:$stateParams.memberId,
            //                        /** 测量日期时间. */
            //                        measureDatetime:"",
            //                        /** 身高. */
            //                       weight:null,
            //                        /** 体重. */
            //                       height:null,
            //                        /** BMI. */
            //                       bmi:null
            //                    };
            //
            //
            //                    vm.save =save;
            //
            //                    function save() {
            //                        //失败提示，成功返回上一级菜单
            //
            //                        vm.info.measureDatetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            //                        healthService.saveHeightWeight(vm.info).then(function(data) {
            //                                toastr.info("保存成功");
            //                                $ionicHistory.goBack(-1);
            //                            }, function() {
            //                                toastr.error("保存失败");
            //                            }
            //
            //                        );
            //
            //
            //                    }
            //
            //
            //                    $scope.$watch('vm.info.weight', function ( newValue, oldValue ) {
            //                        // update the DOM with newValue
            //                        calcBMI();
            //                    });
            //
            //                    $scope.$watch('vm.info.height', function ( newValue, oldValue ) {
            //                        // update the DOM with newValue
            //                        calcBMI();
            //
            //                    });
            //
            //                    function calcBMI() {
            //                        if (vm.info.weight&&vm.info.height) {
            //                            vm.info.bmi = (vm.info.weight/(vm.info.height*vm.info.height/10000)).toFixed(1)
            //                        }
            //                    }
            //
            //
            //                    function init() {
            //                        healthService.init();
            //                    }
            //                    init();
            //
            //                }
            //            }
            //
            //        }
            //    })
            //.state('app.bloodGlucose',
            //    {
            //        url: '/selectMember/bloodGlucose',
            //        params: {
            //            personId: null,
            //            memberId: null
            //        },
            //        views: {
            //            'tab-home': {
            //                templateUrl: MobilePublic.getServerUrl('app/health/BloodGlucose.html'),
            //                controllerAs: 'vm',
            //                controller:function ($stateParams,healthService,$ionicHistory,toastr,baseDataService,ionicDatePicker) {
            //                    var vm = this;
            //
            //                    vm.baseData = baseDataService.get();
            //                    vm.info={
            //                        // personId:$stateParams.personId,
            //                        memberId:$stateParams.memberId,
            //                        /** 测量日期时间. */
            //                        inputDate:"",
            //                        /** 时段. */
            //                        timeInterval:"01",
            //                        /** 血糖. */
            //                        bloodGlucoseValue:"",
            //                        /** 备注. */
            //                        comment:""
            //                    };
            //
            //                    //if(!vm.info.inputDate){
            //                    //    vm.info.inputDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
            //                    //}
            //                    //
            //                    //var ipObj1 = {
            //                    //    callback: function (val) {  //Mandatory
            //                    //        vm.info.inputDate = moment(val).format("YYYY-MM-DD HH:mm");
            //                    //    },
            //                    //    to: null, //选择任意日期
            //                    //};
            //                    //
            //                    //vm.openDatePicker1 = function(){
            //                    //    ionicDatePicker.openDatePicker(ipObj1);
            //                    //};
            //
            //                    vm.save =save;
            //
            //                    function save() {
            //                        //失败提示，成功返回上一级菜单
            //                        vm.info.inputDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            //                        healthService.saveBloodGlucose(vm.info).then(function(data) {
            //                                toastr.info("保存成功");
            //                                $ionicHistory.goBack(-1);
            //                            }, function() {
            //                                toastr.error("保存失败");
            //                            }
            //
            //                        );
            //
            //
            //                    }
            //
            //                    function init() {
            //                        healthService.init();
            //                    }
            //                    init();
            //
            //                }
            //            }
            //
            //        }
            //    })
        ;
    }

})(this.angular);