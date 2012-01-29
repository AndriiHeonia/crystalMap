describe("Crystal.GeoPoint", function()
{
    describe("constructor", function()
    {        
        it("should be correct initialized", function()
        {
            var geoPoint = new Crystal.GeoPoint(50, 50);
            expect(geoPoint instanceof Crystal.GeoPoint).toBeTruthy();         
        });
        
        it("should throw an error, because lat is not a number", function()
        {
            expect(function() {
                new Crystal.GeoPoint('50', 50);
            }).toThrow(new ReferenceError('GeoPoint constructor called with invalid latitude.'));            
        });
        
        it("should throw an error, because lat is < -90", function()
        {
            expect(function() {
                new Crystal.GeoPoint(-91, 50);
            }).toThrow(new ReferenceError('GeoPoint constructor called with invalid latitude.'));            
        });        
        
        it("should throw an error, because lat is > 90", function()
        {
            expect(function() {
                new Crystal.GeoPoint(91, 50);
            }).toThrow(new ReferenceError('GeoPoint constructor called with invalid latitude.'));            
        });
        
        it("should throw an error, because lon is not a number", function()
        {
            expect(function() {
                new Crystal.GeoPoint(50, '50');
            }).toThrow(new ReferenceError('GeoPoint constructor called with invalid longitude.'));            
        });
        
        it("should throw an error, because lon is < -180", function()
        {
            expect(function() {
                new Crystal.GeoPoint(50, -181);
            }).toThrow(new ReferenceError('GeoPoint constructor called with invalid longitude.'));            
        });        
        
        it("should throw an error, because lon is > 180", function()
        {
            expect(function() {
                new Crystal.GeoPoint(50, 181);
            }).toThrow(new ReferenceError('GeoPoint constructor called with invalid longitude.'));            
        });        
    });
    
    describe("getLat", function()
    {
        it("should return correct lat", function()
        {
            var geoPoint = new Crystal.GeoPoint(30, 50);
            expect(geoPoint.getLat()).toEqual(30);
        });
    });
    
    describe("getLon", function()
    {
        it("should return correct lon", function()
        {
            var geoPoint = new Crystal.GeoPoint(30, 50);
            expect(geoPoint.getLon()).toEqual(50);
        });
    });    
});