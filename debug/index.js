(function() {
    var geoPoint = {
        lat: 55.028936234826,
        lon: 82.927810142519
    }
    var map = new Crystal.Map('myMap', geoPoint, 10);
    var layer = new Crystal.Layers.Tile({
        url: 'maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
        subdomains: ['tile0', 'tile1', 'tile2', 'tile3'],
        tileSize: 255,
        errorTileUrl: 'http://www.saleevent.ca/images/products/no_image.jpg',
        projection: Crystal.Projections.SphericalMercator
    });
    map.add(layer);
    
    var zoomInBtn = document.getElementById('zoomin');
    var zoomOutBtn = document.getElementById('zoomout');
    
    zoomInBtn.onclick = function() {
        map.setZoom(map.getZoom() + 1);
    }
    
    zoomOutBtn.onclick = function() {
        map.setZoom(map.getZoom() - 1);
    }    
})();