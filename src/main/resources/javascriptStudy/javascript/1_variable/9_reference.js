/**
 * 원시타입은 값이 복사되어 전달됨.
 * 
 * 값 복사(Copy by Value)
 *  변수에 primitive type 할당 시, 값이 복사됨
 */
let a = 1;
let b = a; //1. 변수 b가 가리키는 메모리셀에 a 의 값이 복사됨.

console.log(`a : ${a}`);
console.log(`b : ${b}`);
console.log(`a === b : ${a === b}`); 

b = 2;     //2. b에 다른값을 재할당 시, a의 값은 변경 없음. 
console.log(`a : ${a}`);
console.log(`b : ${b}`);
console.log(`a === b : ${a === b}`); 

/**
 * 객체 타입은 참조값(메모리주소)이 복사되어 전달됨.
 * 참조 복사(Copy by Reference) : 
 *  변수에 객체 타입 할당 시, 변수가 가리키는 메모리셀에 객체의 참조가 복사됨. 
 *   (객체가 존재하는 메모리공간의 시작 주소값이 복사됨.)
 */
a = {name: '히스토리'};  //변수 a 에  객체 할당
b = a;                  //변수 b 에 변수 a가 가리키는 객체주소가 할당됨.

console.log(a);
console.log(b);
console.log(`a === b : ${a === b}`); 

a.name = '백과사전'; 

console.log(a);
console.log(b);

console.log(`a.name : ${a.name}`);
console.log(`b.name : ${b.name}`);
console.log(`a === b : ${a === b}`); 


