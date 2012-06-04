define(['Projections/SphericalMercator'], function(Projections_SphericalMercator) {
    describe("Projections/SphericalMercator", function() {

        describe("getGroundResolution", function() {
            it("should return correct ground resolution", function() {
                expect(Projections_SphericalMercator.getGroundResolution(0, 512)).toEqual(78271.5169640205);
            });
        });
        
        describe("getViewPortStartInGlobalCoords", function() {
            it("should return correct view port start", function() {
                var viewPortSize = {
                    width: 1000,
                    height: 1000
                };
                var mapCenter = {
                    lat: 55.028,
                    lon: 82.927
                };
                var mapSize = 262144;
                var viewPortStart = Projections_SphericalMercator.getViewPortStartInGlobalCoords(viewPortSize, mapCenter, mapSize);
                
                expect(viewPortStart.x).toEqual(190958.0985777778);
                expect(viewPortStart.y).toEqual(82380.528092929);
            });
        });

        describe("projectToGlobalCoords", function() {
            var geoPoint = {
                lat: 55.028,
                lon: 82.927
            };
            var mapSize = 262144;
            var pixel = Projections_SphericalMercator.projectToGlobalCoords(geoPoint, mapSize);

            expect(pixel.x).toEqual(191458.0985777778);
            expect(pixel.y).toEqual(82880.528092929);
        });

        describe("unprojectFromGlobalCoors", function() {
            var pixel = {
                x: 191458.0985777778,
                y: 82880.52809292896
            };
            var mapSize = 262144;
            var geoPoint = Projections_SphericalMercator.unprojectFromGlobalCoords(pixel, mapSize);

            expect(geoPoint.lat).toEqual(55.0276064293);
            expect(geoPoint.lon).toEqual(82.9276866455);
        });

        describe("projectToViewPort", function() {
            var geoPoint = {
                lat: 55.031,
                lon: 82.931
            };
            var mapCenter = {
                lat: 55.028,
                lon: 82.927
            };
            var mapSize = 262144;
            var viewPortSize = {
                width: 1000,
                height: 1000
            };
            var pixel = Projections_SphericalMercator.projectToViewPort(geoPoint, mapCenter, mapSize, viewPortSize);

            expect(pixel.x).toEqual(502);
            expect(pixel.y).toEqual(496);
        });

        describe("unprojectFromViewPort", function() {
            var pixel = {
                x: 502,
                y: 496
            };
            var mapCenter = {
                lat: 55.028,
                lon: 82.927
            };
            var mapSize = 262144;
            var viewPortSize = {
                width: 1000,
                height: 1000
            };
            var geoPoint = Projections_SphericalMercator.unprojectFromViewPort(pixel, mapCenter, mapSize, viewPortSize);

            expect(geoPoint.lat).toEqual(55.0307548867);
            expect(geoPoint.lon).toEqual(82.9304332275);
        });

    });
});