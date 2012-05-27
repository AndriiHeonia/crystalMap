describe("Crystal.Validators.GeoPoint", function()
{
    describe("validate", function()
    {
        it("should throw an error, because geographic point is empty object", function()
        {
            expect(function(){
                Crystal.Validators.GeoPoint.validate({});
            }).toThrow(new Error('Geographic point latitude is invalid.'));
        });
        
        it("should throw an error, because latitude is not a number", function()
        {
            expect(function(){
                Crystal.Validators.GeoPoint.validate({lat: '50', lon: 50});
            }).toThrow(new Error('Geographic point latitude is invalid.'));
        });
        
        it("should throw an error, because longitude is not a number", function()
        {
            expect(function(){
                Crystal.Validators.GeoPoint.validate({lat: 50, lon: '50'});
            }).toThrow(new Error('Geographic point longitude is invalid.'));
        });

        it("should throw an error, because latitude is < -90", function()
        {
            expect(function(){
                Crystal.Validators.GeoPoint.validate({lat: -91, lon: 50});
            }).toThrow(new Error('Geographic point latitude is invalid.'));
        });

        it("should throw an error, because latitude is > 90", function()
        {
            expect(function(){
                Crystal.Validators.GeoPoint.validate({lat: 91, lon: 50});
            }).toThrow(new Error('Geographic point latitude is invalid.'));
        });
        
        it("should throw an error, because longitude is < -180", function()
        {
            expect(function(){
                Crystal.Validators.GeoPoint.validate({lat: 50, lon: -181});
            }).toThrow(new Error('Geographic point longitude is invalid.'));
        });

        it("should throw an error, because longitude is > 180", function()
        {
            expect(function(){
                Crystal.Validators.GeoPoint.validate({lat: 50, lon: 181});
            }).toThrow(new Error('Geographic point longitude is invalid.'));
        });
    });
});