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
});