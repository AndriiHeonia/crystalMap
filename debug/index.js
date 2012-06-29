/**
 * Crystal Map 0.1 Copyright (c) 2012, Andrey Geonya All Rights Reserved.
 * Available via the new BSD license.
 * see: https://github.com/AndreyGeonya/crystalMap for details
 */
require([
        'Map',
        'Layers/Tile',
        'Projections/SphericalMercator',
        'Marker',
        'Vendors/PubSub'
    ],
    function(
        Map,
        Layers_Tile,
        Projections_SphericalMercator,
        Marker,
        Vendors_PubSub
    ) {
        var geoPoint = {
            lat: 55.028,
            lon: 82.927
        };
        
        var map = new Map('myMap', geoPoint, 9);
        var layer = new Layers_Tile({
            url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
            subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
            tileSize: 256,
            errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg',
            projection: Projections_SphericalMercator
        });
        map.add(layer);

        var marker = new Marker({
            geoPoint: geoPoint,
            isDraggable: true
        });
        //map.add(marker);

        var zoomInBtn = document.getElementById('zoomin');
        var zoomOutBtn = document.getElementById('zoomout');
        var dragBtn = document.getElementById('simulatedrag');
        
        zoomInBtn.onclick = function() {
            map.setZoom(map.getZoom() + 1);
        };
        zoomOutBtn.onclick = function() {
            map.setZoom(map.getZoom() - 1);
        };

        dragBtn.onclick = function() {
                for(var i = 10; i < 1310; i++) {
                    layer.onDrag({
                        map: map,
                        startPixel: {
                            x: 10,
                            y: 10
                        },
                        offsetPixel: {
                            x: 10,
                            y: 10
                        },
                        currentPixel: {
                            x: i,
                            y: i
                        }
                    });
                }
                for(var i = 1310; i > 10; i--) {
                    layer.onDrag({
                        map: map,
                        startPixel: {
                            x: 10,
                            y: 10
                        },
                        offsetPixel: {
                            x: 10,
                            y: 10
                        },
                        currentPixel: {
                            x: i,
                            y: i
                        }
                    });
                }
                for(var i = 10; i < 1310; i++) {
                    layer.onDrag({
                        map: map,
                        startPixel: {
                            x: 10,
                            y: 10
                        },
                        offsetPixel: {
                            x: 10,
                            y: 10
                        },
                        currentPixel: {
                            x: i,
                            y: i
                        }
                    });
                }
        };



        // subscribe to the tile drawing
        Vendors_PubSub.subscribe('Layers/Tile/Drawer/TileDrawing', function(tile, xyz) {
            var leftTopGlobalPixel = { // left top corner of the tile in global pixels
                x: xyz.x * 256,
                y: xyz.y * 256
            };
            var rightBottomGlobalPixel = { // right bottom corner of the tile in global pixels
                x: leftTopGlobalPixel.x + 256,
                y: leftTopGlobalPixel.y + 256
            };

            console.log('Tile drawing: Global pixel bound:');
            console.log(leftTopGlobalPixel);
            console.log(rightBottomGlobalPixel);

            // left top corner of the tile in lon lat
            var leftTopGeoPoint = Projections_SphericalMercator.unprojectFromGlobalCoords(leftTopGlobalPixel, layer.getSize());
            // right bottom corner of the tile in lon lat
            var rightBottomGeoPoint = Projections_SphericalMercator.unprojectFromGlobalCoords(rightBottomGlobalPixel, layer.getSize());
            
            console.log('Tile drawing: Geopoint bound:');
            console.log(leftTopGeoPoint);
            console.log(rightBottomGeoPoint);

            // ground resolution in area of the left top corner of the tile
            var leftTopGroundResolution = Projections_SphericalMercator.getGroundResolution(leftTopGeoPoint.lat, layer.getSize());

            // left top corner of the tile in Spherical Mercator coordinates (in meters)
            var leftTopGlobalMeters = {
                x: leftTopGlobalPixel.x * leftTopGroundResolution,
                y: leftTopGlobalPixel.y * leftTopGroundResolution
            };

            // ground resolution in area of the right bottom corner of the tile
            var rightBottomGroundResolution = Projections_SphericalMercator.getGroundResolution(rightBottomGeoPoint.lat, layer.getSize());
            var rightBottomGlobalMeters = {
                x: rightBottomGlobalPixel.x * rightBottomGroundResolution,
                y: rightBottomGlobalPixel.y * rightBottomGroundResolution
            };

            console.log('Tile drawing: Global meters bound:');
            console.log(leftTopGlobalMeters);
            console.log(rightBottomGroundResolution);
        });

        // subscribe to the tile drawing
        Vendors_PubSub.subscribe('Layers/Tile/Drawer/TileRemoving', function(tile) {
            console.log('Tile removing: tile');
            console.log(tile);
        });
});
