describe("Crystal.Map", function()
{
    describe("initialize", function()
    {        
        it("should be correct initialized", function()
        {
            var myMap = new Crystal.Map('myMap');
            expect(myMap instanceof Crystal.Map).toBeTruthy();
          
            var myMap1 = new Crystal.Map(document.getElementById('myMap'));
            expect(myMap1 instanceof Crystal.Map).toBeTruthy();          
           
            var myMap2 = new Crystal.Map('myMap', {lat: 50, lon: 50});
            expect(myMap2 instanceof Crystal.Map).toBeTruthy();
            
            var myMap3 = new Crystal.Map('myMap', {lat: 50, lon: 50}, 5);
            expect(myMap3 instanceof Crystal.Map).toBeTruthy();           
        });

        it("should throw an error, because container id is incorrect", function()
        {
            expect(function(){
                new Crystal.Map('incorrectId');
            }).toThrow(new ReferenceError('Map constructor called with invalid container id.'));            
        });
        
        it("should throw an error, because DOM element is incorrect", function()
        {
            expect(function(){
                new Crystal.Map({});
            }).toThrow(new TypeError('Map constructor called with invalid container DOM element.'));            
        });
        
        it("should throw an error, because center is incorrect", function()
        {
            expect(function(){
                new Crystal.Map('myMap', {});
            }).toThrow(new Error('Geographic point latitude is invalid.'));            
        });

        it("should throw an error, because zoom is incorrect", function()
        {
            expect(function(){
                new Crystal.Map('myMap', {lat: 50, lon:50}, '5');
            }).toThrow(new TypeError('Map constructor called with invalid zoom.'));            
        });
    });
    
    describe("getEventObject", function()
    {
        it("should return Crystal.Events.Map instance", function()
        {
            var myMap = new Crystal.Map('myMap');
            expect(myMap.getEventObject() instanceof Crystal.Events.Map).toBeTruthy();
        });
    });
    
    describe("registerEvent", function()
    {
        it("should not throw any errors", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            myMap.registerEvent(['MyEvent1', 'MyEvent2']);
        });
        
        it("should throw an error, because event name is incorrect", function()
        {
            var myMap = new Crystal.Map('myMap');
            expect(function(){
                myMap.registerEvent({});
            }).toThrow(new TypeError('registerEvent method called with invalid event name(s).'));  
        });        
    });

    describe("addListener", function()
    {
        it("should not throw any errors", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            myMap.addListener('MyEvent', function() {});
        });
        
        it("should throw an error, because event name is incorrect", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            expect(function(){
                myMap.addListener({}, function() {});
            }).toThrow(new TypeError('addListener method called with invalid event name.'));  
        });

        it("should throw an error, because event hasn't been registered", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            expect(function(){
                myMap.addListener('MyEvent1', function(){});
            }).toThrow(new TypeError('addListener method called with invalid event name.'));  
        });

        it("should throw an error, because handler is incorrect", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            expect(function(){
                myMap.addListener('MyEvent', {});
            }).toThrow(new TypeError('addListener method called with invalid handler.'));  
        });
    });

    describe("removeListener", function()
    {
        it("should not throw any errors", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            var myHandler = function(){}
            myMap.addListener('MyEvent', myHandler);
            myMap.removeListener('MyEvent', myHandler);
        });
        
        it("should throw an error, because event name is incorrect", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            myMap.addListener('MyEvent', function(){});
            expect(function(){
                myMap.removeListener({}, function(){});
            }).toThrow(new TypeError('removeListener method called with invalid event name.'));  
        });

        it("should throw an error, because event hasn't been registered", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            myMap.addListener('MyEvent', function(){});
            expect(function(){
                myMap.removeListener('MyEvent1', function(){});
            }).toThrow(new TypeError('removeListener method called with invalid event name.'));  
        });
        
        it("should throw an error, because handler hasn't been registered", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            var myHandler = function(){}
            var myHandler1 = function(){}
            myMap.addListener('MyEvent', myHandler);
            expect(function(){
                myMap.removeListener('MyEvent', myHandler1);
            }).toThrow(new TypeError('removeListener method called with invalid handler.'));  
        });        
    });

    describe("fireEvent", function()
    {
        it("should fire an event handler", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            
            var Klass = {};
            Klass.staticMethod = function(){};
            spyOn(Klass, 'staticMethod');

            myMap.addListener('MyEvent', Klass.staticMethod);
            myMap.fireEvent('MyEvent');
            
            expect(Klass.staticMethod).toHaveBeenCalled();
        });
        
        it("should throw an error, because event name is incorrect", function()
        {
            var myMap = new Crystal.Map('myMap');
            myMap.registerEvent('MyEvent');
            expect(function(){
                myMap.fireEvent('MyUnregisteredEvent');
            }).toThrow(new TypeError('fireEvent method called with invalid event name.'));  
        });        
    });

    describe("getContainer", function()
    {
        it("should return correct DOM element", function()
        {
            var myMap = new Crystal.Map('myMap');
            expect(myMap.getContainer().nodeType).toEqual(1);
            
            var myMap1 = new Crystal.Map(document.getElementById('myMap'));
            expect(myMap1.getContainer().nodeType).toEqual(1);            
        });
    });
    
    describe("getCenter/setCenter", function()
    {
        it("should return correct center after initialization", function()
        {
            var center = {lat: 50, lon: 50};
            var myMap = new Crystal.Map('myMap', center);
            expect(myMap.getCenter()).toEqual(center);            
        });

        it("should return correct center after map center setting", function()
        {
            var myMap = new Crystal.Map('myMap');            
            var center = {lat: 50, lon: 50};
            myMap.setCenter(center);
            expect(myMap.getCenter()).toEqual(center);
        });

        it("should notify observers about map center changing", function()
        {
            var myMap = new Crystal.Map('myMap');
            var layer = new Crystal.Layers.Tile({
                url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                tileSize: 255,
                errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
            });
            spyOn(layer, 'onMapUpdate');
            myMap.add(layer);
            myMap.setCenter({lat: 50, lon: 50});
            expect(layer.onMapUpdate).toHaveBeenCalled();
        });

        it("should throw an error, because center is incorrect", function()
        {
            expect(function(){
                var myMap = new Crystal.Map('myMap');            
                myMap.setCenter({});
            }).toThrow(new Error('Geographic point latitude is invalid.'));            
        });
    });
    
    describe("getZoom/setZoom", function()
    {
        it("should return correct zoom after initialization", function()
        {
            var myMap = new Crystal.Map('myMap', {lat: 50, lon: 50}, 5);
            expect(myMap.getZoom()).toEqual(5);            
        });

        it("should return correct zoom after map zoom setting", function()
        {
            var myMap = new Crystal.Map('myMap');            
            myMap.setZoom(5);
            expect(myMap.getZoom()).toEqual(5);
        });

        it("should notify observers about map zoom changing", function()
        {
            var myMap = new Crystal.Map('myMap');
            var layer = new Crystal.Layers.Tile({
                url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                tileSize: 255,
                errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
            });
            spyOn(layer, 'onMapUpdate');
            myMap.add(layer);
            myMap.setZoom(5);
            expect(layer.onMapUpdate).toHaveBeenCalled();
        });

        it("should throw an error, because zoom is incorrect", function()
        {
            expect(function(){
                var myMap = new Crystal.Map('myMap');            
                myMap.setZoom('5');
            }).toThrow(new TypeError('setZoom method called with invalid zoom.'));            
        });
    });
    
    describe("add", function()
    {
        it("should notify observers about addition to the map", function()
        {
            var myMap = new Crystal.Map('myMap');
            var layer = new Crystal.Layers.Tile({
                url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                tileSize: 255,
                errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
            });
            spyOn(layer, 'onAddToMap');            
            myMap.add(layer);
            expect(layer.onAddToMap).toHaveBeenCalled();
        });
        
        it("should throw an error, because observer is incorrect", function()
        {
            expect(function(){
                var myMap = new Crystal.Map('myMap');            
                myMap.add({});
            }).toThrow('Object does not implement the "IMapObserver" interface. Method "onMapUpdate" was not found.');            
        });    
    });
    
    describe("remove", function()
    {
        it("should notify observers about removing from the map", function()
        {
            var myMap = new Crystal.Map('myMap');
            var layer = new Crystal.Layers.Tile({
                url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                tileSize: 255,
                errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
            });
            spyOn(layer, 'onRemoveFromMap');
            myMap.add(layer);
            myMap.remove(layer);
            expect(layer.onRemoveFromMap).toHaveBeenCalled();
        });
    });
});