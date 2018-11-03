(function(angular) {
    'use strict';

    //系统全局配置
    var core = angular.module('app');

    var config = {
        homeMenus:[
            {title:"标准评估",icon:"icon ion-chevron-right icon-accessory",
                state:"app.evaluateList",accessDiv:"0"}
            ,{title:"院内服务",icon:"icon ion-chevron-right icon-accessory",
                state:"app.servicePersonList",accessDiv:"1"}
            ,{title:"上门服务",icon:"icon ion-chevron-right icon-accessory",
                state:"app.servicePersonList",accessDiv:"2"}

        ]
        ,prescriptionMenus: [[
            {title:"慢病",state:"app.prescription-chronic",img:MobilePublic.getServerUrl('assets/img/home/health/health_chronic.png')}
            ,{title:"用药",state:"app.prescription-drug",img:MobilePublic.getServerUrl('assets/img/home/health/health_drug.png')}
            ,{title:"饮水",state:"app.prescription-water",img:MobilePublic.getServerUrl('assets/img/home/health/health_water.png')}
            ,{title:"情绪",state:"app.prescription-mood",img:MobilePublic.getServerUrl('assets/img/home/health/health_mood.png')}

        ],[
            {title:"睡眠",state:"app.prescription-sleep",img:MobilePublic.getServerUrl('assets/img/home/health/health_sleep.png')}
            ,{title:"运动",state:"app.prescription-sport",img:MobilePublic.getServerUrl('assets/img/home/health/health_sports.png')}
            ,{title:"膳食",state:"app.prescription-food",img:MobilePublic.getServerUrl('assets/img/home/health/health_food.png')}
            ,{title:"体重",state:"app.prescription-bmi",img:MobilePublic.getServerUrl('assets/img/home/health/health_weight.png')}

        ]]

    };
    core.constant('setting', config);

    core.filter('trustHtml', function ($sce) {
        return function (input) {
            function formatComment(value) {
                if (value != null && value != "null" && value != "") {
                    value = value.replace(/\r\n/g,"<br/>");
                    value = value.replace(/\n/g,"<br/>");
                    return value;
                }else{
                    return value;
                }
            }

            return $sce.trustAsHtml(formatComment(input));
        }
    });



})(this.angular);
