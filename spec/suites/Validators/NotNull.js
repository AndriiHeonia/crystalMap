define(['Validators/NotNull'], function(Validators_NotNull) {
    describe("Validators/NotNull", function() {

        describe("validate", function() {
            it("should throw an error, because value is null", function() {
                var value = null;
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function() {
                    Validators_NotNull.validate(value, callerObject, callerMethod);
                }).toThrow(new ReferenceError('Value passed to ' + callerMethod + ' method of the ' + callerObject + ' should not be Null.'));
            });
        });

    });
});