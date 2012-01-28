/**
 * Provides a DOM processing functionality.
 * @static
 */
Crystal.Utils.Dom = {}

/**
 * Creates a DOM element.
 * @static
 * @param {String} tagName Tag, should be created. Required.
 * @param {String} id Id of the created tag. Optional.
 * @param {String} className Class of the created tag. Optional.
 * @param {Object} container Container DOM element, created tag should be appended. Optional.
 * @return {Object} Created DOM element.
 */
Crystal.Utils.Dom.create = function(tagName, id, className, container)
{
    var el = document.createElement(tagName);
    if (id)
    {
        el.id = id;
    }
    if(className)
    {
        el.className = className;        
    }
    if (container)
    {
        container.appendChild(el);
    }
    
    return el;
}

/**
 * Checks or object is a DOM node.
 * @static
 * @param {Object} object Checkable object. Required.
 * @return {Boolean}
 */
Crystal.Utils.Dom.isNode = function(object)
{
    return object.nodeType ? true : false;
}

/**
 * Checks or object is a DOM element.
 * @static
 * @param {Object} object Checkable object. Required.
 * @return {Boolean}
 */
Crystal.Utils.Dom.isElement = function(object)
{
    return (object.nodeType && object.nodeType == 1) ? true : false;
}

Crystal.Utils.Dom.CLASS_NAME = 'Crystal.Utils.Dom';