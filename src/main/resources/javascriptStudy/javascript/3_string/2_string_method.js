/**
 * 가이드 - https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/Useful_string_methods
 * 
 * 일단 문자열을 만들면, 문자열 객체 인스턴스가 됨. 
 * => 즉,  String 객체의 속성과 메서드를 사용가능하게됨.
 * JS API) https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String *         
 */


const browserType = "mozilla";
console.log(browserType.length); //문자열의 길이 찾기

console.log(browserType[0]);     //특정 문자열 찾기 - 1번째 문자  (인덱스: 0부터 시작)
console.log(browserType[browserType.length - 1]); 

//문자 위치
console.log(browserType.indexOf("zilla")); //하위 문자열의 시작인덱스 리턴 
console.log(browserType.indexOf("111"));   // -1 인 경우, 하위 문자열 없음

//문자 추출
console.log(browserType.slice(0, 3));       //moz - 0번째 인덱스 부터 ~ 3개의 문자 추출
console.log(browserType.slice(2));          //zilla - 시작 인덱스만 있는 경우, 시작인덱스 부터 나머지 전부 추출

//대/소문자 변경
const radData = "My NaMe Is MuD";
console.log(radData.toLowerCase());
console.log(radData.toUpperCase());

//문자열의 일부를 변경하기
console.log(browserType.replace("moz", "van"));
console.log(browserType); //원본 문자열은 변하지 않습니다.

