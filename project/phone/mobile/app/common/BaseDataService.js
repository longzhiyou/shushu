/**
 * 基础数据服务
 * Created by longzhiyou on 2016/11/14.
 */

(function (angular) {
    angular.module('app').factory('baseDataService', ['Restangular','$q','localService', factory]);

    function factory(Restangular,$q,localService) {

        var baseData=null;
        return {
            get: get,
            init: init
        };

        //////////////

        function get() {
            if (!baseData) {
                baseData = localService.getObject("baseData");
            }
            return baseData;

        }
        function init() {

            var deferred=$q.defer();
            var promise=deferred.promise;
            var req = Restangular.all('reqBaseDataInfo');
            req.post({}).then(function(data) {
                localService.setObject("baseData",data);
                baseData=data;

                // baseData.info = data;
                deferred.resolve(data);//执行成功
            }, function() {
                deferred.reject();//执行失败
            });
            return promise;
        }


    }




})(this.angular);