define(['System/Extender'], function(System_Extender) {
    describe("System/Extender", function() {

        describe("extend", function() {
            it("should inherit public properties", function() {
                var ParentConstructor;
                var ChildConstructor;
                
                ParentConstructor = function() {
                    this.pcPublicProp = 'pcPublicProp test';
                };
                
                ChildConstructor = function() {
                    ChildConstructor.parent.constructor.call(this);
                };
                System_Extender.extend(ChildConstructor, ParentConstructor);
                
                var obj = new ChildConstructor();
                expect(obj.pcPublicProp).toEqual('pcPublicProp test');
            });
          
            it("should inherit public properties with inheritance level > 2", function() {
                var ParentConstructor;
                var ChildConstructor;
                var SubChildConstructor;
                
                ParentConstructor = function() {
                    this.pcPublicProp = 'pcPublicProp test';
                };
                
                ChildConstructor = function() {
                    ChildConstructor.parent.constructor.call(this);
                };
                System_Extender.extend(ChildConstructor, ParentConstructor);
                
                SubChildConstructor = function() {
                    SubChildConstructor.parent.constructor.call(this);
                };
                System_Extender.extend(SubChildConstructor, ChildConstructor);
                
                var obj = new SubChildConstructor();
                expect(obj.pcPublicProp).toEqual('pcPublicProp test');
            });
          
            it("should inherit public methods", function() {
                var ParentConstructor;
                var ChildConstructor;
                
                ParentConstructor = function() {};
                ParentConstructor.prototype.pcPublicMethod = function() {
                    return 'pcPublicMethod called';
                };
                
                ChildConstructor = function() {};
                System_Extender.extend(ChildConstructor, ParentConstructor);
                
                var obj = new ChildConstructor();
                expect(obj.pcPublicMethod()).toEqual('pcPublicMethod called');
            });
            
            it("should inherit public methods with inheritance level > 2", function() {
                var ParentConstructor;
                var ChildConstructor;
                var SubChildConstructor;
                
                ParentConstructor = function() {};
                ParentConstructor.prototype.pcPublicMethod = function() {
                    return 'pcPublicMethod called';
                };
                
                ChildConstructor = function() {};
                System_Extender.extend(ChildConstructor, ParentConstructor);
                
                SubChildConstructor = function() {};
                System_Extender.extend(SubChildConstructor, ChildConstructor);
                
                var obj = new SubChildConstructor();
                expect(obj.pcPublicMethod()).toEqual('pcPublicMethod called');
            });
            
            it("should override a parent public methods", function() {
                var ParentConstructor;
                var ChildConstructor;
                
                ParentConstructor = function() {};
                ParentConstructor.prototype.pcPublicMethod = function() {
                    return 'ParentConstructor pcPublicMethod called';
                };
                
                ChildConstructor = function() {};
                System_Extender.extend(ChildConstructor, ParentConstructor);
                ChildConstructor.prototype.pcPublicMethod = function() {
                    return 'ChildConstructor pcPublicMethod called';
                };
                
                var obj = new ChildConstructor();
                expect(obj.pcPublicMethod()).toEqual('ChildConstructor pcPublicMethod called');
            });

            it("should override a parent public methods with inheritance level > 2", function() {
                var ParentConstructor;
                var ChildConstructor;
                var SubChildConstructor;
                
                ParentConstructor = function() {};
                ParentConstructor.prototype.pcPublicMethod = function() {
                    return 'ParentConstructor pcPublicMethod called';
                };
                
                ChildConstructor = function() {};
                System_Extender.extend(ChildConstructor, ParentConstructor);
                
                SubChildConstructor = function() {};
                System_Extender.extend(SubChildConstructor, ChildConstructor);
                SubChildConstructor.prototype.pcPublicMethod = function() {
                    return 'SubChildConstructor pcPublicMethod called';
                };
                
                var obj = new SubChildConstructor();
                expect(obj.pcPublicMethod()).toEqual('SubChildConstructor pcPublicMethod called');
            });

            it("should inherit parent static properties and methods", function() {
                var ParentConstructor;
                var ChildConstructor;
                
                ParentConstructor = function() {};
                ParentConstructor.pcPublicStaticProperty = 'pcPublicStaticProperty test';
                ParentConstructor.pcPublicStaticMethod = function() {
                    return 'pcPublicStaticMethod called';
                };
                
                ChildConstructor = function() {};
                System_Extender.extend(ChildConstructor, ParentConstructor);
                
                expect(ChildConstructor.pcPublicStaticProperty).toEqual('pcPublicStaticProperty test');
                expect(ChildConstructor.pcPublicStaticMethod()).toEqual('pcPublicStaticMethod called');
            });
         
            it("should inherit parent static properties and methods with inheritance level > 2", function() {
                var ParentConstructor;
                var ChildConstructor;
                var SubChildConstructor;
                
                ParentConstructor = function() {};
                ParentConstructor.pcPublicStaticProperty = 'pcPublicStaticProperty test';
                ParentConstructor.pcPublicStaticMethod = function() {
                    return 'pcPublicStaticMethod called';
                };
                
                ChildConstructor = function() {};
                System_Extender.extend(ChildConstructor, ParentConstructor);

                SubChildConstructor = function() {};
                System_Extender.extend(SubChildConstructor, ChildConstructor);

                expect(SubChildConstructor.pcPublicStaticProperty).toEqual('pcPublicStaticProperty test');
                expect(SubChildConstructor.pcPublicStaticMethod()).toEqual('pcPublicStaticMethod called');
            });
         
            it("should override parent static properties and methods", function() {
                var ParentConstructor;
                var ChildConstructor;
                
                ParentConstructor = function() {};
                ParentConstructor.pcPublicStaticProperty = 'ParentConstructor pcPublicStaticProperty test';
                ParentConstructor.pcPublicStaticMethod = function() {
                    return 'ParentConstructor pcPublicStaticMethod called';
                };
                
                ChildConstructor = function() {};
                System_Extender.extend(ChildConstructor, ParentConstructor);
                ChildConstructor.pcPublicStaticProperty = 'ChildConstructor pcPublicStaticProperty test';
                ChildConstructor.pcPublicStaticMethod = function() {
                    return 'ChildConstructor pcPublicStaticMethod called';
                };
                
                expect(ChildConstructor.pcPublicStaticProperty).toEqual('ChildConstructor pcPublicStaticProperty test');
                expect(ChildConstructor.pcPublicStaticMethod()).toEqual('ChildConstructor pcPublicStaticMethod called');
            });
            
            it("should override parent static properties and methods with inheritance level > 2", function() {
                var ParentConstructor;
                var ChildConstructor;
                var SubChildConstructor;
                
                ParentConstructor = function() {};
                ParentConstructor.pcPublicStaticProperty = 'ParentConstructor pcPublicStaticProperty test';
                ParentConstructor.pcPublicStaticMethod = function() {
                    return 'ParentConstructor pcPublicStaticMethod called';
                };
                
                ChildConstructor = function() {};
                System_Extender.extend(ChildConstructor, ParentConstructor);
                
                SubChildConstructor = function() {};
                System_Extender.extend(SubChildConstructor, ChildConstructor);
                SubChildConstructor.pcPublicStaticProperty = 'SubChildConstructor pcPublicStaticProperty test';
                SubChildConstructor.pcPublicStaticMethod = function() {
                    return 'SubChildConstructor pcPublicStaticMethod called';
                };
                
                expect(SubChildConstructor.pcPublicStaticProperty).toEqual('SubChildConstructor pcPublicStaticProperty test');
                expect(SubChildConstructor.pcPublicStaticMethod()).toEqual('SubChildConstructor pcPublicStaticMethod called');
            });
        });
    });
});