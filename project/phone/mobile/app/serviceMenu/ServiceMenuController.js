/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('serviceMenuController', ServiceMenuController);
    /* @ngInject */
    function ServiceMenuController(setting,auth,permissions,$rootScope,$state,Restangular){
        var vm = this;
        vm.permissions = permissions;
        vm.isGroup = false;
        vm.menus = [
             {permission:"NUR009",title:"照护实施",icon:"icon ion-chevron-right icon-accessory",
            state:"app.servicePersonList",accessDiv:"1"}
            , {permission:"HEA504",title:"医疗实施",icon:"icon ion-chevron-right icon-accessory",
            state:"app.servicePersonList",accessDiv:"2"}
            , {permission:"HEA407",title:"康复实施",icon:"icon ion-chevron-right icon-accessory",
                state:"app.servicePersonList",accessDiv:"3"}
            , {permission:"NUR009,HEA504,HEA407",title:"我完成的服务",icon:"icon ion-chevron-right icon-accessory",
                state:"app.serviceSearchPersonList",accessDiv:"1"}
            , {permission:"SCM401",title:"服务监管",icon:"icon ion-chevron-right icon-accessory",
                state:"app.serviceAllSearchMenu",accessDiv:"1"}
            , {permission:"HEA507,SCM110",title:"我的班次",icon:"icon ion-chevron-right icon-accessory",
                state:"app.dutyRoster",accessDiv:"1"}

        ];
        vm.shiftItem = {permission:"SCM201",title:"交班",icon:"icon ion-chevron-right icon-accessory",
            state:"app.shiftPersonList",accessDiv:"1"};

        function getRandom(){
            return Math.random();
        }
        vm.toSub = function(item){
            var random = getRandom();
            $state.go(item.state, {
                accessDiv: item.accessDiv,
                random:random
            },{reload:true});
        }
        canShift();
        function canShift() {
            if (vm.permissions.hasPermission("SCM201")==true) {
                vm.credentials = {};
                var proc = Restangular.all('reqCanShift');
                proc.post(vm.credentials).then(function (ret) {
                    if (ret.returnCode == "0") {
                        vm.canShift = ret.result;
                    }
                }, function () {
                });
            }
        }
    }

})(this.angular);