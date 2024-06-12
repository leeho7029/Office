/**
 * https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/Variables#변수의_종류
 * 
 * 원시 타입 (primitive type)
 *  - number : 64비트 부동 소수점 형식을 따르며, 정수 및 실수 모두를 표현
 *  - string 
 *  - boolean 
 *  - null : 의도적으로 값이 없음을 나타냄.     
 *  - undefined : 값이 정의되지 않았음을 나타냄.
 *  - Symbol : 고유하고 변경 불가능한 값을 나타냄. (주로 객체의 고유 속성 키를 만들 때 사용.)
 * 
 *  객체 타입 (object)
 *  - object --- array
 *           --- function 
 */
let integerNumber = 42;  // 정수
let floatingPointNumber = 2.3;  // 실수

console.log(typeof integerNumber);  // "number"
console.log(typeof floatingPointNumber);  // "number"
