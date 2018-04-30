(function() {
    'use strict';
  
    angular
        .module('boldAngularTest')
        .service('findServer', findServer);
  
    /** @ngInject */
    function findServer($http, $q) {
        this.findServer = function(servers) {
            return $q(function(resolve, reject) {
                var promiseArr = servers.map(function(server) {
                    return $q(function(resolve2) {
                        $http({
                            url: server.url,
                            method: 'GET',
                            timeout: 5000
                        }).then(function(d) {
                            resolve2({data: d, server: server});
                        }).catch(function(error){
                            resolve2({data: error, server: server});
                        })
                    })
                    
                });
                $q.all(promiseArr).then(function(resultsArr) {
                    var onlineServers = [];
                    var lowestPriorityServer;
                    resultsArr.map(function(result) {
                        if (result.data.status >= 200 && result.data.status <= 299 && result.data.status !== -1) {
                            onlineServers.push(result);
                        }
                    });
                    if (angular.isUndefined(onlineServers) || onlineServers.length === 0) {
                        return reject('No online servers at the moment');
                    }
                    onlineServers.map(function(s) {
                        if (!lowestPriorityServer) {
                            lowestPriorityServer = s.server;
                        }
                        if (lowestPriorityServer.priority > 0) {
                            lowestPriorityServer = lowestPriorityServer.priority > s.server.priority ? s.server : lowestPriorityServer;
                        }
                    });
                    return resolve(lowestPriorityServer);
                })
            })
        };
    }
  
  })();
  