//测试闭包
/*(function(){
	var n=0;
	$(".click").click(function() {
		n++;
		alert(n);
	});
}()); */ //创建了函数之后立即调用，通过创建函数来创建新的作用域

//window对象为html对象默认拥有的，在body文档渲染之前就存在，因此只要脚本在html内就可以运行
/*(function(){
	var n=0;
	$(window).click(function() {
		n++;
		alert(n);
	});
}());*/

(function() {
	var n = 0;
	$(".click").click(function() {
		n++;
		alert(n);
	});
}());
(function() {
	var n = 0;
	$(".click2").click(function() {
		n += 10;
		alert(n);
	});
}());

//测试闭包
/*function createF(){
	var result=new Array();

	for(var i=0;i<10;i++){
		result[i]=function(){
			return i;
		}
	}
	return result;
}*/
function createF2() {
	var result = new Array();

	for (var i = 0; i < 10; i++) {
		result[i] = function(num) {
			return function() {
				return num;
			};
		}(i);
	}
	return result;
}
var a = createF2();
console.log(a[0]());



//测试new
function newF() {
	var a = 0,
		b = [5, [4, 5]];
	this.name = "codetker";
	this.a = a;
	this.b = b;
}
var temp = new newF();
temp.a = 5;
temp.b[1][0] = 6;
var temp2 = new newF();
temp2.a
temp2.b[1][0]

//继承，js中只有实现继承，即实际的方法
/*确定原型和实例的关系 
a instanceof b  b是a的原型
b.prototype.isPrototypeOf(a)*/


//原型链继承
function Super() {
	this.property = true;
}
Super.prototype.getValue = function() {
	return this.property;
};

function Sub() {
	this.sub = false;
}
//继承,创建Super的实例，并将实例的原型赋给Sub的原型。即用Super的实例重写了Sub的原型对象
Sub.prototype = new Super();
//原型上添加方法(一定要放在替换原型的语句之后，不然就miss)
Sub.prototype.getSub = function() {
	return this.sub;
};
//实例
var instance = new Sub();
console.log(instance.getValue());
//问题
//1.通过原型实现继承的时候，原型实际上会变成另一个类型的实例，于是原来的实例属性就变成了现在的原型属性了。即第二个实例会受到第一个实例的影响
//2.没有办法在不影响所有对象的情况下，给超类的构造函数传递参数

//借用构造函数实现继承(伪造对象/经典继承)
function Super(name) {
	this.color = ['red', 'blue'];
	this.name = name;
	this.sayName = function() {
		console.log(this.name);
	};
}
Super.prototype.say = function() {
	console.log('not seen');
}

function Sub(name2) {
	//继承了Super,在子类型构造函数的内部调用超类型的构造函数,从而执行了Super()中定义的初始化代码
	Super.call(this, name2); //可以在子类型的构造函数里面给超类传递参数
}

var instance = new Sub('codetker'); //实例之间不冲突，拥有自己的属性
console.log(instance.color);
console.log(instance.name);
instance.sayName();
instance.say(); //not a function
//问题
//类似构造函数的问题，方法都在构造函数中定义，外面无法定义
//超类中原型定义的方法，对子类型都不可见

//组合继承
function Super(name) {
	this.color = ['red', 'blue'];
	this.name = name;
	this.sayName = function() {
		console.log(this.name);
	};
}
Super.prototype.say = function() {
	console.log(this.name);
}

function Sub(name2, age) {
	//继承属性
	Super.call(this, name2);
	this.age = age;
}
Sub.prototype = new Super();
Sub.prototype.constructor = Super;

var instance = new Sub('codetker', 21); //实例之间不冲突，拥有自己的属性
instance.say(); //OK now

//原型式继承
function object(Super) { //浅复制了Super
	function F() {} //临时性构造函数
	F.prototype = Super;
	return new F();
}
var person = {
	name: 'codetker',
	friends: ['a', 'b']
}
var person2 = object(person);
person2.name = 'code';
person2.friends.push('c');
console.log(person2.name);
console.log(person.name); //name没变(基本类型)
console.log(person2.friends);
console.log(person.friends); //friends变了(引用类型)
//ES5用Object.create()方法规范化了原型继承

var a = '5';
switch (a) {
	case 5:
		console.log('==');
		break;
	case "5":
		console.log('===');
		break;
	default:
}

var a = "5",
	b = 5;
a == b
a === b