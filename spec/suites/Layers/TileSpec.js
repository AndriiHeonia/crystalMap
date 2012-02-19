describe("Crystal.Layers.Tile", function()
{
    describe("initialize", function()
    {        
        it("should be correct initialized", function()
        {
            new Crystal.Layers.Tile({
                url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                tileSize: 255,
                errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
            });            
        });

        it("should throw an error, because options hasn't been passed", function()
        {
            expect(function() {
                new Crystal.Layers.Tile(); 
            }).toThrow(new ReferenceError('Tile layer constructor called without options.'));            
        });
        
        it("should throw an error, because url option is invalid", function()
        {
            expect(function() {
                new Crystal.Layers.Tile({
                    url: {},
                    subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                    tileSize: 255,
                    errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'                    
                }); 
            }).toThrow(new TypeError('Tile layer constructor called with invalid url option.'));            
        });
        
        it("should throw an error, because subdomains option is not an array", function()
        {
            expect(function() {
                new Crystal.Layers.Tile({
                    url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                    subdomains: '',
                    tileSize: 255,
                    errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'                    
                }); 
            }).toThrow(new TypeError('Tile layer constructor called with invalid subdomains option.'));            
        });
        
        it("should throw an error, because subdomains array is empty", function()
        {
            expect(function() {
                new Crystal.Layers.Tile({
                    url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                    subdomains: [],
                    tileSize: 255,
                    errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'                    
                }); 
            }).toThrow(new TypeError('Tile layer constructor called with invalid subdomains option.'));            
        });
        
        it("should throw an error, because tileSize option is invalid", function()
        {
            expect(function() {
                new Crystal.Layers.Tile({
                    url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                    subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                    tileSize: '255',
                    errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'                    
                }); 
            }).toThrow(new TypeError('Tile layer constructor called with invalid tileSize option.'));            
        });
        
        it("should throw an error, because errorTileUrl option is invalid", function()
        {
            expect(function() {
                new Crystal.Layers.Tile({
                    url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                    subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                    tileSize: 255,
                    errorTileUrl: 666                   
                }); 
            }).toThrow(new TypeError('Tile layer constructor called with invalid errorTileUrl option.'));            
        });        
    });
});