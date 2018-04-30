(function() {
    'use strict';
  
    describe('service findServer', function() {
      var findServer;
      var $httpBackend;
  
      beforeEach(module('boldAngularTest'));
      beforeEach(inject(function(_findServer_, $injector) {
        findServer = _findServer_;
        $httpBackend = $injector.get('$httpBackend');
      }));
  
      it('should be registered', function() {
        expect(findServer).not.toEqual(null);
      });
  
      describe('findServer function', function() {
        it('should exist', function() {
          expect(findServer.findServer).not.toEqual(null);
        });

        it('should return lowest priority online server', function() {
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
            findServer.findServer(servers).then(function(lowestPriorityServer) {
                expect(lowestPriorityServer).toEqual(servers[3]);
                expect(lowestPriorityServer.priority).toEqual(servers[3].priority);
            })
        });
      });

    });
  })();
  