//测试闭包
/*(function(){
	var n=0;
	$(".click").click(function() {
		n++;
		alert(n);
	});
}()); *///创建了函数之后立即调用，通过创建函数来创建新的作用域

//window对象为html对象默认拥有的，在body文档渲染之前就存在，因此只要脚本在html内就可以运行
/*(function(){
	var n=0;
	$(window).click(function() {
		n++;
		alert(n);
	});
}());*/

(function(){
	var n=0;
	$(".click").click(function() {
		n++;
		alert(n);
	});
}()); 
(function(){
	var n=0;
	$(".click2").click(function() {
		n+=10;
		alert(n);
	});
}()); 