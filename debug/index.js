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
        
        var map = new Map('myMap', geoPoint, 10);
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
        map.add(marker);
        













        // other stuff..

        var zoomInBtn = document.getElementById('zoomin');
        var zoomOutBtn = document.getElementById('zoomout');
        
        zoomInBtn.onclick = function() {
            map.setZoom(map.getZoom() + 1);
        };
        
        zoomOutBtn.onclick = function() {
            map.setZoom(map.getZoom() - 1);
        };

/*
        // 2GIS
        DG.autoload(function() {
            var myMap = new DG.Map('2gisMap');
            myMap.setCenter(new DG.GeoPoint(82.927, 55.028), 10);
            var myMarker = new DG.Markers.Common({
                geoPoint: new DG.GeoPoint(82.927, 55.028)
            });
            myMap.controls.add(new DG.Controls.Zoom());
            myMap.markers.add(myMarker);
        });

        // LeafLet
        var lMap = new L.Map('lMap', {'crs': L.CRS.EPSG3857});
        var doubleGisUrl = 'http://tile0.maps.2gis.ru/tiles?x={x}&y={y}&z={z}',
            doubleGisAttribution = '&copy; ООО «ДубльГИС», 2011',
            doubleGisLayer = new L.TileLayer(doubleGisUrl, {maxZoom: 17, attribution: doubleGisAttribution});
        lMap.setView(new L.LatLng(55.028, 82.927), 10).addLayer(doubleGisLayer);
        lMap.addLayer(new L.Marker(new L.LatLng(55.028, 82.927)));*/
});
