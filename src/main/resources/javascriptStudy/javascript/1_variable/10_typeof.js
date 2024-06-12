/**
 * https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/Variables#동적_타입
 
 * 자바스크립트에서는 실행할때 (동적으로 = 런타임시) 할당된 값에 따라 변수타입이 결정된다.
 * typeof : 동적으로 할당된 데이타의 타입 확인하는 기능 (값을 타입 문자열로 반환)
 * 
 * 참고_ https://ko.javascript.info/symbol
 */
let myNumber;
console.log(`typeof (let myNumber) : ${typeof myNumber}`);   //undefined

myNumber = "500"; 
console.log(`typeof (myNumber = "500") : ${typeof myNumber}`);  //string

myNumber = 500;
console.log(`typeof  (myNumber = 500)  : ${typeof myNumber}`);  //number

myNumber = {};                  
console.log(`typeof  (myNumber = {})  : ${typeof myNumber}`);   //object

myNumber = function(){}               
console.log(`typeof  (myNumber = function(){})  : ${typeof myNumber}`);   //function

myNumber = Symbol(); //참고) Symbol은 주로 네임스페이스 충돌을 방지하고, 라이브러리나 프레임워크를 만들 때 안전하게 속성을 추가하는 데 유용           
console.log(`typeof  (myNumber = Symbol())  : ${typeof myNumber}`);   //symbol