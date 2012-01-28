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

Crystal.Utils.Dom.CLASS_NAME = 'Crystal.Utils.Dom';