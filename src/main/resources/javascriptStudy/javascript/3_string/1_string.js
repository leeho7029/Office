/* 
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings#single_quotes_double_quotes_and_backticks

자바스크립트에서 문자열 만들기
- String(thing) => 거의 사용안함.
- single quotes (')
- double quotes (")
- backticks (`) : 템플릿 리터럴
*/
const direct = String('직접 생성');
const single = 'Single quotes';
const double = "Double quotes";
const backtick = `Backtick`;

console.log(direct);
console.log(single);
console.log(double);
console.log(backtick);

// 템플릿 리터럴: 백틱(`)을 사용하여 선언된 문자열
// - 템플릿 리터럴은 멀티라인 문자열이 가능.
// - 템플릿 리터럴 내 ${ } 안에, 자바스크립트 변수나 표현식 삽입가능

console.log(`Hello, 
                   ${name}`);
const one = "Hello, ";
const two = "how are you?";
console.log(`${one} ${two}`); // 템플릿 리터럴을 이용한 문자열 연결
console.log(one + " " + two); // (일반적인) + 를 이용한 문자열 연결

// 참고) 티셀파 프리마커 영역에서는 <#noparse>내에서만 사용가능 
//      const newUrl = `<#noparse>${url}${separator}returnUrl=${encodeReturnUrl}</#noparse>`;
const song = "Fight the Youth";
const score = 9;
const highestScore = 10;
console.log(`I like the song ${song}. I gave it a score of ${
  (score / highestScore) * 100
}%.`);

//문자열에 따옴표 포함하기
//문자열의 시작과 끝을 표시하기 위해 따옴표를 사용하는데, 
//문자열에 실제 따옴표를 포함하려면 어떻게 해야 할까요? 
console.log('She said "I think so!"');               // 1. 따옴표가 아닌 것으로 문자열 선언하기
console.log('I\'ve got no right to take my place…'); // 2.  따옴표를 이스케이프하기

