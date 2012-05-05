describe("Crystal.Utils.DomEventFactory", function()
{
    describe("create", function()
    {
        it("should return Crystal.Events.Mouse object", function()
        {
            var myMap = new Crystal.Map('myMap');
            var bowserEventStub = {
                type: 'mousemove',
                target: myMap.container,
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
            expect(Crystal.Utils.DomEventFactory.create(bowserEventStub, myMap) instanceof Crystal.Events.Mouse).toBeTruthy();
        });        
    });
});