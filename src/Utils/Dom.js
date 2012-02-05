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

/**
 * Sets opacity to the DOM element.
 * @static
 * @param {Object} element DOM element. Required.
 * @param {Number} opacity. Opacity (0.0-1.0). Required.
 */
Crystal.Utils.Dom.setOpacity = function(element, opacity)
{
    element.style.opacity = opacity;
    element.style.MozOpacity = opacity;
    element.style.KhtmlOpacity = opacity;
    element.style.filter = 'alpha(opacity=' + (opacity * 100) + ');';    
},

/**
 * Displays a DOM element with the fade animation.
 * @static
 * @param {Object} element DOM element. Required.
 * @param {Number} duration. Fade duration in milliseconds. Required.
 */
Crystal.Utils.Dom.fadeIn = function(element, duration)
{
    for (var i = 0; i <= 1; i += 0.05)
    {
        setTimeout(Crystal.Utils.Dom.setOpacity, i * duration, element, i);
    }
}

/**
 * Hides a DOM element with the fade animation.
 * @static
 * @param {Object} element DOM element. Required.
 * @param {Number} duration. Fade duration in milliseconds. Required.
 */
Crystal.Utils.Dom.fadeOut = function(element, duration)
{
    for (var i = 0; i <= 1; i += 0.05)
    {
        setTimeout(Crystal.Utils.Dom.setOpacity, i * duration, element, (1 - i));
    }
}

Crystal.Utils.Dom.CLASS_NAME = 'Crystal.Utils.Dom';