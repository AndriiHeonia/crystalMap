/**
 * Provides OOP functionaity of the library.
 */
Crystal.Class = function() {};

/**
 * Provides an inheritance.
 * 
 * @param string child Child object
 * @param string parent Parent object
 */
Crystal.Class.extend = function (child, parent) {
	var F = function() { }
	F.prototype = parent.prototype;
	child.prototype = new F();
	child.prototype.constructor = child;
	child.superclass = parent.prototype;
}