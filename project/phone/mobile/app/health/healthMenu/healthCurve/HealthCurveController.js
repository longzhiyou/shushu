/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('healthCurveController', HealthCurveController);
    /* @ngInject */
    function HealthCurveController($scope, $rootScope, auth,Restangular,$stateParams,toastr, ionicDatePicker){
        var vm = this;
        vm.personName = $stateParams.personName;
        vm.personId = $stateParams.personId;
        vm.memberId = $stateParams.memberId;
        vm.list;
        vm.bloodGlucoseDtoList;
        vm.dataBlood; //血压
        vm.dataTemperature; //体温
        vm.dataPulse; //脉搏
        vm.dataBreath; //呼吸
        vm.dataWeight; //体重
        vm.dataBloodGlucose; //血糖
        vm.noData = false;
        var lineChartWidth =window.screen.availWidth;
        vm.height = (window.screen.availHeight) /2 +'px';
        getNilRecordList();
        //取得老人一览
        function getNilRecordList() {
            var account = auth.getObject("account");
            vm.credentials={
                "personId":vm.personId,
                "memberId":vm.memberId
            };
            var proc = Restangular.all('reqNilRecordList');
            proc.post(vm.credentials).then(function(ret) {
                vm.error = false;

                if (ret.returnCode == "0") {
                    vm.list = ret.list;
                    vm.bloodGlucoseDtoList = ret.bloodGlucoseDtoList;
                    vm.noData = false;
                    if(vm.list){
                        for (var i = 0 ;i<vm.list.length;i++){

                            var date = new Date(vm.list[i].measureDate);
                            vm.list[i].measureDate =date.Format("yyyy-MM-dd hh:mm");

                        }
                        bloodSet(vm.list);//血压
                        temperature(vm.list);//体温
                        pulse(vm.list);//脉搏
                        breath(vm.list); //呼吸
                        weight(vm.list); //体重
                    }
                    if(vm.bloodGlucoseDtoList){
                        for(var i = 0 ;i<vm.bloodGlucoseDtoList.length;i++){
                            var date = new Date(vm.bloodGlucoseDtoList[i].inputDateTime);
                            vm.bloodGlucoseDtoList[i].inputDateTime =date.Format("yyyy-MM-dd hh:mm");
                        }

                        bloodGlucose(vm.bloodGlucoseDtoList);//血糖
                    }
                    if(!(vm.dataBlood || vm.dataTemperature || vm.dataPulse || vm.dataBreath || vm.dataWeight || vm.dataBloodGlucose)){
                        vm.noData = true;
                    }

                }
            }, function() {

            });
        }

        vm.bloodConfig = {

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
                labels: {
                    enabled: false// 不显示X轴
                }
                //title:{
                //    text:''
                //},
                //categories: [],//指定x轴分组
                //gridLineWidth:1,
            },
            yAxis: {
                title:{
                    text:''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    },
                },
                tickPositioner: function() {
                    var positions = [],
                        tick = 40, max = 180;

                    var increment = 20;
                    if(this.dataMax > 180){
                        max = Math.ceil(this.dataMax)+20;
                    }
                    if(this.dataMin < 40){
                        tick = Math.ceil(this.dataMin)-20;
                    }
                    if(tick < 0){
                        tick = 0;
                    }
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
            series: [
                {//指定数据列
                    color: '#0000CD',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.0f}', // one decimal
                    },
                },
                {//指定数据列
                    color: '#9370DB',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.0f}', // one decimal
                    },
                }
            ],
            tooltip: {

                crosshairs: true,//显示竖的分割线
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

        function bloodSet(list){
            var data1 = [];
            var data2 = [];
            var label = [];
            for (var i = 0 ;i<list.length;i++){

                if (list[i].bpMax != null && list[i].bpMax != '' && list[i].bpMin != null && list[i].bpMin != '') {

                    var obj = {name : list[i].measureDate,y : parseFloat(list[i].bpMax)};
                    data1.push(obj);
                    var obj2 = {name : list[i].measureDate,y : parseFloat(list[i].bpMin)};
                    data2.push(obj2);
                    label.push(list[i].measureDate);
                }else{
                    continue;
                }
            }
            if(data1.length > 1){
                vm.dataBlood = true;
            }
            vm.bloodConfig.title.text='';
            vm.bloodConfig.yAxis.title.text='';
            vm.bloodConfig.series[0].name = "高压";
            vm.bloodConfig.series[0].data=data1;
            vm.bloodConfig.series[1].name = "低压";
            vm.bloodConfig.series[1].data=data2;
            vm.bloodConfig.xAxis.categories=label;
        }

        vm.temperatureConfig = {

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
                labels: {
                    enabled: false// 不显示X轴
                }
                //title:{
                //    text:''
                //},
                //categories: [],//指定x轴分组
                //gridLineWidth:1,
            },
            yAxis: {
                title:{
                    text:''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    },
                },
                tickPositioner: function() {
                    var positions = [],
                        tick = 35, max = 42;

                    var increment = 1;
                    if(this.dataMax > 42){
                        max = Math.ceil(this.dataMax)+2;
                    }
                    if(this.dataMin < 40){
                        tick = Math.ceil(this.dataMin)-2;
                    }
                    if(tick < 0){
                        tick = 0;
                    }
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
            series: [
                {//指定数据列
                    color: '#87CEFA',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.1f}', // one decimal
                    },
                }
            ],
            tooltip: {

                crosshairs: true,//显示竖的分割线
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

        function temperature(list){
            var data1 = [];
            var label = [];
            for (var i = 0 ;i<list.length;i++){

                if (list[i].temperature != null && list[i].temperature != '') {

                    var obj = {name : list[i].measureDate,y : parseFloat(list[i].temperature)};
                    data1.push(obj);
                    label.push(list[i].measureDate);
                }else{
                    continue;
                }
            }
            if(data1.length > 1){
                vm.dataTemperature = true;
            }
            vm.temperatureConfig.title.text='';
            vm.temperatureConfig.yAxis.title.text='';
            vm.temperatureConfig.series[0].name = "体温";
            vm.temperatureConfig.series[0].data=data1;
            vm.temperatureConfig.xAxis.categories=label;
        }

        vm.pulseConfig = {

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
                labels: {
                    enabled: false// 不显示X轴
                }
                //title:{
                //    text:''
                //},
                //categories: [],//指定x轴分组
                //gridLineWidth:1,
            },
            yAxis: {
                title:{
                    text:''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    },
                },
                tickPositioner: function() {
                    var positions = [],
                        tick = 20, max = 100;

                    var increment = 10;
                    if(this.dataMax > 100){
                        max = Math.ceil(this.dataMax)+10;
                    }
                    if(this.dataMin < 20){
                        tick = Math.ceil(this.dataMin)-10;
                    }
                    if(tick < 0){
                        tick = 0;
                    }
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
            series: [
                {//指定数据列
                    color: '#FF8C00',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.0f}', // one decimal
                    },
                }
            ],
            tooltip: {

                crosshairs: true,//显示竖的分割线
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

        function pulse(list){
            var data1 = [];
            var label = [];
            for (var i = 0 ;i<list.length;i++){

                if (list[i].pulse != null && list[i].pulse != '') {

                    var obj = {name : list[i].measureDate,y : parseFloat(list[i].pulse)};
                    data1.push(obj);
                    label.push(list[i].measureDate);
                }else{
                    continue;
                }
            }
            if(data1.length > 1){
                vm.dataPulse = true;
            }
            vm.pulseConfig.title.text='';
            vm.pulseConfig.yAxis.title.text='';
            vm.pulseConfig.series[0].name = "脉搏";
            vm.pulseConfig.series[0].data=data1;
            vm.pulseConfig.xAxis.categories=label;
        }

        vm.breathConfig = {

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
                labels: {
                    enabled: false// 不显示X轴
                }
                //title:{
                //    text:''
                //},
                //categories: [],//指定x轴分组
                //gridLineWidth:1,
            },
            yAxis: {
                title:{
                    text:''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    },
                },
                tickPositioner: function() {
                    var positions = [],
                        tick = 0, max = 30;

                    var increment = 3;
                    if(this.dataMax > 30){
                        max = Math.ceil(this.dataMax)+3;
                    }
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
            series: [
                {//指定数据列
                    color: '#FFB6C1',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.0f}', // one decimal
                    },
                }
            ],
            tooltip: {

                crosshairs: true,//显示竖的分割线
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

        function breath(list){
            var data1 = [];
            var label = [];
            for (var i = 0 ;i<list.length;i++){

                if (list[i].breathing != null && list[i].breathing != '') {

                    var obj = {name : list[i].measureDate,y : parseFloat(list[i].breathing)};
                    data1.push(obj);
                    label.push(list[i].measureDate);
                }else{
                    continue;
                }
            }
            if(data1.length > 1){
                vm.dataBreath = true;
            }
            vm.breathConfig.title.text='';
            vm.breathConfig.yAxis.title.text='';
            vm.breathConfig.series[0].name = "呼吸";
            vm.breathConfig.series[0].data=data1;
            vm.breathConfig.xAxis.categories=label;
        }

        vm.weightConfig = {

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
                labels: {
                    enabled: false// 不显示X轴
                }
                //title:{
                //    text:''
                //},
                //categories: [],//指定x轴分组
                //gridLineWidth:1,
            },
            yAxis: {
                title:{
                    text:''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    },
                },
                tickPositioner: function() {
                    var positions = [],
                        tick = 30, max = 100;

                    var increment = 5;
                    if(this.dataMax > 100){
                        max = Math.ceil(this.dataMax)+5;
                    }
                    if(this.dataMin < 30){
                        tick = Math.ceil(this.dataMin)-5;
                    }
                    if(tick < 0){
                        tick = 0;
                    }
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
            series: [
                {//指定数据列
                    color: '#4169E1',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.0f}', // one decimal
                    },
                }
            ],
            tooltip: {

                crosshairs: true,//显示竖的分割线
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

        function weight(list){
            var data1 = [];
            var label = [];
            for (var i = 0 ;i<list.length;i++){

                if (list[i].weight != null && list[i].weight != '') {

                    var obj = {name : list[i].measureDate,y : parseFloat(list[i].weight)};
                    data1.push(obj);
                    label.push(list[i].measureDate);
                }else{
                    continue;
                }
            }
            if(data1.length > 1){
                vm.dataWeight = true;
            }
            vm.weightConfig.title.text='';
            vm.weightConfig.yAxis.title.text='';
            vm.weightConfig.series[0].name = "体重";
            vm.weightConfig.series[0].data=data1;
            vm.weightConfig.xAxis.categories=label;
        }

        vm.bloodGlucoseConfig = {

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
                labels: {
                    enabled: false// 不显示X轴
                },
                //title:{
                //    text:''
                //},
                //categories: [],//指定x轴分组
                //gridLineWidth:1,
            },
            yAxis: {
                title:{
                    text:''
                },
                labels: {
                    formatter: function () {
                        return this.value + '';
                    },
                },
                tickPositioner: function() {
                    var positions = [],
                        tick = 1.0, max = 12.0;

                    var increment = 0.5;
                    if(this.dataMax > 12.0){
                        max = Math.ceil(this.dataMax)+1.0;
                    }
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
            series: [
                {//指定数据列
                    color: '#CD69C9',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.1f}', // one decimal
                    },
                },
                {//指定数据列
                    color: '#CD6839',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.1f}', // one decimal
                    },
                },
                {//指定数据列
                    color: '#6495ED',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.1f}', // one decimal
                    },
                },
                {//指定数据列
                    color: '#36648B',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.1f}', // one decimal
                    },
                },
                {//指定数据列
                    color: '#808080',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.1f}', // one decimal
                    },
                },
                {//指定数据列
                    color: '#008B8B',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.1f}', // one decimal
                    },
                },
                {//指定数据列
                    color: '#000000',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.1f}', // one decimal
                    },
                },
                {//指定数据列
                    color: '#F5DEB3',
                    name: '', //数据列名
                    marker: {//节点以方块形式显示
                        symbol: 'circle'
                    },
                    data: [], //数据
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        format: '{point.y:.1f}', // one decimal
                    },
                },
            ],
            tooltip: {
                crosshairs: true,//显示竖的分割线
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

        function bloodGlucose(list){
            var data1 = []; //早餐前
            var data2 = []; //早餐后
            var data3 = []; //午餐前
            var data4 = []; //午餐后
            var data5 = []; //晚餐前
            var data6 = []; //晚餐后
            var data7 = []; //睡前
            var data8 = []; //临时
            for (var i = 0 ;i<list.length;i++){

                if (list[i].bloodGlucoseValue != null && list[i].bloodGlucoseValue != '' && "01" == list[i].timeInterval) {
                    var obj = {name : list[i].inputDateTime,y : parseFloat(list[i].bloodGlucoseValue)};
                    data1.push(obj);
                }else if(list[i].bloodGlucoseValue != null && list[i].bloodGlucoseValue != '' && "02" == list[i].timeInterval){
                    var obj = {name : list[i].inputDateTime,y : parseFloat(list[i].bloodGlucoseValue)};
                    data2.push(obj);
                }else if(list[i].bloodGlucoseValue != null && list[i].bloodGlucoseValue != '' && "03" == list[i].timeInterval){
                    var obj = {name : list[i].inputDateTime,y : parseFloat(list[i].bloodGlucoseValue)};
                    data3.push(obj);
                }else if(list[i].bloodGlucoseValue != null && list[i].bloodGlucoseValue != '' && "04" == list[i].timeInterval){
                    var obj = {name : list[i].inputDateTime,y : parseFloat(list[i].bloodGlucoseValue)};
                    data4.push(obj);
                }else if(list[i].bloodGlucoseValue != null && list[i].bloodGlucoseValue != '' && "05" == list[i].timeInterval){
                    var obj = {name : list[i].inputDateTime,y : parseFloat(list[i].bloodGlucoseValue)};
                    data5.push(obj);
                }else if(list[i].bloodGlucoseValue != null && list[i].bloodGlucoseValue != '' && "06" == list[i].timeInterval){
                    var obj = {name : list[i].inputDateTime,y : parseFloat(list[i].bloodGlucoseValue)};
                    data6.push(obj);
                }else if(list[i].bloodGlucoseValue != null && list[i].bloodGlucoseValue != '' && "07" == list[i].timeInterval){
                    var obj = {name : list[i].inputDateTime,y : parseFloat(list[i].bloodGlucoseValue)};
                    data7.push(obj);
                }else if(list[i].bloodGlucoseValue != null && list[i].bloodGlucoseValue != '' && "08" == list[i].timeInterval){
                    var obj = {name : list[i].inputDateTime,y : parseFloat(list[i].bloodGlucoseValue)};
                    data8.push(obj);
                }else {
                    continue;
                }
            }
            if(data1.length > 1 || data2.length > 1 || data3.length > 1 || data4.length > 1 || data5.length > 1 || data6.length > 1 || data7.length > 1 || data8.length > 1){
                vm.dataBloodGlucose = true;
            }
            vm.bloodGlucoseConfig.title.text='';
            vm.bloodGlucoseConfig.yAxis.title.text='';
            vm.bloodGlucoseConfig.series[0].name = "早餐前";
            vm.bloodGlucoseConfig.series[0].data=data1;
            vm.bloodGlucoseConfig.series[1].name = "早餐后";
            vm.bloodGlucoseConfig.series[1].data=data2;
            vm.bloodGlucoseConfig.series[2].name = "午餐前";
            vm.bloodGlucoseConfig.series[2].data=data3;
            vm.bloodGlucoseConfig.series[3].name = "午餐后";
            vm.bloodGlucoseConfig.series[3].data=data4;
            vm.bloodGlucoseConfig.series[4].name = "晚餐前";
            vm.bloodGlucoseConfig.series[4].data=data5;
            vm.bloodGlucoseConfig.series[5].name = "晚餐后";
            vm.bloodGlucoseConfig.series[5].data=data6;
            vm.bloodGlucoseConfig.series[6].name = "睡前";
            vm.bloodGlucoseConfig.series[6].data=data7;
            vm.bloodGlucoseConfig.series[7].name = "临时";
            vm.bloodGlucoseConfig.series[7].data=data8;
            //vm.bloodGlucoseConfig.xAxis.categories=label;
        }

        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

    }

})(this.angular);