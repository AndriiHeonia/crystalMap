define(['Layers/Tile'], function(Layers_Tile) {
    describe("Layers/Tile", function() {

        describe("init", function() {
            it("should be correct initialized", function() {
                new Layers_Tile({
                    url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                    subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                    tileSize: 255,
                    errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
                });
            });

            it("should throw an error, because options hasn't been passed", function() {
                expect(function() {
                    new Layers_Tile();
                }).toThrow(new ReferenceError('Value passed to init method of the Layers/Tile should not be Undefined.'));
            });
            
            it("should throw an error, because url option is invalid", function() {
                expect(function() {
                    new Layers_Tile({
                        url: 999,
                        subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                        tileSize: 255,
                        errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
                    });
                }).toThrow(new TypeError('Value 999 passed to init method of the Layers/Tile should be a String.'));
            });
            
            it("should throw an error, because subdomains option is not an array", function() {
                expect(function() {
                    new Layers_Tile({
                        url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                        subdomains: 'qwerty',
                        tileSize: 255,
                        errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
                    });
                }).toThrow(new TypeError('Value qwerty passed to init method of the Layers/Tile should be an Array.'));
            });
            
            it("should throw an error, because subdomains array is empty", function() {
                expect(function() {
                    new Layers_Tile({
                        url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                        subdomains: [],
                        tileSize: 255,
                        errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
                    });
                }).toThrow(new RangeError('Number 0 passed to init method of the Layers/Tile should be more than 0.'));
            });
            
            it("should throw an error, because tileSize option is invalid", function() {
                expect(function() {
                    new Layers_Tile({
                        url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                        subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                        tileSize: '255',
                        errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
                    });
                }).toThrow(new TypeError('Value 255 passed to init method of the Layers/Tile should be a Number.'));
            });
            
            it("should throw an error, because errorTileUrl option is invalid", function() {
                expect(function() {
                    new Layers_Tile({
                        url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
                        subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
                        tileSize: 255,
                        errorTileUrl: 666
                    });
                }).toThrow(new TypeError('Value 666 passed to init method of the Layers/Tile should be a String.'));
            });
        });

    });
});