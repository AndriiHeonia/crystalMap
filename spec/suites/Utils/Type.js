define(['Utils/Type'], function(Utils_Type) {
    describe("Utils/Type", function() {

        describe("isString", function() {
            it("should be checked correct", function() {
                expect(Utils_Type.isString('123')).toBeTruthy();
                expect(Utils_Type.isString(123)).toBeFalsy();
            });
        });

        describe("isNumber", function() {
            it("should be checked correct", function() {
                expect(Utils_Type.isNumber(123.5)).toBeTruthy();
                expect(Utils_Type.isNumber(123)).toBeTruthy();
                expect(Utils_Type.isNumber('123')).toBeFalsy();
            });
        });

        describe("isBoolean", function() {
            it("should be checked correct", function() {
                expect(Utils_Type.isBoolean(true)).toBeTruthy();
                expect(Utils_Type.isBoolean(false)).toBeTruthy();
                expect(Utils_Type.isBoolean('true')).toBeFalsy();
            });
        });

        describe("isArray", function() {
            it("should be checked correct", function() {
                expect(Utils_Type.isArray([1, 2, 3])).toBeTruthy();
                expect(Utils_Type.isArray('1, 2, 3')).toBeFalsy();
            });
        });

        describe("isFunction", function() {
            it("should be checked correct", function() {
                expect(Utils_Type.isFunction(function(){})).toBeTruthy();
                expect(Utils_Type.isFunction({})).toBeFalsy();
            });
        });

        describe("isUndefined", function() {
            it("should be checked correct", function() {
                expect(Utils_Type.isUndefined(undefined)).toBeTruthy();
                expect(Utils_Type.isUndefined('undefined')).toBeFalsy();
                expect(Utils_Type.isUndefined(null)).toBeFalsy();
                expect(Utils_Type.isUndefined('')).toBeFalsy();
            });
        });
        
    });
});