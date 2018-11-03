/**
 * 本地存储服务
 * Created by longzhiyou on 2016/11/14.
 */

(function (angular) {
    angular.module('app').factory('permissions', ['$rootScope', factory]);

    function factory($rootScope) {

        var permissionList;
        function setPermissions(permissions) {
            permissionList = permissions;
            $rootScope.$broadcast('permissionsChanged')
        }

        function hasPermission(permission) {
            permission = permission.trim();
            return _.some(permissionList, function(item) {
                var items = permission.split(',');
                var flag = false;
                for (var i = 0 ;i<items.length;i++) {
                    if( item === items[i]){
                        flag = true;
                        break;
                    }
                }
                return flag;
            });
        }

        var permissions =  {

            setPermissions:setPermissions,
            hasPermission: hasPermission
        };

        return permissions;
        //////////////


    }




})(this.angular);