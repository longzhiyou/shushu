/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('memberInfoController', MemberInfoController);
    /* @ngInject */
    function MemberInfoController($rootScope,$scope,$stateParams,memberInfoService,
                                  $ionicHistory, $ionicActionSheet,$ionicPopup,
                                  $cordovaCamera,toastr,baseDataService, ionicDatePicker,permissions){

        var vm = this;
        vm.title = $stateParams.personName;
        vm.regularList = $rootScope.regularList;
        vm.personId=$stateParams.personId;
        vm.state = "app.familyMember";
        vm.interestState = "app.interestMember";


        function init() {

            $scope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {


                });

        }

        init();


    }

})(this.angular);