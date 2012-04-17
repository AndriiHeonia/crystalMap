describe("Crystal.Events.Map", function()
{
    describe("initialize", function()
    {        
        it("should be correct initialized", function()
        {
            var myMap = new Crystal.Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
            new Crystal.Events.Map(myMap);
        });

        it("should throw an error, because map param is invalid", function()
        {
            expect(function() {
                new Crystal.Events.Map({});
            }).toThrow(new TypeError('Object passed to the initialize method of the Crystal.Events.Map class should be an instance of Crystal.Map.'));            
        });        
    });
    
    describe("getMap", function()
    {        
        it("should return Crystal.Map instance", function()
        {
            var myMap = new Crystal.Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
            var mapEvent = new Crystal.Events.Map(myMap);
            expect(mapEvent.getMap() instanceof Crystal.Map).toBeTruthy();
        });
    });
});