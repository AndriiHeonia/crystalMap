describe("Crystal.Class", function()
{
    describe("initialize", function()
    {
        it("should call all private and public methods via constructor and set params", function()
        {
            var MyClass;
            var obj;
            
            MyClass = function()
            {
                var _publicIsCalled = false;
                var _privateIsCalled = false;
                var _param1;
                var _param2;
                
                function initialize(param1, param2)
                {
                    this.publicMethod1();
                    _param1 = param1;
                    _param2 = param2;
                    _privateMethod1();
                }
                
                this.publicMethod1 = function()
                {
                    _publicIsCalled = true;
                };
                
                function _privateMethod1()
                {
                    _privateIsCalled = true;
                }
                
                this.isSuccess = function()
                {
                    return _publicIsCalled && _privateIsCalled && _param1 == 'param1' && _param2 == 'param2';
                };
                
                initialize.apply(this, arguments);
            };
            
            obj = new MyClass('param1', 'param2');
            expect(obj.isSuccess()).toBeTruthy();
        });
    });
    describe("extend", function()
    {
        it("should call a parent class constructor and inherit public properties", function()
        {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function()
            {
                function initialize()
                {
                    this.pcPublicProp = 'pcPublicProp test';
                }
                initialize.apply(this, arguments);
            };
            
            ChildClass = function() {
                function initialize()
                {
                    ChildClass.superclass.constructor.call(this);
                }
                initialize.apply(this, arguments);
            };
            Crystal.Class.extend(ChildClass, ParentClass);
            
            var obj = new ChildClass();
            expect(obj.pcPublicProp).toEqual('pcPublicProp test');
        });
      
        it("should call a parent class constructor and inherit public properties with inheritance level > 2", function()
        {
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            
            ParentClass = function()
            {
                function initialize()
                {
                    this.pcPublicProp = 'pcPublicProp test';
                }
                initialize.apply(this, arguments);
            };
            
            ChildClass = function() {
                function initialize()
                {
                    ChildClass.superclass.constructor.call(this);
                }
                initialize.apply(this, arguments);
            };
            Crystal.Class.extend(ChildClass, ParentClass);
            
            SubChildClass = function() {
                function initialize()
                {
                    SubChildClass.superclass.constructor.call(this);
                }
                initialize.apply(this, arguments);
            };
            Crystal.Class.extend(SubChildClass, ChildClass);
            
            var obj = new SubChildClass();
            expect(obj.pcPublicProp).toEqual('pcPublicProp test');
        });
      
        it("should inherit a parent class public methods", function()
        {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function() {};
            ParentClass.prototype.pcPublicMethod = function()
            {
                return 'pcPublicMethod called';
            };
            
            ChildClass = function() {};
            Crystal.Class.extend(ChildClass, ParentClass);
            
            var obj = new ChildClass();
            expect(obj.pcPublicMethod()).toEqual('pcPublicMethod called');
        });
        
        it("should inherit a parent class public methods with inheritance level > 2", function()
        {
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            
            ParentClass = function() {};
            ParentClass.prototype.pcPublicMethod = function()
            {
                return 'pcPublicMethod called';
            };
            
            ChildClass = function() {};
            Crystal.Class.extend(ChildClass, ParentClass);
            
            SubChildClass = function() {};
            Crystal.Class.extend(SubChildClass, ChildClass);
            
            var obj = new SubChildClass();
            expect(obj.pcPublicMethod()).toEqual('pcPublicMethod called');
        });
        
        it("should override a parent class public methods", function()
        {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function() {};
            ParentClass.prototype.pcPublicMethod = function()
            {
                return 'ParentClass pcPublicMethod called';
            };
            
            ChildClass = function() {};
            Crystal.Class.extend(ChildClass, ParentClass);
            ChildClass.prototype.pcPublicMethod = function()
            {
                return 'ChildClass pcPublicMethod called';
            };
            
            var obj = new ChildClass();
            expect(obj.pcPublicMethod()).toEqual('ChildClass pcPublicMethod called');
        });

        it("should override a parent class public methods with inheritance level > 2", function()
        {
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            
            ParentClass = function() {};
            ParentClass.prototype.pcPublicMethod = function()
            {
                return 'ParentClass pcPublicMethod called';
            };
            
            ChildClass = function() {};
            Crystal.Class.extend(ChildClass, ParentClass);
            
            SubChildClass = function() {};
            Crystal.Class.extend(SubChildClass, ChildClass);
            SubChildClass.prototype.pcPublicMethod = function()
            {
                return 'SubChildClass pcPublicMethod called';
            };
            
            var obj = new SubChildClass();
            expect(obj.pcPublicMethod()).toEqual('SubChildClass pcPublicMethod called');
        });

		it("should inherit parent static properties and methods", function() {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function() {};
            ParentClass.pcPublicStaticProperty = 'pcPublicStaticProperty test';
            ParentClass.pcPublicStaticMethod = function()
            {
                return 'pcPublicStaticMethod called';
            };
            
            ChildClass = function() {};
            Crystal.Class.extend(ChildClass, ParentClass);
            
            expect(ChildClass.pcPublicStaticProperty).toEqual('pcPublicStaticProperty test');
            expect(ChildClass.pcPublicStaticMethod()).toEqual('pcPublicStaticMethod called');
		});
     
		it("should inherit parent static properties and methods with inheritance level > 2", function() {
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            
            ParentClass = function() {};
            ParentClass.pcPublicStaticProperty = 'pcPublicStaticProperty test';
            ParentClass.pcPublicStaticMethod = function()
            {
                return 'pcPublicStaticMethod called';
            };
            
            ChildClass = function() {};
            Crystal.Class.extend(ChildClass, ParentClass);

            SubChildClass = function() {};
            Crystal.Class.extend(SubChildClass, ChildClass);

            expect(SubChildClass.pcPublicStaticProperty).toEqual('pcPublicStaticProperty test');
            expect(SubChildClass.pcPublicStaticMethod()).toEqual('pcPublicStaticMethod called');
		});
     
		it("should override parent static properties and methods", function() {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function() {};
            ParentClass.pcPublicStaticProperty = 'ParentClass pcPublicStaticProperty test';
            ParentClass.pcPublicStaticMethod = function()
            {
                return 'ParentClass pcPublicStaticMethod called';
            };
            
            ChildClass = function() {};
            Crystal.Class.extend(ChildClass, ParentClass);
            ChildClass.pcPublicStaticProperty = 'ChildClass pcPublicStaticProperty test';
            ChildClass.pcPublicStaticMethod = function()
            {
                return 'ChildClass pcPublicStaticMethod called';
            };
            
            expect(ChildClass.pcPublicStaticProperty).toEqual('ChildClass pcPublicStaticProperty test');
            expect(ChildClass.pcPublicStaticMethod()).toEqual('ChildClass pcPublicStaticMethod called');
		});
        
		it("should override parent static properties and methods with inheritance level > 2", function() {
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            
            ParentClass = function() {};
            ParentClass.pcPublicStaticProperty = 'ParentClass pcPublicStaticProperty test';
            ParentClass.pcPublicStaticMethod = function()
            {
                return 'ParentClass pcPublicStaticMethod called';
            };
            
            ChildClass = function() {};
            Crystal.Class.extend(ChildClass, ParentClass);
            
            SubChildClass = function() {};
            Crystal.Class.extend(SubChildClass, ChildClass);
            SubChildClass.pcPublicStaticProperty = 'SubChildClass pcPublicStaticProperty test';
            SubChildClass.pcPublicStaticMethod = function()
            {
                return 'SubChildClass pcPublicStaticMethod called';
            };
            
            expect(SubChildClass.pcPublicStaticProperty).toEqual('SubChildClass pcPublicStaticProperty test');
            expect(SubChildClass.pcPublicStaticMethod()).toEqual('SubChildClass pcPublicStaticMethod called');
        });
    });
});