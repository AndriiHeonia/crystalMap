describe("Crystal.Validators.NotNullSpec", function()
{
    describe("validate", function()
    {
        it("should throw an error, because value is null", function()
        {
            var value = null;
            var callerMethod = 'testMethod';
            var callerClass = 'testClass';

            expect(function(){
                Crystal.Validators.NotNull.validate(value, callerClass, callerMethod);
            }).toThrow(new ReferenceError('Value passed to ' + callerMethod + ' method of the ' + callerClass + ' class should not be Null.'));            
        });
    });
});