define(['Utils/Dom'], function(Utils_Dom) {
    describe("Utils/Dom", function() {
        describe("create", function() {
            it("should create correct DOM element", function() {
                var el = Utils_Dom.create('div');
                expect(el.nodeType).toEqual(1);
                
                var el1 = Utils_Dom.create('div', 'myId');
                expect(el1.id).toEqual('myId');
                
                var el2 = Utils_Dom.create('div', null, 'myClass');
                expect(el2.className).toEqual('myClass');
                
                Utils_Dom.create('div', 'myId', 'myClass', document.getElementById('myMap'));
                expect(document.getElementById('myId').className).toEqual('myClass');
            });
        });
        
        describe("isNode", function() {
            it("should be checked correct", function() {
                expect(Utils_Dom.isNode(document.createElement('div'))).toBeTruthy();
                expect(Utils_Dom.isNode(document.createTextNode('text'))).toBeTruthy();
            });
        });
        
        describe("isElement", function() {
            it("should be checked correct", function() {
                expect(Utils_Dom.isElement(document.createElement('div'))).toBeTruthy();
                expect(Utils_Dom.isElement(document.createTextNode('text'))).toBeFalsy();
            });
        });
        
        describe("setOpacity", function() {
            it("opacity should be changed correct", function() {
                var el = document.getElementById('myMap');
                Utils_Dom.setOpacity(el, 0.5);
                var opacity = el.style.opacity || el.style.MozOpacity || el.style.KhtmlOpacity || el.style.filter;
                expect(opacity).toBeTruthy();
            });
        });
        
        describe("fadeIn", function() {
            it("fadeIn method should not throw any errors", function() {
                var el = document.getElementById('myMap');
                Utils_Dom.fadeIn(el, 500);
            });
        });
        
        describe("fadeOut", function() {
            it("fadeOut method should not throw any errors", function() {
                var el = document.getElementById('myMap');
                Utils_Dom.fadeOut(el, 500);
            });
        });
        
        describe("addListener/removeListener", function() {
            it("addListener/removeListener method should not throw any errors", function() {
                var el = document.getElementById('myMap');
                var handler = function(){};
                Utils_Dom.addListener(el, 'click', handler);
                Utils_Dom.removeListener(el, 'click', handler);
            });
        });
        
        describe("isDescendant", function() {
            it("should return true", function() {
                var div = document.createElement("div");
                var p = document.createElement("p");
                var span = document.createElement("span");
                
                document.body.appendChild(div);
                div.appendChild(p);
                p.appendChild(span);
                
                expect(Utils_Dom.isDescendant(div, span)).toBeTruthy();
            });

            it("should return false", function() {
                var div = document.createElement("div");
                var p = document.createElement("p");
                var span = document.createElement("span");
                
                document.body.appendChild(div);
                div.appendChild(p);
                p.appendChild(span);
                
                expect(Utils_Dom.isDescendant(div, div)).toBeFalsy();
                expect(Utils_Dom.isDescendant(span, div)).toBeFalsy();
            });
        });
    });
});
