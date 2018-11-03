/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('serviceAllSearchMenuController', ServiceAllSearchMenuController);
    /* @ngInject */
    function ServiceAllSearchMenuController(){
        var vm = this;
        vm.menus = [
             {title:"照护实施",icon:"icon ion-chevron-right icon-accessory",
            state:"app.serviceAllSearch",accessDiv:"1"}
            , {title:"医疗实施",icon:"icon ion-chevron-right icon-accessory",
            state:"app.serviceAllSearch",accessDiv:"2"}
            , {title:"康复实施",icon:"icon ion-chevron-right icon-accessory",
                state:"app.serviceAllSearch",accessDiv:"3"}
        ];
    }

})(this.angular);