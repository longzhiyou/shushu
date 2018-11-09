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
    angular.module("app").config(AppConfig);

    /* @ngInject */
    function AppConfig( $urlRouterProvider
                        ,$stateProvider
                        ,$ionicConfigProvider
                        ,RestangularProvider
                        ,toastrConfig
                        ,ionicDatePickerProvider
                        ,w5cValidatorProvider
                        ,jwtOptionsProvider
                        ,$httpProvider
                        ,JSONFormatterConfigProvider
                        ) {



        // Please note we're annotating the function so that the $injector works when the file is minified
        jwtOptionsProvider.config({
            authPrefix: '',
            tokenGetter: function() {
                localStorage.setItem("token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE1NDEzMDI5NDk5NzIsImV4cCI6MTU3MjgzODk0OX0.dtSXlwP6DiqCUpxYz1RNL5vfWl4DRXyAyYuWCST3lzJSNv2BNK4JupEh5qhNzI8S72JjHhAsj7U5WNEx4Jt9AQ");
                var token = localStorage.getItem('token');

                if (!token) {
                    token = sessionStorage.getItem('token');
                }
                return token;
            }
            ,unauthenticatedRedirector: ['$state', function($state) {
                $state.go('login');
            }]
            ,whiteListedDomains: MobilePublic.Domains
        });
        $httpProvider.interceptors.push('jwtInterceptor');

        $urlRouterProvider.otherwise( function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("app.home");
        });


        //调试状态禁止缓存
        //$ionicConfigProvider.views.maxCache(0);
        RestangularProvider.setBaseUrl(MobilePublic.Api);


        // $ionicConfigProvider.scrolling.jsScrolling(true);

        var datePickerObj = {
            inputDate: new Date(),
            titleLabel: '选择一个日期',
            setLabel: '确定',
            todayLabel: '今天',
            closeLabel: '关闭',
            mondayFirst: true,
            weeksList: ["日","一", "二", "三", "四", "五", "六"],
            monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            templateType: 'popup',
            from: new Date(1900, 8, 1),
            to: new Date(),
            showTodayButton: true,
            dateFormat: 'yyyy年M月dd日',
            closeOnSelect: false,
            disableWeekdays: []
        };
        // ionicDatePickerProvider.configDatePicker(datePickerObj);

        angular.extend(toastrConfig, {
            // positionClass: 'toast-bottom-center'
            positionClass: 'toast-top-full-width'

        });
        var showError = function(elem, errorMessages){
            var $elem = angular.element(elem),
            $group = getParentGroup($elem);

            if (!isEmpty($group)){
                if ($group.hasClass("valid-lr")){
                    $group.removeClass("valid-lr");
                }

                if (!$group.hasClass("has-error-lr")){
                    $group.addClass("has-error-lr");
                }
            }

            var $next = $group.next();
            if (!$next || !$next.hasClass("form-errors")) {
                $group.after('<div class="form-errors"><div class="form-error">' + errorMessages[0] + '</div></div>');
            }
        };

        var removeError = function (elem){
            var $elem = angular.element(elem),
                $group = getParentGroup($elem);

            if (!isEmpty($group)){
                if ($group.hasClass("has-error-lr")){
                    $group.removeClass("has-error-lr");
                }
            }

            var $next = $group.next();
            if (!$next || $next.hasClass("form-errors")) {
                $next.remove();
            }
        };

        var getParentGroup = function (elem) {
            if (elem[0].tagName === "FORM" || elem[0].nodeType === 11) {
                return null;
            }
            if (elem && elem.hasClass("item-input")) {
                return elem;
            } else {
                return getParentGroup(elem.parent())
            }
        };

        var isEmpty = function (object) {
            if (!object) {
                return true;
            }
            return object instanceof Array && object.length === 0;

        };


        // 全局配置
        w5cValidatorProvider.config({
            blurTrig: true,//光标移除元素后是否验证并显示错误提示信息
            showError: showError,//可以是bool和function，这里使用我们自定义的错误显示方式。
            removeError: removeError //可以是bool和function，这里使用我们自定义的错误移除方式。

        });

        w5cValidatorProvider.setRules({
            email: {
                required: "输入的邮箱地址不能为空",
                email: "输入邮箱地址格式不正确"
            },
            username: {
                required: "输入的用户名不能为空",
                pattern: "用户名必须输入字母、数字、下划线,以字母开头",
                w5cuniquecheck: "输入用户名已经存在，请重新输入"
            },
            telephone:{
                required: "不能为空",
                pattern:"格式不正确"
            },
            verificationCode: {
                required: "不能为空"
            },

            password: {
                required: "密码不能为空",
                minlength: "密码长度不能小于{minlength}",
                maxlength: "密码长度不能大于{maxlength}"
            },
            repeatPassword: {
                required: "重复密码不能为空",
                repeat: "两次密码输入不一致"
            },
            number: {
                required: "数字不能为空"
            },

            idNumber: {
                pattern: "身份证格式不正确",
                required: "身份证号不能为空"
            },
            dynamic: {
                required: "动态元素不能为空"
            },
            //备注
            comment: {
                maxlength: "长度不能大于{maxlength}"
            }
        });



        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');


        $stateProvider
            .state('login',
                {
                    url: '/login',
                    templateUrl: MobilePublic.getServerUrl('app/login/Login.html'),
                    controller: 'loginController',
                    controllerAs: 'vm',
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: [MobilePublic.getServerUrl('app/login/LoginController.js')]
                                }
                            ]);
                        }
                    }

                })

            // setup an abstract state for the tabs directive
            .state('app',
                {
                    url: '/app',
                    abstract: true,
                    templateUrl: MobilePublic.getServerUrl('app/layout/Layout.html'),
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                {
                                    files: [MobilePublic.getServerUrl('app/layout/LayoutController.js')]
                                }
                            ]);
                        }
                    }


                })
            // Each tab has its own nav history stack:
            .state('app.home',
                {
                    url: '/home',
                    cache:false,
                    views: {
                        'tab-home': {
                            templateUrl: MobilePublic.getServerUrl('app/home/Home.html'),
                            controller: 'homeController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/home/HomeConfig.js')
                                                ,MobilePublic.getServerUrl('app/home/HomeController.js')
                                            ]
                                        }
                                    ]);
                                }
                            }
                        }
                    }
                })

            .state('app.account',
                {
                    url: '/account',
                    views: {
                        'tab-account': {
                            templateUrl: MobilePublic.getServerUrl('app/account/Account.html'),
                            controller: 'accountController',
                            controllerAs: 'vm',
                            resolve: {
                                loadPlugin: function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            files: [
                                                MobilePublic.getServerUrl('app/account/AccountConfig.js'),
                                                MobilePublic.getServerUrl('app/account/AccountController.js')
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