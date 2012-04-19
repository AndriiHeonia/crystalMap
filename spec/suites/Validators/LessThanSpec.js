describe("Crystal.Validators.LessThan", function()
{
    describe("validate", function()
    {
        it("should throw an error, because value should be less than 10", function()
        {
            var value = 10;
            var lessThan = 10;
            var callerMethod = 'testMethod';
            var callerClass = 'testClass';

            expect(function(){
                Crystal.Validators.LessThan.validate(value, lessThan, callerClass, callerMethod);
            }).toThrow(new RangeError('Number ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be less than ' + lessThan + '.'));            
        });
    });
});