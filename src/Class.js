/**
 * Provides OOP class functionaity of the library.
 */
Crystal.Class = {};

/**
 * Provides an inheritance.
 * 
 * @param {String} child Child object.
 * @param {String} parent Parent object.
 */
Crystal.Class.extend = function(child, parent)
{
    // instantiate class without calling constructor
    var F = function() {}
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    
    // add superclass access
    child.superclass = parent.prototype;
    
	// inherit parent's statics
	for (var i in parent)
    {
		if (parent.hasOwnProperty(i) && i != 'prototype' && i != 'superclass')
        {
			child[i] = parent[i];
		}
	}    
}

Crystal.Class.CLASS_NAME = 'Crystal.Class';