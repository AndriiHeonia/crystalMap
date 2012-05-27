describe("Crystal.Validators.DomElement", function()
{
    describe("validate", function()
    {
        it("should throw an error, because value is not a DOM element", function()
        {
            var value = '[1,2,3]';
            var callerMethod = 'testMethod';
            var callerClass = 'testClass';

            expect(function(){
                Crystal.Validators.DomElement.validate(value, callerClass, callerMethod);
            }).toThrow(new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be a DOM element.'));
        });
    });
});