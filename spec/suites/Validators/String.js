define(['Validators/String'], function(Validators_String) {
    describe("Validators/String", function() {

        describe("validate", function() {
            it("should throw an error, because value is not an String", function() {
                var value = {};
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function(){
                    Validators_String.validate(value, callerObject, callerMethod);
                }).toThrow(new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be a String.'));
            });
        });
        
    });
});