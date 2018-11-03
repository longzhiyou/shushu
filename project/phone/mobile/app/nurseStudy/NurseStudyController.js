/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('nurseStudy', NurseStudy);
    /* @ngInject */
    function NurseStudy($scope,$state,auth,$ionicHistory,Restangular,$cordovaInAppBrowser){
        var vm = this;


        //$cordovaInAppBrowser.open("https://mp.weixin.qq.com/mp/homepage?__biz=MzA3NTgyNDgzMA==&hid=2&sn=cbae765fb1a1e6a02d971204658a1df4&scene=18&uin=&key=&devicetype=Windows+10&version=6205051a&lang=zh_CN&ascene=7&winzoom=1", '_system');

        //vm.InAppBrowser=InAppBrowser;
        //function InAppBrowser(){
        //    var iab = cordova.InAppBrowser;
        //
        //    iab.open('https://mp.weixin.qq.com/mp/homepage?__biz=MzA3NTgyNDgzMA==&hid=2&sn=cbae765fb1a1e6a02d971204658a1df4&scene=18&uin=&key=&devicetype=Windows+10&version=6205051a&lang=zh_CN&ascene=7&winzoom=1', '_system');        // loads in the InAppBrowser
        //
        //
        //}

        //window.open('https://mp.weixin.qq.com/mp/homepage?__biz=MzA3NTgyNDgzMA==&hid=2&sn=cbae765fb1a1e6a02d971204658a1df4&scene=18&uin=&key=&devicetype=Windows+10&version=6205051a&lang=zh_CN&ascene=7&winzoom=1', '_system', 'location=yes');

        vm.nurseStudyList = [
            {"photoFile":MobilePublic.getServerUrl('assets/img/home/nurse1.jpg',true),
                "nurseTitle":"（一）卧床老人的移动",
                "descNurse":"本集视频中介绍了一个人如何利用较少的工具，将老人安全快捷的从床上移动到轮椅上的操作方法。",
                "nurseUrl":"https://mp.weixin.qq.com/s/2VpL1r3AFAMzuaDhZsL9lw"},
            {"photoFile":MobilePublic.getServerUrl('assets/img/home/nurse2.jpg',true),
                "nurseTitle":"（二）让护理变得很轻松",
                "descNurse":"本集视频中介绍了如何安全、轻松地将老人从仰卧睡姿变换为侧卧睡姿的简单易懂的操作方法。",
                "nurseUrl":"https://mp.weixin.qq.com/s/DjtNXC7sPjKbGiwv6pSDPw"},
            {"photoFile":MobilePublic.getServerUrl('assets/img/home/nurse3.jpg',true),
                "nurseTitle":"（三）往椅子里面坐的介助",
                "descNurse":"本集视频中介绍了如何将老人从坐在椅子边缘部分，轻松、安全的移到座椅靠里面的位置的操作方法。",
                "nurseUrl":"http://mp.weixin.qq.com/s/qJ4WIxJ2elrAiMlfgmYmoA"},
            {"photoFile":MobilePublic.getServerUrl('assets/img/home/nurse4.jpg',true),
                "nurseTitle":"（四）半身不遂患者的翻身说明",
                "descNurse":"本集视频中介绍了半身不遂患者如何实现在不需要护理员协助的情况下自己翻身。",
                "nurseUrl":"http://mp.weixin.qq.com/s/l4G7AHbev8h6FJRXsPZC_Q"},
            {"photoFile":MobilePublic.getServerUrl('assets/img/home/nurse5.jpg',true),
                "nurseTitle":"（五）如何为老人选择移动式坐便器",
                "descNurse":"本集视频介绍了如何根据老人情况，为老人选择合适的移动式坐便器。",
                "nurseUrl":"http://mp.weixin.qq.com/s/CHiQmgxIIWur0QnqCiUMGw"},
            {"photoFile":MobilePublic.getServerUrl('assets/img/home/nurse6.jpg',true),
                "nurseTitle":"（六）双手抱起坐着的老人的方法",
                "descNurse":"本集视频中介绍了一个人如何利用较少的工具，将老人安全快捷的从床上移动到轮椅上的操作方法。",
                "nurseUrl":"https://mp.weixin.qq.com/s/EnrEj_unPsqzkOXYItEVZA"},
            {"photoFile":MobilePublic.getServerUrl('assets/img/home/nurse7.jpg',true),
                "nurseTitle":"（七）尿频者卧床时小便的流动方式",
                "descNurse":"本集视频中介绍了尿频者仰卧及侧卧时小便的流动方式，有助于护理时防止小便漏出。",
                "nurseUrl":"http://mp.weixin.qq.com/s/KSOSddmVpBDa7pvpbGcYjw"},
            {"photoFile":MobilePublic.getServerUrl('assets/img/home/nurse8.jpg',true),
                "nurseTitle":"（八）手指体操",
                "descNurse":"本集视频介绍手指体操的做法，经常活动手指有助于活化脑细胞，延缓衰老。",
                "nurseUrl":"http://mp.weixin.qq.com/s/Efcei4zKF_Ebi0iw66GNow"},
            {"photoFile":MobilePublic.getServerUrl('assets/img/home/nurse9.jpg',true),
                "nurseTitle":"（九）就餐前的照护",
                "descNurse":"为老人提供无微不至的关爱，营造温馨就餐环境。",
                "nurseUrl":"http://mp.weixin.qq.com/s/fNBomMBwH068oHRULhrPBQ"},
        ];

        vm.openUrl=function (item) {
            var url = item.nurseUrl;
            window.open(url, '_system', 'location=yes');
        }
    }

})(this.angular);