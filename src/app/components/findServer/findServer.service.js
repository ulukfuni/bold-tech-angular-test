(function() {
    'use strict';
  
    angular
        .module('boldAngularTest')
        .service('findServer', findServer);
  
    /** @ngInject */
    function findServer($http, $q) {
        /**
         * accepts array of objects that contain urls and finds online server
         * with lowest priority
         * @param {array} servers 
         */
        this.findServer = function(servers) {
            return $q(function(resolve, reject) {
                //make array of promises that check if servers are online
                var promiseArr = servers.map(function(server) {
                    //have to return a promise that resolves no matter what
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
                    });
                });
                //run promise array through all
                $q.all(promiseArr).then(function(resultsArr) {
                    var onlineServers = [];
                    var lowestPriorityServer;
                    //get all online servers
                    resultsArr.map(function(result) {
                        if (result.data.status >= 200 && result.data.status <= 299 && result.data.status !== -1) {
                            onlineServers.push(result);
                        }
                    });
                    //check if there are no online servers
                    if (angular.isUndefined(onlineServers) || onlineServers.length === 0) {
                        return reject('No online servers at the moment');
                    }
                    //get lowest priority online server
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
  