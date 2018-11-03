/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('staticAnalyzeController', StaticAnalyzeController);
    /* @ngInject */
    function StaticAnalyzeController(setting,auth,permissions,Restangular,$rootScope,$ionicHistory,$state,$location,$ionicLoading){
        var vm = this;
        vm.init =init;
        vm.data;
        vm.instituteId;
        var lineChartWidth =window.screen.availWidth;
        vm.height = (window.screen.availHeight -145) /2 +'px';
        //getMemberData();

        //费用
        vm.feeConfig = {
            title: {
                text: '',
                //x: -20
            },
            options: {
                chart: {
                    type: 'column', //柱状图
                    marginRight: 30,
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            xAxis: {
                categories:[],
                credits: {
                    enabled: true
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value + '千元';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            plotOptions: {
                column: {
                    pointPadding: 1.0,
                    borderWidth: 0,
                    dataLabels: { //将数据标签放置在柱子内部
                        inside: true
                    }
                }
            },
            series: [
                {
                    name: '',
                    tooltip: {
                        valueSuffix: ''
                    },
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.0f}', // one decimal
                    },

                },

                {
                    name: '',
                    tooltip: {
                        valueSuffix: ''
                    },
                    color:"#fdaa29",
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.0f}', // one decimal
                    },

                },

            ]
        };
        function feeSet(list){
            var data1 = [];
            var data2 = [];
            var label = [];

            var list1 = list[0];
            var list2 = list[1];
            for (var i = 0 ;i<list1.length;i++){
                data1.push(list1[i].value);
                label.push(list1[i].name);
            }
            for (var i = 0 ;i<list2.length;i++){
                data2.push(list2[i].value);
            }
            vm.feeConfig.title.text='';
            vm.feeConfig.yAxis.title.text='';
            vm.feeConfig.series[0].name = "应收";
            vm.feeConfig.series[0].tooltip.valueSuffix= "千元";
            vm.feeConfig.series[1].name = "实收";
            vm.feeConfig.series[1].tooltip.valueSuffix= "千元";
            vm.feeConfig.series[0].data=data1;
            vm.feeConfig.series[1].data=data2;
            vm.feeConfig.xAxis.categories=label;
        }
        //预付款-账户
        vm.accountConfig = {

            title: {
                text: '',
                //x: -20
            },
            options: {
                chart: {
                    type: 'column', //柱状图
                    marginRight: 30,
                    //marginBottom: 25
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }

            },
            xAxis: {
                categories:[],
                credits: {
                    enabled: true
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value + '千元';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            plotOptions: {
                column: {
                    pointPadding: 1.0,
                    borderWidth: 0,
                    dataLabels: { //将数据标签放置在柱子内部
                        inside: true
                    }
                }
            },
            series: [
                {
                    name: '',
                    tooltip: {
                        valueSuffix: ''
                    },
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.0f}', // one decimal
                        y: 0, // 10 pixels down from the top
                    },
                    showInLegend: false // 设置为 false 即为不显示在图例中

                }
            ]


        };
        function accountSet(list,sum){
            var data1 = [];
            var label = [];
            for (var i = 0 ;i<list.length;i++){
                var obj = {name : list[i].key,y : parseFloat(list[i].value),color:getRandomColor()};
                data1.push(obj);
                label.push(list[i].key);
            }

            vm.accountConfig.title.text='合计：' +formatter(sum) + '元';
            vm.accountConfig.yAxis.title.text='';
            vm.accountConfig.series[0].name = "金额";
            vm.accountConfig.series[0].tooltip.valueSuffix= "千元";
            vm.accountConfig.series[0].data=data1;
            vm.accountConfig.xAxis.categories=label
        }

        vm.memberInConfig = {

            chart: {
                type: 'line',//指定图表的类型，默认是折线图（line）
            },
            credits:{
                enabled:false // 禁用版权信息
            },
            title: {
                text: ''//指定图表标题
            },
            /*
             subtitle: {
             text: '副标题'
             },
             */
            xAxis: {
                title:{
                    text:''
                },
                categories: [],//指定x轴分组
                //gridLineWidth:1,
            },
            yAxis: {
                title:{
                    text:''
                },
                labels: {
                    formatter: function () {
                        return this.value + '人';
                    }
                },
                tickPositioner: function() {
                    var positions = [],
                        tick = 0, max = 0;
                    //当最大值大于30时，刻度线以50的倍数增加，当小于30时，刻度线以5的倍数增加
                    if (this.dataMax <= 5) {
                        max = 5;
                    } else {
                        max =  Math.ceil(this.dataMax/5)*5;
                    }
                    //步长为5，y轴固定划分为5个刻度区间
                    var increment = max/5;
                    for (tick; tick <= max; tick += increment) {
                        positions.push(tick);
                    }
                    return positions;
                },
                gridLineColor:"#ffffff"
            },
            legend: {//是否显示底注
                enabled:false
            },
            series: [{//指定数据列
                color: '#1bb8fa',
                name: '', //数据列名
                marker: {//节点以方块形式显示
                    symbol: 'circle'
                },
                data: [] //数据
            }],
            tooltip: {

                crosshairs: false,//显示竖的分割线
                shared: false,//两个节点数据框共享

            },
            plotOptions: {//为每个节点显示值
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                },
            },

        };

        function memberInSet(list){
            var data1 = [];
            var label = [];
            for (var i = 0 ;i<list.labels.length;i++){
                var obj = {name : list.labels[i],y : parseFloat(list.value[i])};
                data1.push(obj);
                label.push(list.labels[i]);
            }
            vm.memberInConfig.title.text='';
            vm.memberInConfig.yAxis.title.text='';
            vm.memberInConfig.series[0].name = "入住人数";
            vm.memberInConfig.series[0].data=data1;
            vm.memberInConfig.xAxis.categories=label;
        }
        vm.memberOutConfig = {

            chart: {
                type: 'area',//指定图表的类型，默认是折线图（line）
            },
            credits:{
                enabled:false // 禁用版权信息
            },
            title: {
                text: ''//指定图表标题
            },
            /*
             subtitle: {
             text: '副标题'
             },
             */
            xAxis: {
                title:{
                    text:''
                },
                categories: [],//指定x轴分组
                //gridLineWidth:1,
            },
            yAxis: {
                title:{
                    text:''
                },
                labels: {
                    formatter: function () {
                        return this.value + '人';
                    }
                },
                tickPositioner: function() {
                    var positions = [],
                        tick = 0, max = 0;
                    //当最大值大于30时，刻度线以50的倍数增加，当小于30时，刻度线以5的倍数增加
                    if (this.dataMax <= 5) {
                        max = 5;
                    } else {
                        max =  Math.ceil(this.dataMax/5)*5;
                    }
                    //步长为5，y轴固定划分为5个刻度区间
                    var increment = max/5;
                    for (tick; tick <= max; tick += increment) {
                        positions.push(tick);
                    }
                    return positions;
                },
                gridLineColor:"#ffffff"
            },
            legend: {//是否显示底注
                enabled:false
            },
            series: [{//指定数据列
                color: '#95ce5c',
                name: '', //数据列名
                marker: {//节点以方块形式显示
                    symbol: 'circle'
                },
                data: [] //数据
            }],
            tooltip: {

                crosshairs: false,//显示竖的分割线
                shared: false,//两个节点数据框共享

            },
            plotOptions: {//为每个节点显示值
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                },
            }
        };

        function memberOutSet(list){
            var data1 = [];
            var label = [];
            for (var i = 0 ;i<list.labels.length;i++){
                var obj = {name : list.labels[i],y : parseFloat(list.value[i]),color:'#95ce5c'};
                data1.push(obj);
                label.push(list.labels[i]);
            }
            vm.memberOutConfig.title.text='';
            vm.memberOutConfig.yAxis.title.text='';
            vm.memberOutConfig.series[0].name = "退住人数";
            vm.memberOutConfig.series[0].data=data1;
            vm.memberOutConfig.xAxis.categories=label;
        }

        vm.memberConfig = {

            title: {
                text: '',
                //x: -20
            },
            options: {
                chart: {
                    type: 'bar', //柱状图
                    marginRight: 30,
                    //marginBottom: 25
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }

            },
            xAxis: {
                categories:[],
                credits: {
                    enabled: true
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value + '人';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            plotOptions: {
                column: {
                    pointPadding: 1.0,
                    borderWidth: 0,
                    dataLabels: { //将数据标签放置在柱子内部
                        inside: true
                    }
                }
            },
            series: [
                {
                    name: '',
                    tooltip: {
                        valueSuffix: ''
                    },
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'left',
                        format: '{point.y:.0f}', // one decimal
                        y: 0, // 10 pixels down from the top
                    },
                    pointWidth:10,
                    data: [],
                    showInLegend: false // 设置为 false 即为不显示在图例中

                }
            ]


        };
        function memberSet(indata){
            var label = ['床位总数', '在住人数','预订人数', '入住办理中人数','退住办理中人数'];
            var data1 = [
                {name : '床位总数',y : indata.bedCount,color:'#56a8e7'},
                {name : '在住人数',y : indata.memberCount,color:'#f1705c'},
                {name : '预订人数',y : indata.bookCount,color:'#fdaa29'},
                {name : '入住办理中人数',y : indata.inAppllingCount,color:'#9cbc72'},
                {name : '退住办理中人数',y : indata.outAppllingCount,color:'#a56f8f'}
            ];

            vm.memberConfig.title.text='';
            vm.memberConfig.yAxis.title.text='';
            vm.memberConfig.series[0].name = "人数";
            vm.memberConfig.series[0].tooltip.valueSuffix= "人";
            vm.memberConfig.series[0].data=data1;
            vm.memberConfig.xAxis.categories=label
        }


        vm.circleAllMemberConfig = {

            title: {
                text: '',
                //x: -20
            },
            options: {
                chart: {
                    type: 'pie', //柱状图
                    //marginBottom: 25
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }

            },
            xAxis: {
                categories:[],
                credits: {
                    enabled: true
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            plotOptions: {
                column: {
                    pointPadding: 1.0,
                    borderWidth: 0,
                    dataLabels: { //将数据标签放置在柱子内部
                        inside: true
                    }
                }
            },
            series: [
                {
                    name: '',
                    tooltip: {
                        valueSuffix: ''
                    },
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.0f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    data: [],

                    showInLegend: false // 设置为 false 即为不显示在图例中

                }
            ]


        };
        function circleAllMemberConfigSet(inData){
            var data1 =Number(inData.replace('%',''));
            data1 =  Number(data1.toFixed(2));
            var data2 = Number((100 - data1).toFixed(2));
            var data = [
                {name : '在住',y : data1,color:'#4e8aea'},
                {name : '空床',y : data2,color:'#eeeeee'}
            ];
            var label = ['在住','空床'];

            vm.circleAllMemberConfig.title.text='';
            vm.circleAllMemberConfig.yAxis.title.text='';
            vm.circleAllMemberConfig.series[0].name = "百分比";
            vm.circleAllMemberConfig.series[0].tooltip.valueSuffix= "";
            vm.circleAllMemberConfig.series[0].data=data;
            vm.circleAllMemberConfig.xAxis.categories=label
        }


        vm.serviceConfig = {

            title: {
                text: '',
                //x: -20
            },
            options: {
                chart: {
                    type: 'pie', //柱状图

                    //marginBottom: 25
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }

            },
            xAxis: {
                categories:[],
                credits: {
                    enabled: true
                }
            },

            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            plotOptions: {
                column: {
                    pointPadding: 1.0,
                    borderWidth: 0,
                    dataLabels: { //将数据标签放置在柱子内部
                        inside: true
                    }
                }
            },
            series: [
                {
                    name: '',
                    tooltip: {
                        valueSuffix: ''
                    },
                    data: [],
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: false // 设置为 false 即为不显示在图例中

                }
            ]


        };
        function serviceSet(list){
            var data1 = [];
            var label = [];
            if (list == null){
                return;
            }
            for (var i = 0 ;i<list.length;i++){
                var obj = {name : list[i].careRankName,y : parseFloat(list[i].count),color:getRandomColor()};
                data1.push(obj);
                label.push(list[i].careRankName);
            }

            vm.serviceConfig.title.text='';
            vm.serviceConfig.yAxis.title.text='';
            vm.serviceConfig.series[0].name = "人数";
            vm.serviceConfig.series[0].tooltip.valueSuffix= "";
            vm.serviceConfig.series[0].data=data1;
            vm.serviceConfig.xAxis.categories=label
        }

        vm.ageConfig = {

            title: {
                text: '',
                //x: -20
            },
            options: {
                chart: {
                    type: 'pie', //柱状图

                    //marginBottom: 25
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }

            },
            xAxis: {
                categories:[],
                credits: {
                    enabled: true
                }
            },

            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            plotOptions: {
                column: {
                    pointPadding: 1.0,
                    borderWidth: 0,
                    dataLabels: { //将数据标签放置在柱子内部
                        inside: true
                    }
                }
            },
            series: [
                {
                    name: '',
                    tooltip: {
                        valueSuffix: ''
                    },
                    data: [],
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    showInLegend: false // 设置为 false 即为不显示在图例中

                }
            ]


        };
        function ageSet(list){
            var data1 = [];
            var label = [];
            var per = 0;
            if (list == null){
                return;
            }
            for (var i = 0 ;i<list.length;i++){
                var obj = {name : list[i].name,y : parseFloat(list[i].value),color:getRandomColor()};
                data1.push(obj);
                label.push(list[i].name);
                per = list[i].value2;
            }

            vm.ageConfig.title.text='平均年龄'+ per + "岁";
            vm.ageConfig.yAxis.title.text='';
            vm.ageConfig.series[0].name = "人数";
            vm.ageConfig.series[0].tooltip.valueSuffix= "";
            vm.ageConfig.series[0].data=data1;
            vm.ageConfig.xAxis.categories=label
        }
        function init(){
            vm.instituteList = [];
            var account = auth.getObject("account");
            var credentials={
                grpId : account.groupId
            };
            var proc = Restangular.all('retGetInstitutes');
            proc.post(credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    vm.instituteDtoList = ret.instituteDtoList;
                    for (var i = 0 ; i < vm.instituteDtoList.length ;i++){
                        if(vm.instituteDtoList[i].instituteId != null){
                            vm.instituteId = vm.instituteDtoList[1].instituteId;
                            var obj = {value : vm.instituteDtoList[i].name,key : vm.instituteDtoList[i].instituteId};
                            vm.instituteList.push(obj);

                        }
                    }
                }
                memberStatics();
            }, function() {
            });


        }
        function memberStatics(){
            $ionicLoading.show({
                template: 'Loading...'
            });
            var credentials={
                "instituteId":vm.instituteId
            };
            //会员统计
            var proc = Restangular.all('reqStaticAnalyze');
            proc.post(credentials).then(function(ret) {
                if (ret.returnCode == "0") {
                    var form = ret;
                    vm.data = ret;
                    circleAllMemberConfigSet(form.oldManStatisticalDto.occupancyRate);
                    memberSet(form.oldManStatisticalDto);
                    memberInSet(form.checkInMembers);
                    memberOutSet(form.checkOutMembers);
                    serviceSet(form.mCareRankDtoList);
                    accountSet(form.accountList,form.accountSum);
                    feeSet(form.payList);
                    ageSet(form.ageList);
                }
                $ionicLoading.hide();
            }, function() {
                $ionicLoading.hide();
            });
        }


        function formatter(value) {
            //if ((value * 1) == 0) return "";

            return Business.formatterMoney(value);
        }


        function getRandomColor(){
            return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
        }
        function formatter(value) {

            var number = value+"";
            number = number.replace(/,/g, "");
            if(isNaN(number) || number == "")return "";
            number = Math.round(number * 1000) / 1000;
            if (number < 0)
                return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
            else
                return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
        }
        //格式化金额
        function outputdollars(number) {
            if (number.length <= 3)
                return (number == '' ? '0' : number);
            else {
                var mod = number.length % 3;
                var output = (mod == 0 ? '' : (number.substring(0, mod)));
                for (var i = 0; i < Math.floor(number.length / 3); i++) {
                    if ((mod == 0) && (i == 0))
                        output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                    else
                        output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
                }
                return (output);
            }
        }
        //格式化金额
        function outputcents(inAmount) {
            var amount =parseFloat(inAmount);
            if(String(amount).indexOf('.') >0 && String(amount).length - String(amount).indexOf('.') - 1>=3){
                amount = Math.round(((amount) - Math.floor(amount)) * 1000);
                return (amount < 10 ? '.00' + amount : '.' + amount);
            } else {
                amount = Math.round(((amount) - Math.floor(amount)) * 100);
                return (amount < 10 ? '.0' + amount : '.' + amount);
            }
        }
        vm.isGroup = true;
        var account = auth.getObject("account");
        if (account.orgId != null){
            vm.isGroup = false;
        }
        init();
        vm.changeInstitute = function(instituteId){
            vm.instituteId = instituteId;
            memberStatics();
        }
    }


})(this.angular);