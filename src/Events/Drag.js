/**
 * Incapsulates information about drag event.
 * @todo doc and test.
 */
define({
    map: null,
    startPixel: null,
    currentPixel: null,
    endPixel: null,
    getIsOutOfMap: function() {
        return ((this.currentPixel.x < 0 || this.currentPixel.x > this.map.container.clientWidth) ||
                (this.currentPixel.y < 0 || this.currentPixel.y > this.map.container.clientHeight));
    }
});