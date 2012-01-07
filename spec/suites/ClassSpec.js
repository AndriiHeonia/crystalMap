describe("Crystal.Class", function()
{	
    describe("extend", function()
    {        
        it("should call a parent class constructor and inherit public properties", function()
        {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function()
            {
                this.pcPublicProp = 'pcPublicProp test';
            }
            
            ChildClass = function() {
                ChildClass.superclass.constructor.call(this);
            }
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
                this.pcPublicProp = 'pcPublicProp test';
            }
            
            ChildClass = function() {
                ChildClass.superclass.constructor.call(this);
            }
            Crystal.Class.extend(ChildClass, ParentClass);
            
            SubChildClass = function() {
                SubChildClass.superclass.constructor.call(this);
            }
            Crystal.Class.extend(SubChildClass, ChildClass);
            
            var obj = new SubChildClass();
            expect(obj.pcPublicProp).toEqual('pcPublicProp test');    
        });      
      
        it("should inherit a parent class public methods", function()
        {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function() {}
            ParentClass.prototype.pcPublicMethod = function()
            {
                return 'pcPublicMethod called';
            }
            
            ChildClass = function() {}
            Crystal.Class.extend(ChildClass, ParentClass);
            
            var obj = new ChildClass();
            expect(obj.pcPublicMethod()).toEqual('pcPublicMethod called');    
        });
        
        it("should inherit a parent class public methods with inheritance level > 2", function()
        {
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            
            ParentClass = function() {}
            ParentClass.prototype.pcPublicMethod = function()
            {
                return 'pcPublicMethod called';
            }
            
            ChildClass = function() {}
            Crystal.Class.extend(ChildClass, ParentClass);
            
            SubChildClass = function() {}
            Crystal.Class.extend(SubChildClass, ChildClass);
            
            var obj = new SubChildClass();
            expect(obj.pcPublicMethod()).toEqual('pcPublicMethod called');    
        });        
        
        it("should override a parent class public methods", function()
        {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function() {}
            ParentClass.prototype.pcPublicMethod = function()
            {
                return 'ParentClass pcPublicMethod called';
            }
            
            ChildClass = function() {}
            Crystal.Class.extend(ChildClass, ParentClass);
            ChildClass.prototype.pcPublicMethod = function()
            {
                return 'ChildClass pcPublicMethod called';
            }            
            
            var obj = new ChildClass();
            expect(obj.pcPublicMethod()).toEqual('ChildClass pcPublicMethod called');    
        });

        it("should override a parent class public methods with inheritance level > 2", function()
        {
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            
            ParentClass = function() {}
            ParentClass.prototype.pcPublicMethod = function()
            {
                return 'ParentClass pcPublicMethod called';
            }
            
            ChildClass = function() {}
            Crystal.Class.extend(ChildClass, ParentClass);       
            
            SubChildClass = function() {}
            Crystal.Class.extend(SubChildClass, ChildClass);            
            SubChildClass.prototype.pcPublicMethod = function()
            {
                return 'SubChildClass pcPublicMethod called';
            }
            
            var obj = new SubChildClass();
            expect(obj.pcPublicMethod()).toEqual('SubChildClass pcPublicMethod called');    
        });

		it("should inherit parent static properties and methods", function() {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function() {}
            ParentClass.pcPublicStaticProperty = 'pcPublicStaticProperty test';
            ParentClass.pcPublicStaticMethod = function()
            {
                return 'pcPublicStaticMethod called';
            }
            
            ChildClass = function() {}
            Crystal.Class.extend(ChildClass, ParentClass);
            
            expect(ChildClass.pcPublicStaticProperty).toEqual('pcPublicStaticProperty test');
            expect(ChildClass.pcPublicStaticMethod()).toEqual('pcPublicStaticMethod called');
		});
     
		it("should inherit parent static properties and methods with inheritance level > 2", function() {
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            
            ParentClass = function() {}
            ParentClass.pcPublicStaticProperty = 'pcPublicStaticProperty test';
            ParentClass.pcPublicStaticMethod = function()
            {
                return 'pcPublicStaticMethod called';
            }
            
            ChildClass = function() {}
            Crystal.Class.extend(ChildClass, ParentClass);

            SubChildClass = function() {}
            Crystal.Class.extend(SubChildClass, ChildClass);

            expect(SubChildClass.pcPublicStaticProperty).toEqual('pcPublicStaticProperty test');
            expect(SubChildClass.pcPublicStaticMethod()).toEqual('pcPublicStaticMethod called');
		});
     
		it("should override parent static properties and methods", function() {
            var ParentClass;
            var ChildClass;
            
            ParentClass = function() {}
            ParentClass.pcPublicStaticProperty = 'ParentClass pcPublicStaticProperty test';
            ParentClass.pcPublicStaticMethod = function()
            {
                return 'ParentClass pcPublicStaticMethod called';
            }
            
            ChildClass = function() {}
            Crystal.Class.extend(ChildClass, ParentClass);
            ChildClass.pcPublicStaticProperty = 'ChildClass pcPublicStaticProperty test';
            ChildClass.pcPublicStaticMethod = function()
            {
                return 'ChildClass pcPublicStaticMethod called';
            }
            
            expect(ChildClass.pcPublicStaticProperty).toEqual('ChildClass pcPublicStaticProperty test');
            expect(ChildClass.pcPublicStaticMethod()).toEqual('ChildClass pcPublicStaticMethod called');
		});
        
		it("should override parent static properties and methods with inheritance level > 2", function() {
            var ParentClass;
            var ChildClass;
            var SubChildClass;
            
            ParentClass = function() {}
            ParentClass.pcPublicStaticProperty = 'ParentClass pcPublicStaticProperty test';
            ParentClass.pcPublicStaticMethod = function()
            {
                return 'ParentClass pcPublicStaticMethod called';
            }
            
            ChildClass = function() {}
            Crystal.Class.extend(ChildClass, ParentClass);
            
            SubChildClass = function() {}
            Crystal.Class.extend(SubChildClass, ChildClass);            
            SubChildClass.pcPublicStaticProperty = 'SubChildClass pcPublicStaticProperty test';
            SubChildClass.pcPublicStaticMethod = function()
            {
                return 'SubChildClass pcPublicStaticMethod called';
            }
            
            expect(SubChildClass.pcPublicStaticProperty).toEqual('SubChildClass pcPublicStaticProperty test');
            expect(SubChildClass.pcPublicStaticMethod()).toEqual('SubChildClass pcPublicStaticMethod called');
        });        
    });
});