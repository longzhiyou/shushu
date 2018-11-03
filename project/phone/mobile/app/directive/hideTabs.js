/**
 * 进入二级目录以后隐藏底部导航栏（tabs）
 * 为了方便，默认都隐藏
 * Created by longzhiyou on 2016/11/27.
 */
angular.module('app').directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });

            scope.$on('$ionicView.beforeLeave', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});