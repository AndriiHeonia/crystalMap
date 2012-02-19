describe("Crystal.Utils.Dom", function()
{
    describe("create", function()
    {
        it("should create correct DOM element", function()
        {
            var el = Crystal.Utils.Dom.create('div');
            expect(el.nodeType).toEqual(1);
            
            var el1 = Crystal.Utils.Dom.create('div', 'myId');
            expect(el1.id).toEqual('myId');
            
            var el2 = Crystal.Utils.Dom.create('div', null, 'myClass');
            expect(el2.className).toEqual('myClass');
            
            Crystal.Utils.Dom.create('div', 'myId', 'myClass', document.getElementById('myMap'));
            expect(document.getElementById('myId').className).toEqual('myClass');
        });        
    });
    
    describe("isNode", function()
    {
        it("should be checked correct", function()
        {
            expect(Crystal.Utils.Dom.isNode(document.createElement('div'))).toBeTruthy();
            expect(Crystal.Utils.Dom.isNode(document.createTextNode('text'))).toBeTruthy();
        });        
    });
    
    describe("isElement", function()
    {
        it("should be checked correct", function()
        {
            expect(Crystal.Utils.Dom.isElement(document.createElement('div'))).toBeTruthy();
            expect(Crystal.Utils.Dom.isElement(document.createTextNode('text'))).toBeFalsy();
        });        
    });
    
    describe("setOpacity", function()
    {
        it("opacity should be changed correct", function()
        {
            
            var el = document.getElementById('myMap');
            Crystal.Utils.Dom.setOpacity(el, 0.5);
            var opacity = el.style.opacity || el.style.MozOpacity || el.style.KhtmlOpacity || el.style.filter;
            expect(opacity).toBeTruthy();
        });        
    });
    
    describe("fadeIn", function()
    {
        it("fadeIn method should not throw any errors", function()
        {
            var el = document.getElementById('myMap');
            Crystal.Utils.Dom.fadeIn(el, 500);
        });        
    });
    
    describe("fadeOut", function()
    {
        it("fadeOut method should not throw any errors", function()
        {
            var el = document.getElementById('myMap');
            Crystal.Utils.Dom.fadeOut(el, 500);
        });        
    });    
});