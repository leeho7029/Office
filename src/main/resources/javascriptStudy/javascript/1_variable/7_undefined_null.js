/**
 * undefined , null 둘 다 값이 비어 있음을 의미하지만, 의미와 용도가 다르다.
 * 
 * 1. undefined
 * 아무것도 할당 되지 않았음을 의미!
 * - let, const, var 키워드를 사용하여 변수를 선언하면, 메모리 공간이 할당된다.
 *   이 메모리 공간은 JavaScript 엔진에 의해 자동으로 undefined로 초기화된다.
 * 참고) 함수가 명시적으로 값을 반환하지 않을때도 undefined가 리턴된다.
 * 
 * 2. null
 * 명시적으로 "값이 없음"을 나타내기 위해 사용함.
 *  - 개발자가 의도적으로 변수나 속성의 값을 null로 설정하여 "비어 있음"을 표현할 때 사용함.
 * 
 * 참고)  === 를 사용하는 것이 버그를 줄이고 코드 가독성 높임. (===를 사용하자!)
 *  ==  (느슨한 동등 비교): 값만 동일한지 비교 (타입이 다르면 자동으로 타입 변환 후, 비교한다.)
 *  === (엄격한 동등 비교): 타입과 값이 모두 동일한지 비교
 */
let variable;
console.log(`variable : ${variable}`);  //undefined

variable = null;        
console.log(`variable : ${variable}`); //null 

// null 과 undefined 의 타입에 대해 알아보자!
console.log(`typeof null : ${typeof null}`);            // null 의 타입은 object 타입이다.  (타입이 object인 것은 JavaScript의 설계상의 오류로 간주됨).
console.log(`typeof undefined: ${typeof undefined}`);   // undefined

console.log(`undefined == null : ${undefined == null}`); // 출력: true
console.log(`undefined === null: ${undefined === null}`); // 출력: false (비교할때는 === 이것을 사용하자!)



