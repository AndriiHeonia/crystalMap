define(['Projections/SphericalMercator'], function(Projections_SphericalMercator) {
    describe("Projections/SphericalMercator", function() {

        describe("getGroundResolution", function() {
            it("should return correct ground resolution", function() {
                expect(Projections_SphericalMercator.getGroundResolution(0, 512)).toEqual(78271.5169640205);
            });
        });
        
        describe("getViewPortStartInGlobalCoords", function() {
            it("should return correct view port start", function() {
            });
        });

    });
});