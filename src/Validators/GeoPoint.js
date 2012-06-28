/**
 * Geographic point validator module.
 * @author Andrey Geonya <a.geonya@gmail.com>
 */
define(['Utils/Type'], function(Utils_Type) {
    var object = {
        /**
         * Checks or geographic point is correct.
         * @param {Object} geoPoint Object should be validated. Required.
         */
        validate: function(geoPoint) {
            if(Utils_Type.isNumber(geoPoint.lat) === false || geoPoint.lat < -90 || geoPoint.lat > 90) {
                throw new Error('Geographic point latitude is invalid.');
            }
            if(Utils_Type.isNumber(geoPoint.lon) === false || geoPoint.lon < -180 || geoPoint.lon > 180) {
                throw new Error('Geographic point longitude is invalid.');
            }
        }
    };

    return object;
});