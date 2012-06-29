define(['Map', 'Events/Map', 'Vendors/PubSub'], function(Map, Events_Map, Vendors_PubSub) {
    describe("Map", function() {

        describe("init", function() {
            it("should be correct initialized", function() {
                var myMap = new Map('myMap');
                expect(myMap instanceof Map).toBeTruthy();
              
                var myMap1 = new Map(document.getElementById('myMap'));
                expect(myMap1 instanceof Map).toBeTruthy();
               
                var myMap2 = new Map('myMap', {lat: 50, lon: 50});
                expect(myMap2 instanceof Map).toBeTruthy();
                
                var myMap3 = new Map('myMap', {lat: 50, lon: 50}, 5);
                expect(myMap3 instanceof Map).toBeTruthy();
            });

            it("should throw an error, because container id is incorrect", function() {
                expect(function(){
                    new Map('incorrectId');
                }).toThrow(new ReferenceError('Value passed to initialize method of the Map should not be Null.'));
            });
            
            it("should throw an error, because DOM element is incorrect", function() {
                expect(function(){
                    new Map(666);
                }).toThrow(new TypeError('Value 666 passed to initialize method of the Map should be a DOM element.'));
            });
            
            it("should throw an error, because center is incorrect", function() {
                expect(function(){
                    new Map('myMap', {});
                }).toThrow(new Error('Geographic point latitude is invalid.'));
            });

            it("should throw an error, because zoom is incorrect", function() {
                expect(function(){
                    new Map('myMap', {lat: 50, lon:50}, '5');
                }).toThrow(new TypeError('Value 5 passed to initialize method of the Map should be a Number.'));
            });
        });
        
        describe("getEventObject", function() {
            it("should return Events/Map instance", function() {
                var myMap = new Map('myMap');
                expect(myMap.getEventObject() instanceof Events_Map).toBeTruthy();
            });
        });
        
        describe("container", function() {
            it("should return correct DOM element", function() {
                var myMap = new Map('myMap');
                expect(myMap.container.nodeType).toEqual(1);
                
                var myMap1 = new Map(document.getElementById('myMap'));
                expect(myMap1.container.nodeType).toEqual(1);
            });
        });
        
        describe("getCenter/setCenter", function() {
            it("should return correct center after initialization", function() {
                var center = {lat: 50, lon: 50};
                var myMap = new Map('myMap', center);
                expect(myMap.getCenter()).toEqual(center);
            });

            it("should return correct center after map center setting", function() {
                var myMap = new Map('myMap');
                var center = {lat: 50, lon: 50};
                myMap.setCenter(center);
                expect(myMap.getCenter()).toEqual(center);
            });

            it("should notify observers about map center changing", function() {
                function MyObserver() {
                    this.onAddToMap = function() {};
                    this.onRemoveFromMap = function() {};
                    this.onZoomChanging = function() {};
                    this.onCenterChanging = function() {};
                }
                var myObserver = new MyObserver();
                var myMap = new Map('myMap');
                
                spyOn(myObserver, 'onCenterChanging');
                
                myMap.add(myObserver);
                Vendors_PubSub.subscribe('Map/OnCenterChange', myObserver.onCenterChanging);
                myMap.setCenter({lat: 50, lon: 50});

                expect(myObserver.onCenterChanging).toHaveBeenCalled();
            });

            it("should throw an error, because center is incorrect", function() {
                expect(function(){
                    var myMap = new Map('myMap');
                    myMap.setCenter({});
                }).toThrow(new Error('Geographic point latitude is invalid.'));
            });
        });

        describe("getZoom/setZoom", function() {
            it("should return correct zoom after initialization", function() {
                var myMap = new Map('myMap', {lat: 50, lon: 50}, 5);
                expect(myMap.getZoom()).toEqual(5);
            });

            it("should return correct zoom after map zoom setting", function() {
                var myMap = new Map('myMap');
                myMap.setZoom(5);
                expect(myMap.getZoom()).toEqual(5);
            });

            it("should notify observers about map zoom changing", function() {
                function MyObserver() {
                    this.onAddToMap = function() {};
                    this.onRemoveFromMap = function() {};
                    this.onZoomChanging = function() {};
                    this.onCenterChanging = function() {};
                }
                var myObserver = new MyObserver();
                var myMap = new Map('myMap');
                
                spyOn(myObserver, 'onZoomChanging');
                
                myMap.add(myObserver);
                Vendors_PubSub.subscribe('Map/OnZoomChange', myObserver.onZoomChanging);
                myMap.setZoom(5);

                expect(myObserver.onZoomChanging).toHaveBeenCalled();
            });

            it("should throw an error, because zoom is incorrect", function() {
                expect(function(){
                    var myMap = new Map('myMap');
                    myMap.setZoom('5');
                }).toThrow(new TypeError('Value 5 passed to setZoom method of the Map should be a Number.'));
            });
        });

        describe("add", function() {
            it("should notify observers about addition to the map", function() {
                function MyObserver() {
                    this.onAddToMap = function() {};
                    this.onRemoveFromMap = function() {};
                    this.onZoomChanging = function() {};
                    this.onCenterChanging = function() {};
                }
                var myObserver = new MyObserver();
                var myMap = new Map('myMap');
                
                spyOn(myObserver, 'onAddToMap');

                myMap.add(myObserver);

                expect(myObserver.onAddToMap).toHaveBeenCalled();
            });
            
            it("should throw an error, because observer is incorrect", function() {
                expect(function(){
                    var myMap = new Map('myMap');
                    myMap.add({});
                }).toThrow('Object does not implement the "Interfaces/MapObserver" interface. Method "onAddToMap" was not found.');
            });
        });
        
        describe("remove", function() {
            it("should notify observers about removing from the map", function() {
                function MyObserver() {
                    this.onAddToMap = function() {};
                    this.onRemoveFromMap = function() {};
                    this.onZoomChanging = function() {};
                    this.onCenterChanging = function() {};
                }
                var myObserver = new MyObserver();
                var myMap = new Map('myMap');
                
                spyOn(myObserver, 'onRemoveFromMap');

                myMap.add(myObserver);
                myMap.remove(myObserver);
                
                expect(myObserver.onRemoveFromMap).toHaveBeenCalled();
            });

            it("should throw an error, because observer is incorrect", function() {
                expect(function(){
                    var myMap = new Map('myMap');
                    myMap.remove({});
                }).toThrow('Object does not implement the "Interfaces/MapObserver" interface. Method "onAddToMap" was not found.');
            });
        });

        describe("destroy", function() {
            it("should notify observers about removing from the map", function() {
                function MyObserver() {
                    this.onAddToMap = function() {};
                    this.onRemoveFromMap = function() {};
                    this.onZoomChanging = function() {};
                    this.onCenterChanging = function() {};
                }
                var myObserver1 = new MyObserver();
                var myObserver2 = new MyObserver();
                var myMap = new Map('myMap');

                spyOn(myObserver1, 'onRemoveFromMap');
                spyOn(myObserver2, 'onRemoveFromMap');

                myMap.add(myObserver1);
                myMap.add(myObserver2);

                myMap.destroy();

                expect(myObserver1.onRemoveFromMap).toHaveBeenCalled();
                expect(myObserver2.onRemoveFromMap).toHaveBeenCalled();
            });
        });

    });
});