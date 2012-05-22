/**
 * Provides a pixel validator.
 * @static
 */
Crystal.Validators.Pixel = {
    /**
     * Checks or pixel is correct.
     * @static
     * @param {Object} pixel Object should be validated. Required.
     */
    validate: function(pixel)
    {
        if(Crystal.Utils.Type.isNumber(pixel.x) === false)
        {
            throw new TypeError('Pixel x coordinate is invalid.');
        }
        if(Crystal.Utils.Type.isNumber(pixel.y) === false)
        {
            throw new TypeError('Pixel y coordinate is invalid.');
        }
    }
};