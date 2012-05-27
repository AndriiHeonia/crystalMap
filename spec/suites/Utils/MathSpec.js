describe("Crystal.Utils.Math", function()
{
    describe("degreesToRadians", function()
    {
        it("should be converted correct", function()
        {
            expect(Crystal.Utils.Math.degreesToRadians(1)).toEqual(0.0174532925);
        });
    });
    
    describe("radiansToDegrees", function()
    {
        it("should be converted correct", function()
        {
            expect(Crystal.Utils.Math.radiansToDegrees(1)).toEqual(57.2957795131);
        });
    });
});