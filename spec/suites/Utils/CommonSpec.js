describe("Crystal.Utils.Common", function()
{
    describe("createUniqueId", function()
    {
        it("should return correct id", function()
        {
            var id = Crystal.Utils.Common.createUniqueId();
            expect(Object.prototype.toString.call(id)).toEqual('[object String]');
        });
        
        it("should return correct id with prefix", function()
        {
            var id = Crystal.Utils.Common.createUniqueId('myPrefix');
            expect(id).toContain('myPrefix_');
        });
    });
    
    describe("bind", function()
    {
        it("should bind function to the object", function()
        {
            var dog = {
                noise: "Ruff!"
            };

            function makeNoise() {
                return this.noise;
            }

            expect(makeNoise()).toEqual(undefined);
            expect(Crystal.Utils.Common.bind(dog, makeNoise)()).toEqual("Ruff!");
        });
    });

    describe("clip", function()
    {
        it("should clip number by min value", function()
        {
            expect(Crystal.Utils.Common.clip(-90, -85, 85)).toEqual(-85);
        });

        it("should clip number by max value", function()
        {
            expect(Crystal.Utils.Common.clip(90, -85, 85)).toEqual(85);
        });        
    });
});