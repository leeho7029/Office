// 산술 연산자 (Arithmetic operators)
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math#arithmetic_operators
console.log(`더하기 => 6 + 9 = ${6 + 9}`);
console.log(`빼기 => 20 - 15 = ${20 - 15}`);
console.log(`곱하기 => 3 * 7 = ${3 * 7}`);
console.log(`나누기 => 10 / 5 = ${10 / 5}`);
console.log(`0으로 나누기 => 10 / 0 = ${10 / 0}`);
console.log(`Infinity의 타입 => ${typeof(10 / 0)}`);
console.log(`나머지 => 8 % 3 = ${8 % 3}`);
console.log(`지수 => 5 ** 2 = ${5 ** 2}`); //5의 제곱
console.log(`지수 => Math.pow(5, 2) = ${Math.pow(5, 2)}`);

//연산자 우선순위 : *와 /가 먼저 계산, +와 -는 나중에 계산
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math#operator_precedence
const num1 = 10;
const num2 = 50;

 console.log(`num2 + num1 / 8 + 2 = ${num2 + num1 / 8 + 2}`);

//연산자 우선순위를 무시하고 싶다면 괄호를 사용
 console.log(`(num2 + num1) / (8 + 2) = ${(num2 + num1) / (8 + 2)}`);

 
 //증감연산자 (Increment and decrement operators)
 //https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math#increment_and_decrement_operators    
 //console.log(`증감연산자 => 1-- : ${1--}`); //숫자에 직접 사용할수 없음, 변수만 증감시킬수있음.
 let a = 1;
 console.log(`증감연산자 => a++ : ${a++}, a: ${a}`);
 console.log(`증감연산자 => a-- : ${a--}, a: ${a}`);

//대입 연산자 (Assignment operators) - 변수에 값을 대입하는 연산자 (= += -= *= /=)
//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math#assignment_operators 
let x ;
console.log(`x = 1 : ${x = 1}`);
console.log(`x += 4 : ${x += 4}`); //x = x + 4;
console.log(`x -= 3 : ${x -= 3}`); //x = x - 3;
console.log(`x *= 3 : ${x *= 3}`); //x = x * 3;
console.log(`x /= 5 : ${x /= 5}`); //x = x / 5;

// 비교연산자 (Comparison operators) -  참/거짓 테스트를 실행한 결과
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math#comparison_operators
console.log( 2 === 3);
console.log( 2 !== 3);
console.log( 2 > 3);
console.log( 2 < 3);
console.log( 2 >= 3);
console.log( 2 <= 3);
console.log( 3 >= 3);
