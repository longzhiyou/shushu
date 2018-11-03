/**
 *
 *  说明：44为导航栏高度，49为标签栏高度，200为黄色视图高度，如下图：
 * Created by longzhiyou on 2016/11/27.
 */
angular.module('app').directive('scrollHeight', function($window) {
    return{
        restrict:'AE',
        link:function(scope,element,attr){
            element[0].style.height=($window.innerHeight-44-49-200)+'px';
        }
    };
});