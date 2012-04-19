describe("Crystal.Validators.String", function()
{
    describe("validate", function()
    {
        it("should throw an error, because value is not an String", function()
        {
            var value = {};
            var callerMethod = 'testMethod';
            var callerClass = 'testClass';

            expect(function(){
                Crystal.Validators.String.validate(value, callerClass, callerMethod);
            }).toThrow(new TypeError('Value ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be a String.'));            
        });
    });
});