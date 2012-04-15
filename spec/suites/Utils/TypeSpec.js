describe("Crystal.Utils.Type", function()
{
    describe("isString", function()
    {
        it("should be checked correct", function()
        {
            expect(Crystal.Utils.Type.isString('123')).toBeTruthy();
            expect(Crystal.Utils.Type.isString(123)).toBeFalsy();            
        });        
    });

    describe("isNumber", function()
    {
        it("should be checked correct", function()
        {
            expect(Crystal.Utils.Type.isNumber(123.5)).toBeTruthy();
            expect(Crystal.Utils.Type.isNumber(123)).toBeTruthy();
            expect(Crystal.Utils.Type.isNumber('123')).toBeFalsy();            
        });        
    });

    describe("isBoolean", function()
    {
        it("should be checked correct", function()
        {
            expect(Crystal.Utils.Type.isBoolean(true)).toBeTruthy();
            expect(Crystal.Utils.Type.isBoolean(false)).toBeTruthy();
            expect(Crystal.Utils.Type.isBoolean('true')).toBeFalsy();
        });        
    });

    describe("isArray", function()
    {
        it("should be checked correct", function()
        {
            expect(Crystal.Utils.Type.isArray([1, 2, 3])).toBeTruthy();
            expect(Crystal.Utils.Type.isArray('1, 2, 3')).toBeFalsy();
        });        
    });

    describe("isUndefined", function()
    {
        it("should be checked correct", function()
        {
            expect(Crystal.Utils.Type.isUndefined(undefined)).toBeTruthy();
            expect(Crystal.Utils.Type.isUndefined('undefined')).toBeFalsy();
            expect(Crystal.Utils.Type.isUndefined(null)).toBeFalsy();
            expect(Crystal.Utils.Type.isUndefined('')).toBeFalsy();
        });        
    });    
});