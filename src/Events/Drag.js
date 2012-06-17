/**
 * Incapsulates information about drag event.
 */
define({
    /**
     * @type {Map} Map related with draggable object.
     */
    map: null,

    /**
     * Start pixel position in view port cartesian coordinate system.
     * @type {Object} Structure:
     * - {Number} x X coordinate.
     * - {Number} y Y coordinate.
     */
    startPixel: null,

    /**
     * Current pixel position in view port cartesian coordinate system.
     * @type {Object} Structure:
     * - {Number} x X coordinate.
     * - {Number} y Y coordinate.
     */
    currentPixel: null,

    /**
     * End pixel position in view port cartesian coordinate system.
     * @type {Object} Structure:
     * - {Number} x X coordinate.
     * - {Number} y Y coordinate.
     */
    endPixel: null,

    /**
     * Checks or object is outside related map.
     * @return {Boolean} True - outside, false - inside.
     */
    getIsOutOfMap: function() {
        return ((this.currentPixel.x < 0 || this.currentPixel.x > this.map.container.clientWidth) ||
                (this.currentPixel.y < 0 || this.currentPixel.y > this.map.container.clientHeight));
    }
});