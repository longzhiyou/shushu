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

    var regularList = {
        //手机号码校验
        telphone: /^1[34578]\d{9}$/,
        //邮箱校验
        email: /^[a-z0-9A-Z]+([-|_|\.]+[a-z0-9A-Z]+)*@([a-z0-9A-Z]+[-|\.])+[a-zA-Z]{2,5}$/,
        //注册密码校验
        // password: /^(?![0-9a-zA-Z]+$)[0-9A-Za-z]{6,32}$/,
        // password: /^((?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).*).{6,32}$/,
        password: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6,32}/,
        // 验证码校验
        code: /^[0-9]{4}$/,
        // 身份证
        idCard:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        ipv4: /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
        //真实姓名校验，不是特殊字符
        uniqueName: /^[a-zA-Z|\u4E00-\u9FFF]{4,32}$/,
        //部门
        depart: /^[a-zA-Z0-9|\u4E00-\u9FFF]{4,32}$/,
        pwd: /^((?=.*[0-9])|(?=.*[a-zA-Z0-9])|(?=.*[a-zA-Z])).{4,32}$/,
        //图形验证码
        pic: /^[0-9a-zA-Z]{4}$/,
        inputContext:/^.{1,64}$/
    };
    core.constant('setting', config);
    core.constant('regularList', regularList);


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
