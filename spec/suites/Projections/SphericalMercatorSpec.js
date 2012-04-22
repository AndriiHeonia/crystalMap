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
            
            expect(point.x).toEqual(4187591.89173);
            expect(point.y).toEqual(7509137.5811);   
        });
    });
    
    describe("unproject", function()
    {
        it("Spherical Mercator point should be unprojected", function()
        {
            var point = {
                x: 4187591.89173,
                y: 7509137.5811
            }
            var geoPoint = Crystal.Projections.SphericalMercator.unproject(point);
            
            expect(geoPoint.lat).toEqual(55.75167);
            expect(geoPoint.lon).toEqual(37.61778);   
        });
    });    
});