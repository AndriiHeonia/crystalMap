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
        // subscribe to the tiles drawing
        Vendors_PubSub.subscribe('Layers/Tile/Drawer/OnDraw', function(drawedTiles) {
            //console.log(drawedTiles);
        });
        // subscribe to the tiles removing
        Vendors_PubSub.subscribe('Layers/Tile/Drawer/OnRemove', function(tile) {
            //console.log(tile);
        });


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
});
