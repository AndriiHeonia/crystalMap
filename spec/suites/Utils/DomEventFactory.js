define(['Map', 'Utils/DomEventFactory', 'Events/Mouse'], function(Map, Utils_DomEventFactory, Events_Mouse) {
    describe("Utils/DomEventFactory", function() {
        describe("create", function() {
            it("should return Events/Mouse object", function() {
                var myMap = new Map('myMap');
                var bowserEventStub = {
                    type: 'mousemove',
                    target: myMap.container,
                    currentTarget: myMap.container,
                    button: 0,
                    screenX: 10,
                    screenY: 10,
                    clientX: 5,
                    clicntY: 5,
                    stopPropagation: function() {},
                    preventDefault: function() {}
                };
                expect(Utils_DomEventFactory.create(bowserEventStub, myMap) instanceof Events_Mouse).toBeTruthy();
            });
        });
    });
});