describe("Crystal.Validators.Boolean", function()
{
    describe("validate", function()
    {
        it("should throw an error, because value is not an Boolean", function()
        {
            var value = 'true';
            var callerMethod = 'testMethod';
            var callerClass = 'testClass';

            expect(function(){
                Crystal.Validators.Boolean.validate(value, callerClass, callerMethod);
            }).toThrow(new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be a Boolean.'));            
        });
    });
});