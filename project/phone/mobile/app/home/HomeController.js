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
        vm.sizhuAnalyze = {
            "四贵位":["四贵","四平","四忌"],
            "贵人":["正天乙"],
            "禄":[""],
            "马":[""],
            "官":[""],
        }
    }

})(this.angular);