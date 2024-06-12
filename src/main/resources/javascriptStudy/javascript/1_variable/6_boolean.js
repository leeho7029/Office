/**
 * 불리언 타입 : 참,거짓만 존재 
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Boolean
 * 
 * 0, -0, null, false, NaN, undefined, 빈 문자열 ("")이라면 false
 * 그 외 모든 다른 값은  true
 */
let isActive = true;
let isFemale = false;
console.log(`-- 불리언 타입은 참,거짓만 존재 `);
console.log(`isActive: ${isActive}`);
console.log(`isFemale: ${isFemale}`);

//[중요] - 값 앞에 !! (느낌표 두개) 붙이면, 값을 boolean 값으로 변환한다.
//Falshy 거짓인 값  (7 개)
console.log(`-- Falshy 거짓인 값  (7 개)`);
console.log(`!!0: ${!!0}`);
console.log(`!!-0: ${!!-0}`);
console.log(`!!'': ${!!''}`);
console.log(`!!null: ${!!null}`);
console.log(`!!undefined: ${!!undefined}`);
console.log(`!!NaN: ${!!NaN}`);
console.log(`!!false: ${!!false}`);

// Truthy 참인 값 (거짓인 값 7개 제외한 모든값.)
console.log(`-- Truthy 참인 값 (거짓인 값 7개 제외한 모든값.)`);
console.log(`!!1: ${!!1}`);
console.log(`!!-1: ${!!-1}`);
console.log(`!!'test': ${!!'test'}`);
console.log(`!!{}: ${!!{}}`);
console.log(`!![]: ${!![]}`);
console.log(`!!Infinity: ${!!Infinity}`);
console.log(`!!-Infinity: ${!!-Infinity}`);
