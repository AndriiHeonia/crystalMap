(function() {
    var mapCenter = new Crystal.GeoPoint(55.028936234826, 82.927810142519);
    var map = new Crystal.Map('myMap', mapCenter, 5);
    var layer = new Crystal.Layers.Tile({
        url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
        subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
        tileSize: 255,
        errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg'
    });
    map.addLayer(layer);
})();