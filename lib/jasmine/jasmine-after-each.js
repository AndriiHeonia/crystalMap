require(['MapRegister'], function(MapRegister) {
    afterEach(function() {
        var maps = MapRegister.getItems();
        for(var key in maps) {
            maps[key].destroy();
        }
    });
});