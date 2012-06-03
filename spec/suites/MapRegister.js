define(['MapRegister', 'Map'], function(MapRegister, Map) {
    describe("MapRegister", function() {

        describe("add/get/remove", function() {
            it("map should be added to register on initialization, returned and removed", function() {
                var myMap = new Map('myMap');
                            
                expect(MapRegister.get('myMap')).toEqual(myMap);
                
                MapRegister.remove('myMap');
                
                expect(MapRegister.get('myMap')).toEqual(null);
            });
        });
        
        describe("getItems", function() {
            it("all registered maps should be returned", function() {
                var myMap = new Map('myMap');
                var myMap1 = new Map('myMap1');
                
                var items = MapRegister.getItems();
                
                expect(items['myMap']).toEqual(myMap);
                expect(items['myMap1']).toEqual(myMap1);
            });
        });

        describe("getItemByDomElement", function() {
            it("should return map instance, because DOM element is map container", function() {
                var myMap = new Map('myMap');
                var mapContainer = myMap.container;
                
                expect(MapRegister.getItemByDomElement(mapContainer)).toEqual(myMap);
            });
            
            it("should return map instance, because DOM element is inside map container", function() {
                var myMap = new Map('myMap');
                var myChild = document.createElement('div');
                
                myMap.container.appendChild(myChild);
                
                expect(MapRegister.getItemByDomElement(myChild)).toEqual(myMap);
            });
            
            it("should return null, because DOM element is not inside map container", function() {
                new Map('myMap');
                var myNotChild = document.createElement('div');
                
                document.getElementById('myMap1').appendChild(myNotChild);
                
                expect(MapRegister.getItemByDomElement(myNotChild)).toEqual(null);
            });
        });

    });
});