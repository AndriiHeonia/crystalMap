/**
 * pubsub.js
 * @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
 * Original implementation by Daniel Lamb <daniellmb.com>
 */
(function(){
    //universal module
    if(typeof module != "undefined")//CommonJS module
        module.exports = init();
    else if(typeof define != "undefined")//CommonJS AMD module
        define("Vendors/PubSub", init);
    else//traditional module
        PubSub = init();

    function init(){
        // the topic/subscription hash
        var cache = {},
            context = {};

        return {
            /*
             * Publish some data on a named topic
             *
             * @param String channel The channel to publish on
             * @param Mixed argument The data to publish, the function supports
             * as many data parameters as needed
             *
             * @example Publish stuff on '/some/channel'. Anything subscribed will
             * be called with a function signature like: function(a,b,c){ ... }
             * PubSub.publish("/some/channel", "a", "b", {total: 10, min: 1, max: 3});
             */
            publish: function(){
                var subs = cache[arguments[0] /* channel */];

                if(subs){
                    var len = subs.length,
                        args = (arguments.length > 1) ? Array.prototype.splice.call(arguments, 1) : [],
                        x = 0;

                    //executes callbacks in the order in which they were regustered
                    for(; x < len; x++)
                        subs[x].apply(context, args);
                }
            },

            /*
             * Register a callback on a named topic
             *
             * @param String channel The channel to subscribe to
             * @param Function callback The event handler, anytime something is
             * publish'ed on a subscribed channel, the callback will be called
             * with the published array as ordered arguments
             *
             * @return Array A handle which can be used to unsubscribe this
             * particular subscription
             *
             * @example PubSub.subscribe("/some/topic", function(a, b, c){ ... });
             */
            subscribe: function(channel, callback){
                if(!channel)
                    throw "channel not specified";
                if(!(callback instanceof Function))
                    throw "callback is not a function";

                if(!cache[channel])
                    cache[channel] = [];

                cache[channel].push(callback);

                return [channel, callback];
            },

            /*
             * Disconnect a subscribed function for a topic.
             *
             * @param Mixed handle The return value from a subscribe call or the
             * name of a channel as a String
             * @param Function callback [OPTIONAL] The event handler originaally
             * registered, not needed if handle contains the return value of subscribe
             *
             * @example
             * var handle = PubSub.subscribe("/some/topic", function(){});
             * PubSub.unsubscribe(handle);
             *
             * or
             *
             * PubSub.unsubscribe("/some/topic", callback);
             */
            unsubscribe: function(handle, callback){
                if(handle instanceof Array && handle.length > 1){
                    callback = handle[1];
                    handle = handle[0];
                }

                if(typeof handle != "string")
                    throw "channel not specified";

                if(!(callback instanceof Function))
                    throw "callback is not a function";

                var subs = cache[handle],
                    len = subs ? subs.length : 0;
                
                while(len--){
                    if(subs[len] === callback){
                        subs.splice(len, 1);
                    }
                }
            }
        };
    }
})();