/*
 * 배열 가이드 https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/Arrays
              https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Indexed_collections
 * Array (표준 내장 객체) https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array
    - 배열 객체에서 제공하는 API 확인하세요!
    
 * 배열 만들기 (3가지 방식) => 동일하게 배열 객체가 된다.
    - 배열 리터럴 표기법 ([] 대괄호 구문)
    - Array 생성자 (new 붙인 것과 안붙인 것 결과 동일함)
    - Array static 메소드

 * JavaScript 배열 특징
    - 크기 조정 가능
    - 하나의 배열에 다양한 데이터 타입의 항목을 저장 가능 (이 특성이 바람직하지 않으면, typed array 를 사용해라!)
    - 각 항목에 인덱스로 접근 (시작 인덱스 0)
    - 배열도 객체이므로 할당 시, 참조가 복사됨.    
*/

//배열 만들기 - 동일한 배열을 생성한다.
console.log(`----- 배열 만들기 (3가지 방식) \n`);
 //배열 만들기 - 1. 배열 리터럴 표기법
const arr1 = [1, 2, '3'];              //배열 리터럴 표기법
const arr1_2 = []; arr1_2.length = 3;  //배열 리터럴 표기법 - 길이가 3인, 요소가 없는 배열 생성
const arr1_3 = ["bread", "milk"];      //배열 리터럴 표기법
const arr1_4 = [1, 1, 2, 3, 5, 8, 13];
const arr1_5 = ["tree", 795, [0, 1, 2]]; // 배열 내 각 item의 타입이 동일할 필요는 없느나 비추!

 //배열 만들기 - 2. Array 생성자 (new 붙인 것과 안붙인 것 결과 동일함)
const arr2 = new Array(1, 2, '3');     //Array 생성자 - 1, 2, '3' 으로 항목이 구성된 배열 생성
const arr2_1 = new Array(3);           //Array 생성자 - 길이가 3인, 요소가 없는 배열 생성
//const arr2_2 = Array(3.1);              //양의 정수만 사용해야함. 안그러면 =>  RangeError: Invalid array length

const arr3 = Array(1, 2, '3');         //Array 생성자 - Array()는 new를 붙이거나 붙이지 않고 호출할 수 있습니다. 
const arr3_1 = Array(3);               //Array 생성자 - 길이가 3인, 요소가 없는 배열 생성
//const arr3_2 = Array(3.1);              //양의 정수만 사용해야함. 안그러면 =>  RangeError: Invalid array length

 //배열 만들기 - 3. Array static 메소드
const arr4 = Array.of(1, 2, '3');      //Array static 메소드 of - 파라미터로 구성된 새 배열 리턴
const arr5 = Array.from(arr4);         //Array static 메소드 from - 기존 배열로 부터 복사한 새 배열 리턴

console.log(`[1, 2, '3'] : `, arr1);
console.log(`const arr1_2 = []; arr1_2.length = 3; : `, arr1_2);
console.log(`["bread", "milk"] : `, arr1_3);
console.log(`[1, 1, 2, 3, 5, 8, 13] : `, arr1_4);
console.log(`["tree", 795, [0, 1, 2]] : `, arr1_5);
console.log(`new Array(1, 2, '3') : `, arr2);
console.log(`new Array(3) : `, arr2_1);
console.log(`Array(1, 2, '3') : `, arr3);
console.log(`Array(3) : `, arr3_1);
console.log(`Array.of(1, 2, '3') : `, arr4);
console.log(`Array.from(arr4) : `, arr5);

//배열 항목에 접근(인덱스 0부터 시작)
console.log(`----- 배열 항목에 접근(인덱스 0부터 시작) \n`);
console.log(`인덱스를 통한 접근, arr1_3[0]: ${arr1_3[0]}`);
console.log(`다중배열 접근 arr1_5[2][1]: ${arr1_5[2][1]}`); // 다중배열(multidimensional array)

// 추가, 삭제는 좋지 않은 방식!!! (사용하지 말자!), 가능하면, 최초 생성한 사이즈로 사용하도록...
//배열 항목 수정 
console.log(`----- 배열 항목 수정 \n`);
console.log(`수정 전: ${arr1_3[0]}`); //, "cheese", "hummus", "noodles"
arr1_3[0] = 1;
console.log(`수정 후: ${arr1_3[0]}`);

//배열 항목 추가
console.log(`----- 배열 항목 추가 \n`);
console.log(`채우기 전, arr1_3`, arr1_3);
arr1_3[2] = "cheese";
console.log(`채우기 후, arr1_3`, arr1_3);

//배열 항목 삭제
console.log(`----- 배열 항목 삭제 \n`);
let myArray = [1, 2, '3'];  
console.log(`삭제 전`, myArray);
delete myArray[2]; //객체의 속성(property)을 제거할 때 사용하는 delete 연산자를 배열에 사용 하면..배열의 길이를 변경하지 않고 해당 인덱스의 값을 undefined로 설정
console.log(`삭제 후`, myArray);
myArray.length  = 1; //length를 이용해서 삭제하는 방식.
console.log(`삭제 후`, myArray);

// 배열의 갯수 알아내기
console.log(`----- 배열의 갯수 알아내기 \n`);
console.log(`arr1_5.length: ${arr1_5.length} 개`);

// length 로 배열 항목 삭제하기 - 저장된 항목 수보다 작은 값을 쓰면 배열이 잘립
arr1_5.length = 2;
console.log(`length = 2 로 변경하면, arr1_5.length: ${arr1_5.length} 개`);

// 배열 요소 반복 처리하기 (for구문, Array 객체의 forEach 메서드)
console.log(`----- 배열 요소 반복 처리하기 \n`);
//for구문
console.log(`- for구문 \n`);
const colors = ["red", "green", "blue"];
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
// for구문 - TIP) 만약에 배열내 각각의 모든 요소가 true 로 평가되는 값만 들어있다면, 
//                (즉 이게 (color = colors[i]) => true 일때만 사용)
//                매번 배열의 길이를 확인하는 오버헤드가 준다.
console.log(`- for구문 TIP\n`);
for (let i = 0, color; (color = colors[i]); i++) {
   console.log(colors[i]);
}

// Array 객체의 forEach 메서드 - 할당되지 않은 값은 forEach 반복문에서 반복되지 않습니다.
console.log(`- forEach 메서드 \n`);
const colors2 = ["red", undefined, null];  
colors2.length = 6;
colors2.forEach((colors2) => console.log(colors2)); //길이가 6인데, 할당된 항목만 반복됨.


