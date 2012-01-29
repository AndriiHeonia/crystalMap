describe("Crystal.Pixel", function()
{
    describe("constructor", function()
    {
        it("should be correct initialized", function()
        {
            var pixel = new Crystal.Pixel(50, 50);
            expect(pixel instanceof Crystal.Pixel).toBeTruthy();         
        });
        
        it("should throw an error, because x is not a number", function()
        {
            expect(function() {
                new Crystal.Pixel('50', 50);
            }).toThrow(new TypeError('Pixel constructor called with invalid x.'));            
        });
        
        it("should throw an error, because y is not a number", function()
        {
            expect(function() {
                new Crystal.Pixel(50, '50');
            }).toThrow(new TypeError('Pixel constructor called with invalid y.'));            
        });
    });
    
    describe("getX", function()
    {
        it("should return correct x", function()
        {
            var pixel = new Crystal.Pixel(30, 50);
            expect(pixel.getX()).toEqual(30);
        });
    });
    
    describe("getY", function()
    {
        it("should return correct y", function()
        {
            var pixel = new Crystal.Pixel(30, 50);
            expect(pixel.getY()).toEqual(50);
        });
    });    
});