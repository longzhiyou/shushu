/**
 *
 * 定义app涉及的所有模块的总入口
 * Created by longzhiyou on 2016-06-12.
 */

Array.prototype.contains = function(obj) {
    return this.indexOf(obj) !== -1;
};
Array.prototype.max = function(){   //最大值
    return Math.max.apply({},this)
};
Array.prototype.min = function(){   //最小值
    return Math.min.apply({},this)
};


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