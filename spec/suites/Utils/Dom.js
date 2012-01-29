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
});