/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('evaluateMenuController', EvaluateMenuController);
    /* @ngInject */
    function EvaluateMenuController(setting,auth,permissions,$rootScope,$state,$stateParams){
        var vm = this;
        vm.permissions = permissions;
        vm.isGroup = false;
        vm.accessDiv = $stateParams.accessDiv;
        vm.menus = [
            {title:"意向客户评估",icon:"icon ion-chevron-right icon-accessory",
            state:"app.evaluateList",type:"1"}
            , {title:"入院评估",icon:"icon ion-chevron-right icon-accessory",
             state:"app.evaluateList",type:"2"}
            , {title:"在院评估",icon:"icon ion-chevron-right icon-accessory",
                state:"app.evaluateList",type:"3"}
        ];

        function getRandom(){
            return Math.random();
        }
        vm.toSub = function(item){
            var random = getRandom();
            $state.go(item.state, {
                accessDiv: vm.accessDiv,
                type:item.type,
                random:random
            },{reload:true});
        }
    }

})(this.angular);