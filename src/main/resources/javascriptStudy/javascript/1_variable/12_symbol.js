/**
 * (참고) 
 * '심볼(symbol)'은 유일한 식별자(unique identifier)를 만들고 싶을 때 사용
 * - 자바스크립트는 객체 프로퍼티 키로 오직 문자형과 심볼형만을 허용
 */
// id는 새로운 심볼이 됩니다.
let id = Symbol();
console.log(id);

// symbol을 만들 때 설명을 붙일 수도 있음(심볼 이름은 디버깅 시 유용)
id = Symbol("id");
console.log(id);

// symbol을 유일성이 보장되는 데이타 타입이기 때문에, 설명이 동일한 심볼을 여러 개 만들어도 각 심볼값은 다름
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(`id1 === id2 : ${id1 === id2}`);

// symbol은 문자형으로 자동 형변환 안됨.
id = Symbol("id 설명입니다.");
//console.log(`id ${id}`); //Uncaught TypeError: can't convert symbol to string
//문자열과 심볼은 근본이 다르기 때문에 우연히라도 서로의 타입으로 변환돼선 안 되기때문에
//자바스크립트에선 '언어 차원의 보호장치(language guard)'를 마련해 심볼형이 다른 형으로 변환되지 않게 막음.
console.log(`id : ${id.toString()}`);
console.log(`id : ${id.description}`);