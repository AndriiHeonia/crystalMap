describe("Crystal.Events.Mouse", function()
{
    var myMap = new Crystal.Map('myMap', {lat: 55.028936234826, lon: 82.927810142519}, 15);
    var bowserEventStub = {
        type: 'mousemove',
        target: myMap.getContainer(),
        button: 0,
        screenX: 10,
        screenY: 10,
        clientX: 5,
        clicntY: 5,
        stopPropagation: function()
        {
        },
        preventDefault: function()
        {
        }
    }
    
    describe("initialize", function()
    {        
        it("should be correct initialized", function()
        {
            new Crystal.Events.Mouse(bowserEventStub, myMap);
        });
        
        it("should be correct initialized with null second param", function()
        {
            new Crystal.Events.Mouse(bowserEventStub, null);
        });        
    });
    
    describe("map", function()
    {        
        it("should return Crystal.Map instance", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, myMap);
            expect(mouseEvent.map instanceof Crystal.Map).toBeTruthy();
        });

        it("should return null instance", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, null);
            expect(mouseEvent.map === null).toBeTruthy();
        });
    });
    
    describe("target", function()
    {        
        it("should return map container", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, myMap);
            
            expect(mouseEvent.target).toEqual(bowserEventStub.target);
        });
    });
    
    describe("button", function()
    {        
        it("should return 0", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, myMap);
            
            expect(mouseEvent.button).toEqual(bowserEventStub.button);
        });
    });
    
    describe("screenX", function()
    {        
        it("should return 10", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, myMap);
            
            expect(mouseEvent.screenX).toEqual(bowserEventStub.screenX);
        });
    });
    
    describe("screenY", function()
    {        
        it("should return 10", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, myMap);
            
            expect(mouseEvent.screenY).toEqual(bowserEventStub.screenY);
        });
    });    
    
    describe("clientX", function()
    {        
        it("should return 5", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, myMap);
            
            expect(mouseEvent.clientX).toEqual(bowserEventStub.clientX);
        });
    });
    
    describe("clientY", function()
    {        
        it("should return 5", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, myMap);
            
            expect(mouseEvent.clientY).toEqual(bowserEventStub.clientY);
        });
    });
    
    describe("stopPropagation", function()
    {        
        it("should call stopPropagation browser event method", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, myMap);
            
            spyOn(bowserEventStub, 'stopPropagation');
            
            mouseEvent.stopPropagation();

            expect(bowserEventStub.stopPropagation).toHaveBeenCalled();            
        });
    });
    
    describe("preventDefault", function()
    {        
        it("should call preventDefault browser event method", function()
        {
            var mouseEvent = new Crystal.Events.Mouse(bowserEventStub, myMap);
            
            spyOn(bowserEventStub, 'preventDefault');
            
            mouseEvent.preventDefault();

            expect(bowserEventStub.preventDefault).toHaveBeenCalled();            
        });
    });        
});