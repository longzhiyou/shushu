/**
 * 带状态的button bar指令
 * Created by longzhiyou on 2016/11/14.
 */

angular.module('app').directive('activeInButtonBar', function () {
    return {
        link: function (scope, elem) {

            var btns = elem.find('button');

            btns.bind('click', function () {
                angular.forEach(btns, function (oneBtn) {
                    //oneBtn.classList.remove('active');
                    if (oneBtn.classList.contains('active')) {
                        oneBtn.classList.remove('active');
                    }
                });

                //console.info("active");
                this.classList.add('active');
            });


        }
    }
});
