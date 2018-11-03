/**
 *
 * Created by longzhiyou on 2016-06-12.
 */

(function(angular){
    "use strict";
    angular.module('app')
        .controller('handWriteController', HandWriteController);
    /* @ngInject */
    function HandWriteController($scope, $rootScope, setting,Restangular,$stateParams,$ionicHistory,toastr,$state,$ionicPopup) {
        var vm = this;
        vm.type = $stateParams.type;
        vm.serviceImm= $stateParams.subData;
        vm.dealNo = $stateParams.dealNo;
        vm.sign;
        vm.evaluate = 2;
        vm.evaluateList = ["不满意", "较满意", "满意", "非常满意"];
        vm.canvas=null;
        vm.clearCanvas=function () {

            vm.canvas.clear();

        };
        vm.isLock = false;
        vm.saveCanvas=function () {

            var str = vm.canvas.toDataURL();
            var data = str.split(",");
            vm.sign = data[1];
            if (vm.isLock){
                return;
            }
            var blank = document.createElement('canvas');
            blank.width = vm.canvas.width;
            blank.height = vm.canvas.height;
            if (vm.canvas.toDataURL() != blank.toDataURL()){
                if (data.length == 2) {
                    var evaluate = Number(vm.evaluate) + 1;
                    vm.serviceImm.careSignInfoList[0].assess = evaluate;
                    vm.serviceImm.careSignInfoList[0].carePhotoData = vm.sign;
                    vm.doImmAll();
                }
            } else{
                var confirmPopup = $ionicPopup.confirm({
                    title: '确认',
                    template: '会员还没有签字！保存服务结果吗？'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        var evaluate = Number(vm.evaluate) + 1;
                        vm.serviceImm.careSignInfoList[0].assess = evaluate;
                        vm.serviceImm.careSignInfoList[0].carePhotoData = null;
                        vm.doImmAll();
                    } else {
                        return;
                    }
                });


            }

        };

        vm.canvasInit=function () {


            var canvas = vm.canvas= new fabric.Canvas('canvas', {
                isDrawingMode: true
            });

            fabric.Object.prototype.transparentCorners = false;
            canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
            if (canvas.freeDrawingBrush) {
                var widthLine =5;
                canvas.freeDrawingBrush.color = "#000000";//drawingColorEl.value;
                canvas.freeDrawingBrush.width = parseInt(widthLine, 30) || 1;
                // canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                //     blur: parseInt(0, 10) || 0,
                //     offsetX: 0,
                //     offsetY: 0,
                //     affectStroke: true,
                //     color: "#005e7a"
                // });
            }

            window.addEventListener('resize', resizeCanvas, false);

        };



        function resizeCanvas() {

            // var $ = function(id){return document.getElementById(id)};


            vm.canvas.setWidth(window.innerWidth);
            vm.canvas.setHeight(window.innerHeight/2);
            vm.canvas.renderAll();
        }




        vm.canvasInit();
        // resize on init
        resizeCanvas();

        //服务实施
        vm.doImmAll = function() {
            if (vm.isLock == true){
                return;
            }
            vm.isLock = true;
            var proc = Restangular.all('synCareClientServerHandle');
            proc.post(vm.serviceImm).then(function(ret) {
                vm.isLock=true;
                if (ret.returnCode == "0") {
                    if (vm.type  == 1) {
                        $rootScope.$emit("CallServiceHandWriteMethod", {});

                        if (vm.dealNo != null && vm.dealNo.length >0) {
                            $state.go("app.pay", {
                                type: vm.type,
                                dealNo: vm.dealNo
                            });
                        } else {
                            $ionicHistory.goBack(-1);
                        }
                    } else {
                        $rootScope.$emit("CallServiceImmHandWriteMethod", {});
                        if (vm.dealNo != null && vm.dealNo.length >0) {
                            $state.go("app.pay", {
                                type: vm.type,
                                dealNo: vm.dealNo
                            });
                        } else {
                            $ionicHistory.goBack(-2);
                        }
                    }

                }
            }, function() {
            });
        };

    }
    })(this.angular);