/**
 * Provides OOP interface functionaity of the library.
 */
define(function() {
    /**
     * @param {String} name Interface name. Required.
     * @param {Array} methods Interface methods. Required.
     */
    return function() {
        var _self = this;

        (function(name, methods) {
            if(arguments.length != 2) {
                throw new ReferenceError('Interface constructor called with ' + arguments.length + ' argument(s), but expected exactly 2.');
            }
            _self.name = name;
            _self.methods = [];
            for(var i = 0, len = methods.length; i < len; i++) {
                if(Object.prototype.toString.call(methods[i]) !== '[object String]') {
                    throw new TypeError('Interface constructor expects method names to be passed in as a string.');
                }
                _self.methods.push(methods[i]);
            }
        })(arguments[0], arguments[1]);
    };
});