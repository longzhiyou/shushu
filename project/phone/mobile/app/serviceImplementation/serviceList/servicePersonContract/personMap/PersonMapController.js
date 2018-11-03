/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('personMapController',PersonMapController);
    /* @ngInject */
    function PersonMapController($scope,$cordovaGeolocation, $stateParams){
        var vm = this;
        vm.lat1 = $stateParams.lat;
        vm.lng1 = $stateParams.lng;
        vm.url = $stateParams.url;
        //百度地图API功能
        var map = new BMap.Map("allmap", {enableMapClick:false});   // 创建Map实例

        map.centerAndZoom(new BMap.Point(vm.lng1,vm.lat1), 15);  // 初始化地图,设置中心点坐标和地图级别
        //map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        //map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放


        vm.lat=0;
        vm.lng=0;
        var marker = new BMap.Marker(new BMap.Point(vm.lng1, vm.lat1)); // 创建点
        map.addOverlay(marker);

        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                var lat = position.coords.latitude
                var long = position.coords.longitude
                vm.lat = String(lat);
                vm.lng = String(long);
                var ggPoint = new BMap.Point(vm.lng, vm.lat);
                var convertor = new BMap.Convertor();
                var pointArr = [];
                pointArr.push(ggPoint);
                convertor.translate(pointArr, 1, 5, vm.translateCallback)
            }, function (err) {
                //toastr.error("取得当前位置信息失败");
            });
        vm.translateCallback = function (data) {
            if (data.status === 0) {
                vm.lat = data.points[0].lat;
                vm.lng = data.points[0].lng;
                var point = new BMap.Point(vm.lng, vm.lat );
                /*var marker = new BMap.Marker(point);  // 创建标注
                map.addOverlay(marker);               // 将标注添加到地图中
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画*/

                var myIcon = new BMap.Icon(MobilePublic.getServerUrl("assets/img/home/iconred.png"), new BMap.Size(50,50));
                var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
                map.addOverlay(marker2);              // 将标注添加到地图中

            }
        }
    }




})(this.angular);