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
    var F = function() {}
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}