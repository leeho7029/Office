/**
 * 참고) 프로그램이 실행되는 동안 메모리 공간은 크게 4가지
 * Data: 전역 변수 및 정적 변수가 저장되는 메모리 공간
 * Stack: (함수 호출 시 생성되는) 지역 변수와 함수 호출 정보가 저장되는 메모리 공간
 * Heap: 런타임시, 필요에 따라 동적으로 할당되는 메모리 공간
 * 
 * primitive type 인 경우, 
 * 변수 선언에 따라 Data, Stack 영역에 값이 저장됨.                 
 * 변수는 값이 담긴 메모리 주소를 가리킴
 * 
 * object type인 경우,
 *  객체는 (용량이 커) 하나의 메모리셀에 들어가지 못하므로 가변영역인 heap영역에 저장된다. (heap영역에서 여러 메모리셀에 걸쳐존재.)
 *  변수는 객체가 저장된 힙 메모리의 주소를 가리킴
 */
let name  = 'apple';
let color = 'red';
let display = '';
let orangeName = 'orange';

let apple = {
    name : 'apple',
    color: 'red',
    display: 'on' 
};

console.log(apple);
console.log(apple.name);
console.log(apple.color);
console.log(apple.display);


let orange = {
    name : 'orange',
    color: 'orange',
    display: 'off'
}

console.log(orange);
console.log(orange.name);
console.log(orange.color);
console.log(orange.display);




