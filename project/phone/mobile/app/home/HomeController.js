/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('homeController', HomeController);
    /* @ngInject */
    function HomeController(setting,auth,permissions,$rootScope,$state,toastr){
        var vm = this;
        vm.permissions = permissions;
        vm.isGroup = false;
        vm.height = (window.screen.availHeight -155) /17*5 +'px';
        vm.height2 = (window.screen.availHeight -155) /17*6 +'px';
        vm.height3 = (window.screen.availHeight -155) /17*3 - 5+'px';
        vm.bak1 = MobilePublic.getServerUrl('assets/img/home/1.png',true);
        vm.bak2 = MobilePublic.getServerUrl('assets/img/home/2.png',true);
        vm.bak3 = MobilePublic.getServerUrl('assets/img/home/3.png',true);
        vm.bak4 = MobilePublic.getServerUrl('assets/img/home/4.png',true);

        vm.menus = [
            {permission:"RCY401",title:"意向客户",icon:"icon ion-chevron-right icon-accessory",
                state:"app.intentionality",accessDiv:"1"}
            ,{permission:"ITH010",title:"在院老人",icon:"icon ion-chevron-right icon-accessory",
                state:"app.memberList",accessDiv:"1"}
            , {permission:"HEA302,HEA307",title:"健康管理",icon:"icon ion-chevron-right icon-accessory",
                state:"app.health",accessDiv:"1"}
            , {permission:"NUR009,HEA504,HEA407,SCM401,HEA507,SCM201,SCM110",title:"服务",icon:"icon ion-chevron-right icon-accessory",
                state:"app.serviceMenu",accessDiv:"1"}
            , {permission:"AEM002,AEM016",title:"健康评估",icon:"icon ion-chevron-right icon-accessory",
                state:"app.evaluateMenu",accessDiv:"1"}
            , {permission:"SFM",title:"职工",icon:"icon ion-chevron-right icon-accessory",
                state:"app.staffList",accessDiv:"1"}
            , {permission:"USC002",title:"审批",icon:"icon ion-chevron-right icon-accessory",
                state:"app.approve",accessDiv:"1"}
            , {permission:"SAMX",title:"统计",icon:"icon ion-chevron-right icon-accessory",
                state:"app.staticAnalyze",accessDiv:"1"}
        ];

        vm.back = MobilePublic.getServerUrl('assets/img/home/banner222.png',true);
        var account = auth.getObject("account");
        if (account.groupUser == '1'){
            vm.isGroup = true;
        }
        permissions.setPermissions(account.availableModule);

        if (account.orgId == null || account.orgId == ''){
            vm.title = account.groupName + '总部';
        } else {
            vm.title = account.instituteName;
        }
        $rootScope.$on("CallHomeMethod",function(){
            var account = auth.getObject("account");
            if (account.orgId == null || account.orgId == ''){
                vm.title = account.groupName + '总部';
            } else {
                vm.title = account.instituteName;
            }
            permissions.setPermissions(account.availableModule);
        });
        vm.toSub = function(index){
            var account = auth.getObject("account");
            if(index != 6 && index != 7 && vm.isGroup == true && (account.orgId == null || account.orgId == '')){
                $state.go('app.changeInstitute', {
                },{reload:true});
                return;
            }
            var item = vm.menus[index];
            var accessDiv = item.accessDiv;
            if (vm.permissions.hasPermission(item.permission)==false){
                toastr.error("没有使用当前功能的权限");
                return;
            }
            if (index == 4 || index == 6){
                if (vm.permissions.hasPermission("AEM002")){
                    accessDiv = 1;
                } else {
                    accessDiv = 2;
                }
            }
            var random = getRandom();
            $state.go(item.state, {
                accessDiv: accessDiv,
                random:random
            },{reload:true});
        }
        vm.chgInstitute = function(){
            $state.go('app.changeInstitute', {
            },{reload:true});
        }
        function getRandom(){
            return Math.random();
        }
    }

})(this.angular);