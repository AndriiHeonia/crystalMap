/**
 * Provides OOP interface functionaity of the library.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define(function() {
    /**
     * @constructor
     */
    var constructor = function() {
        var self = this;

        /**
         * Init.
         * @param {String} name Interface name. Required.
         * @param {Array} methods Interface methods. Required.
         */
        (function(name, methods, argumentsLength) {
            if(argumentsLength != 2) {
                throw new ReferenceError('Interface constructor called with ' + argumentsLength + ' argument(s), but expected exactly 2.');
            }
            self.name = name;
            self.methods = [];
            for(var i = 0, len = methods.length; i < len; i++) {
                if(Object.prototype.toString.call(methods[i]) !== '[object String]') {
                    throw new TypeError('Interface constructor expects method names to be passed in as a string.');
                }
                self.methods.push(methods[i]);
            }
        })(arguments[0], arguments[1], arguments.length);
    };

    return constructor;
});