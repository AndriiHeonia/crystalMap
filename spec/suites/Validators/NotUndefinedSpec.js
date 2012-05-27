describe("Crystal.Validators.NotUndefinedSpec", function()
{
    describe("validate", function()
    {
        it("should throw an error, because value is undefined", function()
        {
            var callerMethod = 'testMethod';
            var callerClass = 'testClass';

            expect(function(){
                Crystal.Validators.NotUndefined.validate(value, callerClass, callerMethod);
            }).toThrow(new ReferenceError('Value passed to ' + callerMethod + ' method of the ' + callerClass + ' class should not be Undefined.'));
        });
    });
});