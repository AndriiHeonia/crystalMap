(function() {
    var geoPoint = {
        lat: 55.028,
        lon: 82.927
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
    
    //console.log(Crystal.Projections.SphericalMercator.project(geoPoint));
    //console.log(Crystal.Projections.SphericalMercator.unproject({x: 9231481.597949006, y: 7367484.0730569875}))
    
    drawMarker();
    function drawMarker() {
        // map should contain getBaseLayer() method
        var pixel = layer.projectToViewPort(geoPoint, 256);

        if(document.getElementById('m1')) {
            map.container.removeChild(document.getElementById('m1'));
        }
        var marker = document.createElement('div');
        marker.id = 'm1';
        marker.style.position = 'absolute';
        marker.style.left = pixel.x + 'px';
        marker.style.top = pixel.y + 'px';
        marker.style.width = '20px';
        marker.style.height = '20px';
        marker.style.backgroundColor = 'blue';
        map.container.appendChild(marker);
    }

    var zoomInBtn = document.getElementById('zoomin');
    var zoomOutBtn = document.getElementById('zoomout');
    
    zoomInBtn.onclick = function() {
        map.setZoom(map.getZoom() + 1);
        drawMarker();
    }
    
    zoomOutBtn.onclick = function() {
        map.setZoom(map.getZoom() - 1);
        drawMarker();          
    }  


    // 2GIS
    DG.autoload(function() {
        var myMap = new DG.Map('2gisMap');
        myMap.setCenter(new DG.GeoPoint(82.927, 55.028), 10);
        var myMarker = new DG.Markers.Common({
            geoPoint: new DG.GeoPoint(82.928, 55.029),
        });
        myMap.controls.add(new DG.Controls.Zoom());
        myMap.markers.add(myMarker); 
    });

})();