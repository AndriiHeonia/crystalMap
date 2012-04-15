/**
 * Provides a geographic point validator.
 * @static
 */
Crystal.Validators.GeoPoint = {
    /**
     * Checks or geographic point is correct.
     * @static
     * @param {Object} geoPoint Object should be validated. Required.
     */
    validate: function(geoPoint)
    {
        if(Crystal.Utils.Type.isNumber(geoPoint.lat) === false || geoPoint.lat < -90 || geoPoint.lat > 90)
        {
            throw new Error('Geographic point latitude is invalid.');
        }
        if(Crystal.Utils.Type.isNumber(geoPoint.lon) === false || geoPoint.lon < -180 || geoPoint.lon > 180)
        {
            throw new Error('Geographic point longitude is invalid.');
        }
    }    
}