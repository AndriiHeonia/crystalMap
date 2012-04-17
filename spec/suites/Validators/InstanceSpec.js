describe("Crystal.Validators.Instance", function()
{
    describe("validate", function()
    {
        it("should throw an error, because value is not an Instance", function()
        {
            var functionConstructor = function() {}
            functionConstructor.CLASS_NAME = 'Crystal.Test';
            
            var badFunctionConstructor = function() {}
            badFunctionConstructor.CLASS_NAME = 'Crystal.BadTest';
            
            var instance = new badFunctionConstructor();
            var callerMethod = 'testMethod';
            var callerClass = 'testClass';

            expect(function(){
                Crystal.Validators.Instance.validate(instance, functionConstructor, callerClass, callerMethod);
            }).toThrow(new TypeError('Object passed to the ' + callerMethod + ' method of the ' + callerClass + ' class is an instance of ' + instance.constructor.CLASS_NAME + ', but it should be an instance of ' + functionConstructor.CLASS_NAME + '.'));            
        });
    });
});