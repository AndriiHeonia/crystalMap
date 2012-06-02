/**
 * Checks or object implements interface.
 */
define(['Interface'], function(Interface){
    return {
        /**
         * Ensure that object impements interfaces.
         * @param {Object} object Object to be checked. Required.
         * @param {Array} interfaces Array with Interface instances. Required.
         */
        isImplements: function(object, interfaces) {
            if(typeof(object) === 'undefined') {
                throw new ReferenceError('Parameter "object" should be passed.');
            }
                
            if(Object.prototype.toString.call(interfaces) !== '[object Array]' || interfaces.length < 1) {
                throw new TypeError('Parameter "interfaces" is required and should be not empty array.');
            }
                
            for(var i = 0; i < interfaces.length; i++) {
                if(interfaces[i].constructor !== Interface) {
                    throw new TypeError('Interface should be instance of "Interface".');
                }
                for(var j = 0; j < interfaces[i].methods.length; j++) {
                    var method = interfaces[i].methods[j];
                    if(!object[method] || typeof(object[method]) !== 'function') {
                        throw new ReferenceError('Object does not implement the "' + interfaces[i].name + '" interface. Method "' + method + '" was not found.');
                    }
                }
            }
        }
    }
});