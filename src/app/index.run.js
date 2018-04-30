(function() {
  'use strict';

  angular
    .module('boldAngularTest')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
