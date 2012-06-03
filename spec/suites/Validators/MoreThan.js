define(['Validators/MoreThan'], function(Validators_MoreThan) {
    describe("Validators/MoreThan", function() {

        describe("validate", function() {
            it("should throw an error, because value should be more than 10", function() {
                var value = 10;
                var moreThan = 10;
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function() {
                    Validators_MoreThan.validate(value, moreThan, callerObject, callerMethod);
                }).toThrow(new RangeError('Number ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be more than ' + moreThan + '.'));
            });
        });

    });
});