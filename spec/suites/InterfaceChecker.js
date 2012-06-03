define(['InterfaceChecker', 'Interface'], function(InterfaceChecker, Interface) {
    describe("InterfaceChecker", function() {

        describe("isImplements", function() {
            it("should NOT throw an exceptions", function() {
                var MyInterface1;
                var MyInterface2;
                var MyConstructor;
                var obj;
                
                MyInterface1 = new Interface('myInterface1', ['method1', 'method2']);
                MyInterface2 = new Interface('myInterface2', ['method3', 'method4']);
                
                MyConstructor = function() {};
                MyConstructor.prototype = {
                    method1: function() {},
                    method2: function() {},
                    method3: function() {},
                    method4: function() {}
                };
                obj = new MyConstructor();

                expect(function(){
                    InterfaceChecker.isImplements(obj, [MyInterface1, MyInterface2]);
                }).not.toThrow();
            });
            
            it("should throw an exception, because object is not passed", function()
            {
                expect(function(){
                    InterfaceChecker.isImplements();
                }).toThrow(new ReferenceError('Parameter "object" should be passed.'));
            });
            
            it("should throw an exception, because 2nd parameter is invalid", function()
            {
                expect(function(){
                    InterfaceChecker.isImplements({}, []);
                }).toThrow(new ReferenceError('Parameter "interfaces" is required and should be not empty array.'));

                expect(function(){
                    InterfaceChecker.isImplements({}, 'someString');
                }).toThrow(new ReferenceError('Parameter "interfaces" is required and should be not empty array.'));
            });
            
            it("should throw an exception, because 2nd parameter contains invalid interface instance", function()
            {
                var MyInterface1;
                var MyInterface2;
                var MyConstructor;
                var obj;

                MyInterface1 = new Interface('myInterface1', ['method1', 'method2']);
                MyInterface2 = new Interface('myInterface2', ['method3', 'method4']);

                MyConstructor = function() {};
                MyConstructor.prototype.method1 = function() {};
                MyConstructor.prototype.method2 = function() {};
                MyConstructor.prototype.method3 = function() {};
                MyConstructor.prototype.method4 = function() {};
                
                obj = new MyConstructor();

                expect(function(){
                    InterfaceChecker.isImplements(obj, [MyInterface1, MyInterface2, {}]);
                }).toThrow(new TypeError('Interface should be instance of "Interface".'));
            });

            it("should throw an exception, because object not implements all interfaces", function()
            {
                var MyInterface1;
                var MyInterface2;
                var MyConstructor;
                var obj;

                MyInterface1 = new Interface('myInterface1', ['method1', 'method2']);
                MyInterface2 = new Interface('myInterface2', ['method3', 'method4']);

                MyConstructor = function() {};
                MyConstructor.prototype.method1 = function() {};
                MyConstructor.prototype.method2 = function() {};
                MyConstructor.prototype.method3 = function() {};
                
                obj = new MyConstructor();

                expect(function(){
                    InterfaceChecker.isImplements(obj, [MyInterface1, MyInterface2]);
                }).toThrow(new TypeError('Object does not implement the "myInterface2" interface. Method "method4" was not found.'));
            });
            
        });
    });
});