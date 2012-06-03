define(['Validators/Instance'], function(Validators_Instance) {
    describe("Validators/Instance", function() {

        describe("validate", function() {
            it("should throw an error, because value is not an Instance", function() {
                var functionConstructor = function() {};
                functionConstructor.CLASS_NAME = 'Crystal.Test';
                
                var badFunctionConstructor = function() {};
                badFunctionConstructor.CLASS_NAME = 'Crystal.BadTest';
                
                var instance = new badFunctionConstructor();
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function() {
                    Validators_Instance.validate(instance, functionConstructor, callerObject, callerMethod);
                }).toThrow(new TypeError('Object passed to the ' + callerMethod + ' method of the ' + callerObject + ' should be an instance of ' + functionConstructor.CLASS_NAME + '.'));
            });
        });

    });
});