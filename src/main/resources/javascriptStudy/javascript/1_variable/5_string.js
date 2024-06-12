/**
 * String (문자열) 타입
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String
 * 
 * Template literals (템플릿 리터럴 ``)
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
 */
//문자열 타입
let string = "안녕하세요"; 
string  = `안녕!`;
console.log(`string: ${string}`);

//문자열 전역객체로 생성
let str = String('thing');
console.log(`str: ${str}`);

// 특수문자 출력하는법
string  = "'안녕!'";
console.log(`str: ${string}`);

//이스케이프 표현 
string  = "'안녕!\n\t\t내이름은\\유니코드출력은 이렇게:\u00AC'";
console.log(`string: ${string}`);


/** 
 * Template literals (템플릿 리터럴 ``)
 * 1. JS영역에 여러 줄로 이뤄진 문자열 작성 가능
 * 2. 문자 보간기능을 사용할 수 있음
 * 
 */
let id = '고양이';
let greetings = "'안녕, " + id + "\n즐거운하루되세요!"; //불편...아래와 같이 템플릿 리터럴 사요하면 편함.
console.log(`greetings: ${greetings}`);

greetings = `'안녕, ${id} 
즐거운하루되세요!
`;
console.log(`greetings: ${greetings}`);
