(function() {
  'use strict';

  angular
    .module('boldAngularTest')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(findServer) {
    var vm = this;
    vm.server = '';
    var servers = [
      {
          "url": "http://doesNotExist.boldtech.co",
          "priority": 1
      },
      {
          "url": "http://boldtech.co",
          "priority": 7
      },
      {
          "url": "http://offline.boldtech.co",
          "priority": 2
      },
      {
          "url": "http://google.com",
          "priority": 4
      }
  ];
    findServer.findServer(servers).then(function(res) {
      vm.server = res;
    }).catch(function(err) {
      vm.server = err;
    })
  }
})();
