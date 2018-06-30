/**
 * 性别
 *
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .filter('genderFilter', genderFilter);

  /** @ngInject */
  function genderFilter() {
    return function(value) {
        if(value==='1')
          return "男";
        return "女";
    };
  }

})();
