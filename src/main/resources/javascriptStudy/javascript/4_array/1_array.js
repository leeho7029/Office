/*
가이드 https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/Arrays

*/
//배열 만들기
const shopping = ["bread", "milk", "cheese", "hummus", "noodles"];
const sequence = [1, 1, 2, 3, 5, 8, 13];
const random = ["tree", 795, [0, 1, 2]]; // 배열 내 각 item의 타입이 동일할 필요는 없느나 비추!

console.log(shopping, sequence, random);

//배열 내 각 항목으로 접근 및 수정 - 인덱스로 접근 (0부터 시작)
console.log(`shopping[0]: ${shopping[0]}`);
shopping[0] = 1;
console.log(`shopping[0]: ${shopping[0]}`);
console.log(`random[2][1]: ${random[2][1]}`); // 다중배열(multidimensional array)

// 배열의 갯수 알아내기
console.log(`shopping 내 항목수: ${shopping.length} 개`);


// 유용한 배열 메서드
// 문자열을 배열로 변환하기
const myData = "Manchester,London,Liverpool,Birmingham,Leeds,Carlisle";
const myArray = myData.split(","); //입력 파라미터(,)로 분리된 배열을 리턴.
console.log(`myArray: `, myArray);

// 배열을 문자열로 변환하기
const myNewString = myArray.join(",");  //배열을 각 항목이 입력 파라미터(,)로 연결된 문자열 리턴.
console.log(`myNewString: `, myNewString); 
console.log(`myNewString: `, myArray.toString());  // 배열을 문자열로 변환 (toString() 은 항상 콤마를 사용)

  
// 배열에 항목을 추가  (push, unshift)
// 배열에서 항목을 제거하기 (pop, shift)
// push : 배열의 끝에 추가하고 길이를 반환
console.log(`----- 기존 myArray: `, myArray); 
let length = myArray.push("Cardiff");
console.log(`push 후 myArray: `, myArray, `length: ${length}`); 

length = myArray.push("Bradford", "Brighton"); // 이렇게 두개이상도 추가 가능 (push 위에서 control + 클릭 해보세요!)
console.log(`push 후 myArray: `, myArray, `length: ${length}`); 

// pop : 마지막 항목을 제거하고, 제거된 항목을 리턴.
console.log(`----- 기존 myArray: `, myArray); 
const returnVal = myArray.pop();  //제거된 항목
console.log(`pop 후 myArray: `, myArray); 
console.log(`pop return value: `, returnVal); 


// unshift : 배열 맨 앞에 항목을 추가, 배열 길이 리턴
console.log(`----- 기존 myArray: `, myArray); 
length = myArray.unshift("쿠알라룸프르");
console.log(`unshift 후 myArray: `, myArray, `length: ${length}`); 
length = myArray.unshift("말레이시아", "필리핀");
console.log(`unshift 후 myArray: `, myArray, `length: ${length}`); 

//shift : 배열 맨앞에 항목 제거
var removedItem = myArray.shift();
console.log(`shift 후 myArray: `, myArray, `removedItem: ${removedItem}`); 


//사용 TIP)  push() 와 pop()같은 배열 메서드의 좋은 사용은 웹 앱(web app)에서 현재 활동적인 원소(item)의 기록을 유지할 때