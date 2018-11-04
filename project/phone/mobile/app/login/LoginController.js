/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('loginController', LoginController);
    /* @ngInject */
    function LoginController($scope,$state,auth,baseDataService,$cordovaBarcodeScanner,toastr){

        var vm = this;

        vm.bleList=[];
        vm.bleMap={};
        vm.login = login;
        vm.error = false;
        vm.credentials={
        };
        // $scope.onGetRegistrationID = onGetRegistrationID;


        function login() {

             auth.authenticate(vm.credentials, function(authenticated) {
             	if (authenticated) {
             		// console.log("Login succeeded");

             		// vm.error = false;
                    // baseDataService.init();
                    $state.go('app.home');
             	} else {
             		// console.log("Login failed");
             		// vm.error = true;
             	}
             });


        }


        function go() {
            $state.go('users');

        }


    }

})(this.angular);