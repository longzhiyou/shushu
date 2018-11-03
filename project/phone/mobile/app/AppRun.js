/**
 * 最后执行的模块
* The application startup function, called in the app module's run block
 * Created apart from app.js so it can be easily stubbed out
 * during testing or tested independently
 *
 * Created by bukeyan on 2016/6/12.
 */

(function( angular ) {
    "use strict";

    angular.module('app').run(AppStart);
    /* @ngInject */
    function AppStart($ionicPlatform,$rootScope, $state, $stateParams,auth,$ionicPopup,$location) {

        auth.init();

        moment.locale("zh-cn");

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.regularList = {
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

        $ionicPlatform.ready(function() {


            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });



        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {

                if (!auth.authenticated ) {
                    if (toState.name != "login") {
                        event.preventDefault();
                        $rootScope.$state.go("login");
                        return;
                    }
                }

            });
        //主页面显示退出提示框
        /*$ionicPlatform.registerBackButtonAction(function (e) {

            e.preventDefault();

            function showConfirm() {
                var confirmPopup = $ionicPopup.confirm({
                    title: '<strong>退出应用?</strong>',
                    template: '你确定要退出应用吗?',
                    okText: '退出',
                    cancelText: '取消'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        ionic.Platform.exitApp();
                    } else {
                        // Don't close
                    }
                });
            }

            showConfirm();

            return false;
        }, 101);*/
    }

})( this.angular );
