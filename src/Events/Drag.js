/**
 * Incapsulates information about drag.
 * @todo should be tested.
 */
define(function() {
    /**
     * @type {Events/Drag}
     */
    var _self;

    /**
     * @constructor
     */
    var constructor = function() {
        _self = this;

        /**
         * Drag start position on the screen.
         * @type {Object} Structure:
         * - {Number} x X coordinate.
         * - {Number} y Y coordinate.
         */
        this.startPosition = null;

        /**
         * Drag end position on the screen.
         * @type {Object} Structure:
         * - {Number} x X coordinate.
         * - {Number} y Y coordinate.
         */
        this.endPosition = null;

         /**
          * Init.
          * @param {Object} Structure:
          * - {Number} x X coordinate.
          * - {Number} y Y coordinate.
          * @param {Object} Structure:
          * - {Number} x X coordinate.
          * - {Number} y Y coordinate.
          */
        (function(startPosition, endPosition) {
            _self.startPosition = startPosition;
            _self.endPosition = endPosition;
        })(arguments[0], arguments[1]);
    };

    return constructor;
});