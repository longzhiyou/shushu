/**
 * 会员健康服务
 * Created by longzhiyou on 2016/11/14.
 */

(function (angular) {
    angular.module('app').factory('healthService', ['Restangular','$q','localService', factory]);

    function factory(Restangular,$q,localService) {

        //原始数据
        var initData={
           userId:"",
           staffId:"",
           staffName:"",
           isFormatFile:"",
           nilParamList:null, //生命体征实施集合,使用一个数组即可
           bloodInfoList:null,
           medicalWriteList:null
        };


       return {
            init:init,
            saveVitalSign: saveVitalSign,
            saveBloodGlucose: saveBloodGlucose,
            saveMedicalWrite: saveMedicalWrite
        };


        //////////////

        function init() {

            var account = localService.getObject("account");

            initData.staffId = account.staffId;
            initData.staffName=account.staffName;

            initData.nilParamList=null;
            initData.bloodInfoList=null;
            initData.medicalWriteList=null;
        }

        //保存生命体征
        function saveVitalSign(vitalSign) {
            var deferred=$q.defer();
            var promise=deferred.promise;

            initData.nilParamList=[vitalSign];
            var req = Restangular.all('synRecordClientServerHandle');
            req.post(initData).then(function(data) {
                deferred.resolve(data);//执行成功
            }, function() {
                deferred.reject();//执行失败
            });
            return promise;
        }

        function saveBloodGlucose(info) {

            var deferred=$q.defer();
            var promise=deferred.promise;

            initData.bloodInfoList=[info];
            var req = Restangular.all('synRecordClientServerHandle');
            req.post(initData).then(function(data) {
                deferred.resolve(data);//执行成功
            }, function() {
                deferred.reject();//执行失败
            });
            return promise;
        }

        //保存病程记录
        function saveMedicalWrite(medicalWrite) {
            var deferred=$q.defer();
            var promise=deferred.promise;

            initData.medicalWriteList=[medicalWrite];
            var req = Restangular.all('synRecordClientServerHandle');
            req.post(initData).then(function(data) {
                deferred.resolve(data);//执行成功
            }, function() {
                deferred.reject();//执行失败
            });
            return promise;
        }



    }




})(this.angular);