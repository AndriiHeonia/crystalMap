define(['Validators/Array'], function(Validators_Array) {
    describe("Validators/Array", function() {

        describe("validate", function() {
            it("should throw an error, because value is not an Array", function() {
                var value = '[1,2,3]';
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function(){
                    Validators_Array.validate(value, callerObject, callerMethod);
                }).toThrow(new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be an Array.'));
            });
        });

    });
});