/**
 * 会员信息服务
 * Created by longzhiyou on 2016/11/14.
 */

(function (angular) {
    angular.module('app').factory('customerInfoService', ['Restangular','$q','localService', factory]);

    function factory(Restangular,$q,localService) {

        //原始数据
        var initData={
            "customerId":null,
            "personName": "",
            "gender": "0",//默认男
            "age":"",
            "contact":"",//联系方式
            "nation": "001", //民族,默认汉
            "selfcareDegree":"", //自理程度
            "addressProvince": "",//现住址省
            "addressCity":"", //市
            "addressCountry":"",//区
            "address": "", //具体地址
            "livedInNursingHome": "", //是否住过养老机构
            "residentialStatus": "", //居住状况
            "incomeSource": "", //收入来源 （多选）
            "economicIncome": "", //收入水平
            "medicalInsurance": "", //医保属性
            "educationDegree": "", //文化程度
            "orgWorkunitType": "", //原单位类型
            "orgWorkunit":"",//原工作单位
            "orgWorkunitPosition": "", // 原职业
            "familyStructure": "", //家庭结构
            "voluntary":"",//是否自愿
            "personMemo": "", //备注
            "sibName": "", //联系人姓名
            "sibContact": "", //联系方式
            "sibRelation": "", //与老人关系
            "sibMemo": "", //备注
            "desiredDate": "", //可能入住日期
            "livingStatus": "", //入住类型
            "informationChannel": "", //信息获取渠道（多选）
            "affordablePeriodCost": "", //理想价格
            "affordableCost": "", //可承担费用
            "payType": "", //付款方式（多选）
            "concerns": "", //关注点（多选）
            "willParty":"",//意愿方
            "intentionality": "",//意向度
            "returnVisitDate": "", //预定回访日期
            "concernsMemo": "", //备注
            "status":"", //营销小结
            "summaryMemo":"", //备注
            "returnVisitList":[],//回访履历列表
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
        function init(customerId) {
            var deferred=$q.defer();
            var promise=deferred.promise;

            if (!customerId) {
                //新增
                 srcData=angular.copy(initData);
                 backupData=angular.copy(initData);
                 deferred.resolve(srcData);//执行成功
            }else {

                var req = Restangular.all('reqCustomerInfo');
                req.post({"customerId":customerId}).then(function(data) {

                    srcData=angular.copy(data.reqCustomerAddInput);
                    backupData=angular.copy(data.reqCustomerAddInput);
                    deferred.resolve(srcData);//执行成功
                }, function() {
                    deferred.reject();//执行失败
                });

            }
            return promise;
        }

        function clear() {

        }
        function save(customerId){

            var deferred=$q.defer();
            var promise=deferred.promise;


            srcData.customerId=customerId;

            var account = localService.getObject("account");

            srcData.staffId = account.staffId;
            srcData.staffName=account.staffName;

            var req = Restangular.all('reqCustomerAdd');
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

            return angular.equals(customerInfoService.srcData,customerInfoService.info);

        }


    }




})(this.angular);