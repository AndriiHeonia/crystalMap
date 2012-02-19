describe("Crystal.Events.Map", function()
{
    describe("initialize", function()
    {        
        it("should be correct initialized", function()
        {
            var myMap = new Crystal.Map('myMap', new Crystal.GeoPoint(55.028936234826, 82.927810142519), 15);
            new Crystal.Events.Map(myMap);
        });

        it("should throw an error, because map param is invalid", function()
        {
            expect(function() {
                new Crystal.Events.Map({});
            }).toThrow(new TypeError('Map event constructor called with invalid map object.'));            
        });        
    });
    
    describe("getMap", function()
    {        
        it("should return Crystal.Map instance", function()
        {
            var myMap = new Crystal.Map('myMap', new Crystal.GeoPoint(55.028936234826, 82.927810142519), 15);
            var mapEvent = new Crystal.Events.Map(myMap);
            expect(mapEvent.getMap() instanceof Crystal.Map).toBeTruthy();
        });
    });
});