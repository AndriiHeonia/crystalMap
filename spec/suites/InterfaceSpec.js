describe("Crystal.Interface", function()
{	
    describe("initialize", function()
    {
        it("should be initialized correct", function()
        {
            var myInterface = new Crystal.Interface('myInterface', ['method1', 'method2']);
            expect(myInterface instanceof Crystal.Interface).toBeTruthy();
        });
        
        it("should throw an error, because constructor accept less or more than 2 parameters", function()
        {
            expect(function(){
                new Crystal.Interface('myInterface');
            }).toThrow(new ReferenceError('Interface constructor called with 1 argument(s), but expected exactly 2.'));
            expect(function(){
                new Crystal.Interface('myInterface', [], []);
            }).toThrow(new ReferenceError('Interface constructor called with 3 argument(s), but expected exactly 2.'));            
        });
        
        it("should throw an error, because constructor accept method names not as a string", function()
        {
            expect(function(){
                new Crystal.Interface('myInterface', ['method1', 1, 'method2']);
            }).toThrow(new ReferenceError('Interface constructor expects method names to be passed in as a string.'));
        });
    });
    
    describe("isImplements", function()
    {
        it("should NOT throw an exceptions", function()
        {
            var MyInterface1;
            var MyInterface2;
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            var obj;
            
            MyInterface1 = new Crystal.Interface('myInterface1', ['method1', 'method2']);
            MyInterface2 = new Crystal.Interface('myInterface2', ['method3', 'method4']);
            
            ParentClass = function() {}
            ParentClass.prototype.method1 = function() {}
            
            ChildClass = function() {}
            Crystal.Class.extend(ChildClass, ParentClass);
            ChildClass.prototype.method2 = function() {}

            SubChildClass = function() {}
            Crystal.Class.extend(SubChildClass, ChildClass);
            SubChildClass.prototype.method3 = function() {}
            SubChildClass.prototype.method4 = function() {}

            obj = new SubChildClass();

            expect(function(){
                Crystal.Interface.isImplements(obj, [MyInterface1, MyInterface2]);
            }).not.toThrow();
        });
        
        it("should throw an exception, because object is not passed", function()
        {
            expect(function(){
                Crystal.Interface.isImplements();
            }).toThrow(new ReferenceError('Parameter "object" should be passed.'));
        });
        
        it("should throw an exception, because 2nd parameter is invalid", function()
        {
            expect(function(){
                Crystal.Interface.isImplements({}, []);
            }).toThrow(new ReferenceError('Parameter "interfaces" is required and should be not empty array.'));

            expect(function(){
                Crystal.Interface.isImplements({}, 'someString');
            }).toThrow(new ReferenceError('Parameter "interfaces" is required and should be not empty array.'));
        });
        
        it("should throw an exception, because 2nd parameter contains invalid interface instance", function()
        {
            var MyInterface1;
            var MyInterface2;
            var MyClass;
            var obj;

            MyInterface1 = new Crystal.Interface('myInterface1', ['method1', 'method2']);
            MyInterface2 = new Crystal.Interface('myInterface2', ['method3', 'method4']);

            MyClass = function() {}
            MyClass.prototype.method1 = function() {}
            MyClass.prototype.method2 = function() {}
            MyClass.prototype.method3 = function() {}
            MyClass.prototype.method4 = function() {}
            
            obj = new MyClass();


            expect(function(){
                Crystal.Interface.isImplements(obj, [MyInterface1, MyInterface2, {}]);
            }).toThrow(new TypeError('Interface should be instance of "Crystal.Interface".'));
        });
        
        it("should throw an exception, because object not implements all interfaces", function()
        {
            var MyInterface1;
            var MyInterface2;
            var MyClass;
            var obj;

            MyInterface1 = new Crystal.Interface('myInterface1', ['method1', 'method2']);
            MyInterface2 = new Crystal.Interface('myInterface2', ['method3', 'method4']);

            MyClass = function() {}
            MyClass.prototype.method1 = function() {}
            MyClass.prototype.method2 = function() {}
            MyClass.prototype.method3 = function() {}
            
            obj = new MyClass();


            expect(function(){
                Crystal.Interface.isImplements(obj, [MyInterface1, MyInterface2]);
            }).toThrow(new TypeError('Object does not implement the "myInterface2" interface. Method "method4" was not found.'));
        });
    });    
});