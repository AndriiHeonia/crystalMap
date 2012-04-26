describe("Crystal.MapRegister", function()
{
    describe("add/get/remove", function()
    {
        it("map should be added to register on initialization, returned and removed", function()
        {
            var myMap = new Crystal.Map('myMap');
                        
            expect(Crystal.MapRegister.get('myMap')).toEqual(myMap);
            
            Crystal.MapRegister.remove('myMap');
            
            expect(Crystal.MapRegister.get('myMap')).toEqual(null);
        });
    });
    
    describe("getItems", function()
    {
        it("all registered maps should be returned", function()
        {
            var myMap = new Crystal.Map('myMap');
            var myMap1 = new Crystal.Map('myMap1');
            
            var items = Crystal.MapRegister.getItems();
            
            expect(items['myMap']).toEqual(myMap);
            expect(items['myMap1']).toEqual(myMap1);
        });
    });

    describe("getItemByDomElement", function()
    {
        it("should return map instance, because DOM element is map container", function()
        {
            var myMap = new Crystal.Map('myMap');
            var mapContainer = myMap.getContainer();
            
            expect(Crystal.MapRegister.getItemByDomElement(mapContainer)).toEqual(myMap);
        });
        
        it("should return map instance, because DOM element is inside map container", function()
        {
            var myMap = new Crystal.Map('myMap');
            var myChild = document.createElement('div');
            
            myMap.getContainer().appendChild(myChild);
            
            expect(Crystal.MapRegister.getItemByDomElement(myChild)).toEqual(myMap);
        });
        
        it("should return null, because DOM element is not inside map container", function()
        {
            new Crystal.Map('myMap');
            var myNotChild = document.createElement('div');
            
            document.getElementById('myMap1').appendChild(myNotChild);
            
            expect(Crystal.MapRegister.getItemByDomElement(myNotChild)).toEqual(null);
        });        
    });
});