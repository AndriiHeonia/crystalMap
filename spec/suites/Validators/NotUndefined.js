define(['Validators/NotUndefined'], function(Validators_NotUndefined) {
    describe("Validators/NotUndefined", function() {

        describe("validate", function() {
            it("should throw an error, because value is undefined", function() {
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function() {
                    Validators_NotUndefined.validate(undefined, callerObject, callerMethod);
                }).toThrow(new ReferenceError('Value passed to ' + callerMethod + ' method of the ' + callerObject + ' should not be Undefined.'));
            });
        });

    });
});