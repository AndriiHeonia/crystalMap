afterEach(function() {
    var maps = Crystal.MapRegister.getItems();
    for(var key in maps) {
        maps[key].destroy();
    }
});