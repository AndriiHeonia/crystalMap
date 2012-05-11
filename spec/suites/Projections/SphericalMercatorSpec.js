describe("Crystal.Projections.SphericalMercator", function()
{
    describe("project", function()
    {
        it("geographic point should be projected", function()
        {
            var geoPoint = {
                lat: 55.751667,
                lon: 37.617778
            }
            var point = Crystal.Projections.SphericalMercator.project(geoPoint);
            
            expect(point.x).toEqual(4187591.8918346255);
            expect(point.y).toEqual(7509137.580813028);   
        });

        it("geographic point should be clipped by min latitude and projected", function()
        {
            var geoPoint = {
                lat: -90,
                lon: -180
            }
            var point = Crystal.Projections.SphericalMercator.project(geoPoint);
            
            expect(point.x).toEqual(-20037508.342854343);
            expect(point.y).toEqual(-20037508.3394376);   
        });

        it("geographic point should be clipped by max latitude and projected", function()
        {
            var geoPoint = {
                lat: 90,
                lon: 180
            }
            var point = Crystal.Projections.SphericalMercator.project(geoPoint);
            
            expect(point.x).toEqual(20037508.342854343);
            expect(point.y).toEqual(20037508.339437574);   
        });
    });
    
    describe("unproject", function()
    {
        it("spherical Mercator point should be unprojected", function()
        {
            var point = {
                x: 4187591.89173,
                y: 7509137.5811
            }
            var geoPoint = Crystal.Projections.SphericalMercator.unproject(point);
            
            expect(geoPoint.lat).toEqual(55.751667);
            expect(geoPoint.lon).toEqual(37.617778);   
        });
    });

    describe("getGroundResolution", function()
    {
        it("should return correct ground resolution", function()
        {            
            expect(Crystal.Projections.SphericalMercator.getGroundResolution(0, 512)).toEqual(78271.5169640205);
        });
    });      
});