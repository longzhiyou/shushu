/**
 *
 * 定义app涉及的所有模块的总入口
 * Created by longzhiyou on 2016-06-12.
 */
(function(angular){
    "use strict";
    /* @ngInject */
    angular.module('app', [
        'ionic'
        ,'ngCordova'
        , 'toastr'
        , 'ionicValidateWithToast'
        ,'ionic-datepicker'
        ,'restangular'
        ,'oc.lazyLoad'
        ,'w5c.validator'
        ,"highcharts-ng"
        ,'angular-jwt'
        ,'jsonFormatter'
    ]);

})(this.angular);