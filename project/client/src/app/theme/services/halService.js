/**
 * 超媒体服务
 * created on 27.06.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('halService', halService);

    /** @ngInject */
    function halService() {

        return {
            getSelfLink: function (item) {
                // set the id from the self link
                if (item._links) {
                    return item._links.self.href;
                }
                return null;
            },
            getList: function (listName,hal,idName) {
                // set the id from the self link
                if (!idName) {
                    idName= "id";
                }
                var list =  hal._embedded[listName];
                for(var i = 0; i < list.length; i++) {

                    var item = list[i];
                    item[idName] = this.getId(item);


                }
                return list;
            },
            getId: function (item,idName) {
                if (idName) {
                    return  item[idName];
                }else {
                    // set the id from the self link
                    if (item._links && item._links.self.href.match(/\d+$/)) {
                        return item._links.self.href.match(/\d+$/)[0];
                    }
                    return 0;
                }

            }
        };
    }

})();