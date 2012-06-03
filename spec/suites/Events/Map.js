define(['Events/Map', 'Map'], function(Events_Map, Map) {
    describe("Events/Map", function() {

        describe("init", function() {
            it("should be correct initialized", function() {
                var myMap = new Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
                new Events_Map(myMap);
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