/**
 * Pixel validator module.
 */
define(['Utils/Type'], function(Utils_Type) {
    var object = {
        /**
         * Checks or pixel is correct.
         * @static
         * @param {Object} pixel Object should be validated. Required.
         */
        validate: function(pixel) {
            if(Utils_Type.isNumber(pixel.x) === false) {
                throw new TypeError('Pixel x coordinate is invalid.');
            }
            if(Utils_Type.isNumber(pixel.y) === false) {
                throw new TypeError('Pixel y coordinate is invalid.');
            }
        }
    };

    return object;
});