define(['Events/Map', 'Map'], function(Events_Map, Map) {
    describe("Events/Map", function() {
        
        describe("init", function() {
            it("should be correct initialized", function() {
                var myMap = new Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
                new Events_Map(myMap);
            });

            it("should throw an error, because map param is invalid", function() {
                expect(function() {
                    new Events_Map({});
                }).toThrow(new TypeError('Object passed to the initialize method of the Crystal.Events.Map class should be an instance of Crystal.Map.'));
            });
        });

        describe("map", function() {
            it("should return Map instance", function() {
                var myMap = new Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
                var mapEvent = new Events_Map(myMap);
                expect(mapEvent.map instanceof Map).toBeTruthy();
            });
        });

    });
});