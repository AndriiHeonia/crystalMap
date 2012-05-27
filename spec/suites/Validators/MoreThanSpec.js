describe("Crystal.Validators.MoreThan", function()
{
    describe("validate", function()
    {
        it("should throw an error, because value should be more than 10", function()
        {
            var value = 10;
            var moreThan = 10;
            var callerMethod = 'testMethod';
            var callerClass = 'testClass';

            expect(function(){
                Crystal.Validators.MoreThan.validate(value, moreThan, callerClass, callerMethod);
            }).toThrow(new RangeError('Number ' + value + ' passed to ' + callerMethod + ' method of the ' + callerClass + ' class should be more than ' + moreThan + '.'));
        });
    });
});