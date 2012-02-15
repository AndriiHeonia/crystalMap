describe("Crystal.Map", function()
{
    describe("constructor", function()
    {        
        it("should be correct initialized", function()
        {
            var myMap = new Crystal.Map('myMap');
            expect(myMap instanceof Crystal.Map).toBeTruthy();
          
            var myMap1 = new Crystal.Map(document.getElementById('myMap'));
            expect(myMap1 instanceof Crystal.Map).toBeTruthy();          
           
            var myMap2 = new Crystal.Map('myMap', new Crystal.GeoPoint(50, 50));
            expect(myMap2 instanceof Crystal.Map).toBeTruthy();
            
            var myMap3 = new Crystal.Map('myMap', new Crystal.GeoPoint(50, 50), 5);
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
            }).toThrow(new TypeError('Map constructor called with invalid center.'));            
        });

        it("should throw an error, because zoom is incorrect", function()
        {
            expect(function(){
                new Crystal.Map('myMap', new Crystal.GeoPoint(50, 50), '5');
            }).toThrow(new TypeError('Map constructor called with invalid zoom.'));            
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
            var center = new Crystal.GeoPoint(50, 50);
            var myMap = new Crystal.Map('myMap', center);
            expect(myMap.getCenter()).toEqual(center);            
        });

        it("should return correct center after map center setting", function()
        {
            var myMap = new Crystal.Map('myMap');            
            var center = new Crystal.GeoPoint(50, 50);
            myMap.setCenter(center);
            expect(myMap.getCenter()).toEqual(center);
        });

        it("should notify layers about map center changing", function()
        {
            var myMap = new Crystal.Map('myMap');
            var layer = new Crystal.Layers.Tile({
                url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                tileSize: 255,
                errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
            });
            spyOn(layer, 'onMapUpdate');
            myMap.addLayer(layer);
            myMap.setCenter(new Crystal.GeoPoint(50, 50));
            expect(layer.onMapUpdate).toHaveBeenCalled();
        });

        it("should throw an error, because center is incorrect", function()
        {
            expect(function(){
                var myMap = new Crystal.Map('myMap');            
                myMap.setCenter({});
            }).toThrow(new TypeError('setCenter method called with invalid center.'));            
        });        
    });
    
    describe("getZoom/setZoom", function()
    {
        it("should return correct zoom after initialization", function()
        {
            var myMap = new Crystal.Map('myMap', new Crystal.GeoPoint(50, 50), 5);
            expect(myMap.getZoom()).toEqual(5);            
        });

        it("should return correct zoom after map zoom setting", function()
        {
            var myMap = new Crystal.Map('myMap');            
            myMap.setZoom(5);
            expect(myMap.getZoom()).toEqual(5);
        });

        it("should notify layers about map zoom changing", function()
        {
            var myMap = new Crystal.Map('myMap');
            var layer = new Crystal.Layers.Tile({
                url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                tileSize: 255,
                errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
            });
            spyOn(layer, 'onMapUpdate');
            myMap.addLayer(layer);
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
    
    describe("addLayer", function()
    {
        it("should notify layers about addition to the map", function()
        {
            var myMap = new Crystal.Map('myMap');
            var layer = new Crystal.Layers.Tile({
                url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                tileSize: 255,
                errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
            });
            spyOn(layer, 'onAddToMap');            
            myMap.addLayer(layer);
            expect(layer.onAddToMap).toHaveBeenCalled();
        });
    });
    
    describe("removeLayer", function()
    {
        it("should notify layers about removing from the map", function()
        {
            var myMap = new Crystal.Map('myMap');
            var layer = new Crystal.Layers.Tile({
                url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                tileSize: 255,
                errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
            });
            spyOn(layer, 'onRemoveFromMap');
            myMap.addLayer(layer);
            myMap.removeLayer(layer);
            expect(layer.onRemoveFromMap).toHaveBeenCalled();
        });
    });    
});