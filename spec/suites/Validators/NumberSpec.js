describe("Crystal.Validators.Number", function()
{
    describe("validate", function()
    {
        it("should throw an error, because value is not an Number", function()
        {
            var value = '123';
            var callerMethod = 'testMethod';
            var callerClass = 'testClass';

            expect(function(){
                Crystal.Validators.Number.validate(value, callerClass, callerMethod);
            }).toThrow(new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be a Number.'));
        });
    });
});