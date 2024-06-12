/**
 * 변수에 숫자 아무거나 할당가능!
 * MDN Number: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number
 *             https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number 
 * MDN BigInt: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/BigInt
 *             https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/BigInt
*/
/** 1. Number (primitive type)  */
// Number 리터럴 
let integer = 123; //정수
let negative = -123; //음수
let double = 1.23; //실수
let number = 123;        //10진수
let binary = 0b1111011;  //2진수 
let octal = 0o173;       //8진수 - 0o 또는 0O 접두사, 8진수(octal)
let hex = 0x7b;          //16진수 - 0x 또는 0X: 16진수임을 나타내는 접두사, 16진수(Hexadecimal)

console.log(`integer: ${integer}`);
console.log(`negative: ${negative}`);
console.log(`double: ${double}`);
console.log(`number: ${number}`);
console.log(`binary: ${binary}`);
console.log(`octal: ${octal}`);
console.log(`hex: ${hex}`);
console.log(`double.toFixed(1): ${double.toFixed(1)}`);

//Number 함수 (타입변환 시, 주로 사용)
let numberValue = Number(1);
let numberValueFromString = Number('1'); //타입변환

console.log(`numberValue: ${numberValue}`);
console.log(`numberValueFromString: ${numberValueFromString}`);
console.log(`numberValue === numberValueFromString: ${numberValue === numberValueFromString}`);

//숫자를 나눌때..
console.log(`0/123: ${0/123}`);                 // 0
console.log(`123 / 0: ${123 / 0}`);             // Infinity
console.log(`123 / -0: ${123 / -0}`);           // -Infinity
console.log(`123 / 'text': ${123 / 'text'}`);   // NaN (= Not a Number)

// Number 생성자는 primitive type 이 아닌 객체를 만든다. (거의 사용안함)
console.log(`Number(1) !== new Number(1): ${Number(1) !== new Number(1)}`);

/** 2. BigInt (내장객체) 
 * 원시 값이 안정적으로 나타낼 수 있는 최대치인 2^53 - 1보다 큰 정수를 표현할 수 있는 내장 객체
*/
// BigInt 리터럴 
let bigInt = 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111n; // n붙여주면 BigInt type 이다
console.log( bigInt );  

// BigInt 함수
const bigIntValue = BigInt(9007199254740991);
console.log( bigIntValue );  //9007199254740991n
