define(['Validators/Number'], function(Validators_Number) {
    describe("Validators/Number", function() {

        describe("validate", function() {
            it("should throw an error, because value is not an Number", function() {
                var value = '123';
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function() {
                    Validators_Number.validate(value, callerObject, callerMethod);
                }).toThrow(new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be a Number.'));
            });
        });
        
    });
});