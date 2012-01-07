/**
 * Provides OOP interface functionaity of the library.
 * @param {String} name Interface name.
 * @param {Array} methods Interface methods.
 */
Crystal.Interface = function(name, methods)
{
    if(arguments.length != 2)
    {
        throw new ReferenceError('Interface constructor called with ' + arguments.length + ' argument(s), but expected exactly 2.');
    }
    this.name = name;
    this.methods = [];
    for(var i = 0, len = methods.length; i < len; i++)
    {
        if(Object.prototype.toString.call(methods[i]) != '[object String]')
        {
            throw new TypeError('Interface constructor expects method names to be passed in as a string.');
        }
        this.methods.push(methods[i]);
    }
}

/**
 * Ensure that object impements interfaces.
 * @param {Object} object Object to be checked.
 * @param {Array} interfaces Array with Interface instances.
 */
Crystal.Interface.ensureImplements = function(object, interfaces)
{
    if(typeof(object) === 'undefined')
    {
        throw new ReferenceError('Parameter "object" should be passed.');
    }
	
    if(Object.prototype.toString.call(interfaces) != '[object Array]' || interfaces.length < 1)
    {
        throw new TypeError('Parameter "interfaces" is required and should be not empty array.');
    }
	
    for(var i = 0; i < interfaces.length; i++)
    {
        if(interfaces[i].constructor !== Crystal.Interface)
        {
            throw new TypeError('Interface should be instance of "Crystal.Interface".');
        }
        for(var j = 0; j < interfaces[i].methods.length; j++)
        {
            var method = interfaces[i].methods[j];
            if(!object[method] || typeof(object[method]) !== 'function')
            {
                throw new ReferenceError('Object does not implement the "' + interfaces[i].name + '" interface. Method "' + method + '" was not found.');
            }
        }
    }
}