define(['Map', 'Events/Drag'], function(Map, Events_Drag) {
    describe("Events/Drag", function() {

        describe("getIsOutOfMap", function() {
            it("should return true if object is outside left map side", function() {
                var myMap = new Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
                Events_Drag.map = myMap;
                Events_Drag.startPixel = Events_Drag.currentPixel = {
                    x: -1,
                    y: 5
                };
 
                expect(Events_Drag.getIsOutOfMap()).toBeTruthy();
            });

            it("should return true if object is outside right map side", function() {
                var myMap = new Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
                Events_Drag.map = myMap;
                Events_Drag.startPixel = Events_Drag.currentPixel = {
                    x: 2000,
                    y: 5
                };
 
                expect(Events_Drag.getIsOutOfMap()).toBeTruthy();
            });

            it("should return true if object is outside top map side", function() {
                var myMap = new Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
                Events_Drag.map = myMap;
                Events_Drag.startPixel = Events_Drag.currentPixel = {
                    x: 2,
                    y: -5
                };
 
                expect(Events_Drag.getIsOutOfMap()).toBeTruthy();
            });

            it("should return true if object is outside bottom map side", function() {
                var myMap = new Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
                Events_Drag.map = myMap;
                Events_Drag.startPixel = Events_Drag.currentPixel = {
                    x: 2,
                    y: 2000
                };
 
                expect(Events_Drag.getIsOutOfMap()).toBeTruthy();
            });

            it("should return false if object is in the map", function() {
                var myMap = new Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
                Events_Drag.map = myMap;
                Events_Drag.startPixel = Events_Drag.currentPixel = {
                    x: 1,
                    y: 1
                };
 
                expect(Events_Drag.getIsOutOfMap()).toBeFalsy();
            });

            it("should return false if object is in the map border", function() {
                var myMap = new Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
                Events_Drag.map = myMap;
                Events_Drag.startPixel = Events_Drag.currentPixel = {
                    x: 0,
                    y: 0
                };
 
                expect(Events_Drag.getIsOutOfMap()).toBeFalsy();
            });
        });

    });
});