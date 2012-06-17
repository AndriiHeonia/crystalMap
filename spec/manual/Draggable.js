require([
        'Map',
        'Layers/Tile',
        'Projections/SphericalMercator',
        'Marker'
    ],
    function(
        Map,
        Layers_Tile,
        Projections_SphericalMercator,
        Marker
    ) {
        var geoPoint = {
            lat: 55.028,
            lon: 82.927
        };
        
        var map = new Map('myMap_Draggable', geoPoint, 10);
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
        marker.onDragStart = function(event) {
            console.log(event, 'getIsOutOfMap: ' + event.getIsOutOfMap());
        };
        marker.onDragStop = function(event) {
            console.log(event, 'getIsOutOfMap: ' + event.getIsOutOfMap());
        };        
        map.add(marker);
});
