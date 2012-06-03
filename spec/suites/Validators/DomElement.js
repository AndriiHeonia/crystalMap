define(['Validators/DomElement'], function(Validators_DomElement) {
    describe("Validators/DomElement", function() {

        describe("validate", function() {
            it("should throw an error, because value is not a DOM element", function() {
                var value = '[1,2,3]';
                var callerMethod = 'testMethod';
                var callerObject = 'testObject';

                expect(function(){
                    Validators_DomElement.validate(value, callerObject, callerMethod);
                }).toThrow(new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerObject + ' should be a DOM element.'));
            });
        });

    });
});