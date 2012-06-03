define(['Validators/Boolean'], function(Validators_Boolean) {
    describe("Validators/Boolean", function() {

        describe("validate", function() {
            it("should throw an error, because value is not an Boolean", function() {
                var value = 'true';
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function(){
                    Validators_Boolean.validate(value, callerObject, callerMethod);
                }).toThrow(new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be a Boolean.'));
            });
        });
        
    });
});