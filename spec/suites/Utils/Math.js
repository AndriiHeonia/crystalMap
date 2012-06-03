define(['Utils/Math'], function(Utils_Math) {
    describe("Utils/Math", function() {

        describe("degreesToRadians", function() {
            it("should be converted correct", function() {
                expect(Utils_Math.degreesToRadians(1)).toEqual(0.0174532925);
            });
        });
        
        describe("radiansToDegrees", function() {
            it("should be converted correct", function() {
                expect(Utils_Math.radiansToDegrees(1)).toEqual(57.2957795131);
            });
        });

        describe("clip", function() {
            it("should clip number by min value", function() {
                expect(Utils_Math.clip(-90, -85, 85)).toEqual(-85);
            });

            it("should clip number by max value", function() {
                expect(Utils_Math.clip(90, -85, 85)).toEqual(85);
            });
        });
        
    });
});