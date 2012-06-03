define(['Validators/LessThan'], function(Validators_LessThan) {
    describe("Validators/LessThan", function() {

        describe("validate", function() {
            it("should throw an error, because value should be less than 10", function() {
                var value = 10;
                var lessThan = 10;
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function(){
                    Validators_LessThan.validate(value, lessThan, callerObject, callerMethod);
                }).toThrow(new RangeError('Number ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be less than ' + lessThan + '.'));
            });
        });

    });
});