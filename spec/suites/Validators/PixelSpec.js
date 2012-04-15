describe("Crystal.Validators.Pixel", function()
{
    describe("validate", function()
    {
        it("should throw an error, because pixel is empty object", function()
        {
            expect(function(){
                Crystal.Validators.Pixel.validate({});
            }).toThrow(new TypeError('Pixel x coordinate is invalid.'));            
        });
        
        it("should throw an error, because x is not a number", function()
        {
            expect(function(){
                Crystal.Validators.Pixel.validate({x: '50', y: 50});
            }).toThrow(new TypeError('Pixel x coordinate is invalid.'));            
        });        
        
        it("should throw an error, because y is not a number", function()
        {
            expect(function(){
                Crystal.Validators.Pixel.validate({x: 50, y: '50'});
            }).toThrow(new TypeError('Pixel y coordinate is invalid.'));            
        });        
    });
});