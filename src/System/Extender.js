/**
* Provides OOP extending functionaity.
* Helps to extend constructors.
*/
define({
     extend: function(child, parent) {
        // instantiate "class" without calling constructor
        var F = function() {};
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;

        // add parent access
        child.parent = parent.prototype;
        
        // ensure that the constructor attribute is set correctly on the parent (even if the parent is the Object "class" itself)
        if(parent.prototype.constructor == Object.prototype.constructor) {
            parent.prototype.constructor = parent;
        }
        
        // inherit parent's statics
        for (var i in parent) {
            if (parent.hasOwnProperty(i) && i !== 'prototype' && i !== 'parent') {
                child[i] = parent[i];
            }
        }
    }
});