/**
 * 会员信息服务
 * Created by longzhiyou on 2016/11/14.
 */

(function (angular) {
    angular.module('app').factory('memberInfoService', ['Restangular','$q','localService', factory]);

    function factory(Restangular,$q,localService) {

        //原始数据
        var initData={
            "personId":null,
            "personName": "",
            "gender": "0",//默认男
            "birthday": "",
            "nation": "001", //民族,默认汉
            "certificateType": "1",//默认身份证
            "idNumber": "",
            "tel": "",
            "busStation": "",
            "photoFile": "",
            "frontFile": "",
            "backFile": "",
            "validPeriodFrom": "",
            "validPeriodTo": "",
            "police": "",
            "ageAllowance": "",
            "education": "",
            "marriage": "",
            "living": "",
            "elderType": "",
            "economy": "",
            "economicIncome": "",
            "hospital": "",
            "nursingLevel": "",
            "burdenRatio": "",
            "disease": "",
            "infectiousDiseases": "",
            "physicalCondition": "",
            "hearingStatus": "",
            "visionStatus": "",
            "intelligenceStatus": "",
            "spiritStatus": "",
            "relationPersonName": "",
            "relationPersonId": "",
            "relation": "",
            "relationGender":"",
            "relationEconomicIncome":"",
            "relationIdAddress": "",
            "relationIdNumber": "",
            "relationTelephoneOne": "",
            "relationIssuingAuthority": "",
            "demandService": "",
            "nationality":"CHN",
            "province": "",
            "city": "",
            "county": "",
            "street": "",
            "idAddress":"",
            "latitude":"",
            "longitude":""
        };

        var srcData={}; //从后台获取的数据
        var backupData={};//原始备份数据

       return {
            init: init,
            get:  get,
            isModify: isModify,
            clear: clear,
            save: save
        };


        //////////////
        function init(personId) {
            var deferred=$q.defer();
            var promise=deferred.promise;

            if (!personId) {
                //新增
                 srcData=angular.copy(initData);
                 backupData=angular.copy(initData);
                 deferred.resolve(srcData);//执行成功
            }else {

                var req = Restangular.all('reqPersonInfo');
                req.post({"personId":personId}).then(function(data) {

                    srcData=angular.copy(data.memberInfo);
                    backupData=angular.copy(data.memberInfo);
                    deferred.resolve(srcData);//执行成功
                }, function() {
                    deferred.reject();//执行失败
                });

            }
            return promise;
        }

        function clear() {

        }
        function save(personId){

            var deferred=$q.defer();
            var promise=deferred.promise;


            srcData.personId=personId;

            var account = localService.getObject("account");

            srcData.staffId = account.staffId;
            srcData.staffName=account.staffName;

            var req = Restangular.all('reqPersonAdd');
            console.info(srcData);
            req.post(srcData).then(function(data) {

                deferred.resolve(data);//执行成功
            }, function() {
                deferred.reject();//执行失败
            });

            return promise;

        }
        function get() {
            return srcData;
        }

        function isModify() {

            return angular.equals(memberInfoService.srcData,memberInfoService.info);
            // return srcData === memberInfoService.info;

        }


    }




})(this.angular);