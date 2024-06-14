/**
 * https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/Variables
 * 
 * 변수 : 값을 저장하는 공간 (=변수는 값 자체가 아니라 값을 담는 컨테이너입니다.)
 *       이름이 주어진 기억공간으로, 실제론 메모리 주소를 가리키고 있음.
 * 
 * 변수 이름 짓기 : 의미 있고 구체적인 이름. "이 변수에는 어떤값이 들어 있는가?" 로 접근 
 *  */
let myVariable; //변수 선언
console.log(myVariable); //undefined (아직 값이 할당 되지 않음을 의미)          
console.log(myVariable2); //Uncaught ReferenceError: can't access lexical declaration 'myVariable2' before initialization

myVariable = 2;      //할당 (초기화)
console.log(myVariable);

let myVariable2 = "Bob"; //변수 선언과 동시에 할당
console.log(myVariable2);

myVariable2 = 1;      //재할당 (변경)
console.log(myVariable2);






