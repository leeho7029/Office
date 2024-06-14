// 자주 쓰는 배열 함수 - https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Indexed_collections#%EB%B0%B0%EC%97%B4%EC%9D%98_%EB%A9%94%EC%84%9C%EB%93%9C
// 주의) 배열 함수 사용할때, 배열 자체를 변경하는지, 새로운 배열을 반환하는지 확인한다.

 // 특정한 오브젝트가 배열인지 체크
 console.log(`----- isArray : 특정한 오브젝트가 배열인지 체크 \n`);
 let myArray = ["1", "2", "3"];
 console.log(Array.isArray(myArray)); //true
 console.log(Array.isArray({}));     //false

 // 특정한 아이템의 인덱스를 리턴, 없으면 -1 리턴
 console.log(`----- indexOf : 특정한 아이템의 인덱스를 리턴, 없으면 -1 리턴 \n`);
 myArray = ["1", "2", "3"];
console.log(myArray.indexOf('1'));
console.log(myArray.indexOf('2'));

// 특정한 아이템이 배열안에 있는지 체크
console.log(`----- includes : 특정한 아이템이 배열안에 있는지 체크 \n`);
myArray = ["1", "2", "3"];
console.log(myArray.includes('1'));
console.log(myArray.includes('A'));

// 중첩 배열을 하나의 flat한 새 배열 리턴 (원본배열 변경 X)
console.log(`----- flat : 중첩 배열을 하나의 flat한 새 배열 리턴 \n`);
myArray =  [[1, 2, 3],[4, [5, [6]]]];
console.log(`myArray: `, myArray); 
console.log(`myArray.flat(): `, myArray.flat());   //1 depth 까지 펼쳐줌
console.log(`myArray.flat(2): `, myArray.flat(2)); //2 depth까지 펼쳐줌. (입력안하면, 기본 1단계까지 )
console.log(`myArray.flat(3): `, myArray.flat(3)); //3 depth

//특정값으로 배열 채우기 (원본배열 변경 O)
console.log(`----- fill : 특정값으로 배열 채우기 (원본배열 변경 O) \n`);
myArray = ["1", "2", "3"];
console.log(`myArray: `, myArray); 
myArray.fill(0);
console.log(`myArray.fill(0) 후: `, myArray);
console.log(`myArray.fill('A', 1, 2) 후: `, myArray.fill('A', 1, 2)); //start, end index 로 채우는 범위 지정
console.log(`myArray.fill('K', 1) 후: `, myArray.fill('K', 1)); //start index 부터 전부 채워짐.


// 배열을 문자열로 변환하기
console.log(`----- join : 배열을 문자열로 변환하기 \n`);
myArray = ["1", "2", "3"];
const myNewString = myArray.join(",");  //배열을 각 항목이 입력 파라미터(,)로 연결된 문자열 리턴.
console.log(`myArray.join(","): `, myNewString); 
console.log(`myArray.toString(): `, myArray.toString());  // 배열을 문자열로 변환 (toString() 은 항상 콤마를 사용)

// 문자열을 배열로 변환하기
console.log(`----- split: 문자열을 배열로 변환하기 \n`);
const myData = "A,B,C";
myArray = myData.split(","); //입력 파라미터(,)로 분리된 배열을 리턴.
console.log(`myData.split(","): `, myArray);

// 배열 합치기 (concat)、 원본배열 변경안됨
console.log(`----- concat: 기준 배열에 입력 요소를 합쳐 새로운 배열을 반환 (원본배열 변경 X) \n`);
myArray = ["1"];
console.log(`concat 전: `, myArray);
let returnVal  = myArray.concat("a", "b");
console.log(`concat 후: `, myArray, `, returnVal :`, returnVal); 
returnVal = myArray.concat([1,2,3]);  
console.log(`concat 후: `, myArray, `, returnVal :`, returnVal);  

// 배열에 항목을 추가  (push, unshift)
// push : 배열의 끝에 추가하고 길이를 반환
console.log(`----- (추가) push : 배열에 항목을 추가 하고, 배열 길이 리턴 (원본배열 변경 O) \n`);
myArray = ['A','B','C'];
console.log(`push 전: `, myArray); 
returnVal  = myArray.push("A");
console.log(`한개 push 후: `, myArray, `, returnVal: `, returnVal); 
returnVal = myArray.push("C", "D"); // 이렇게 두개이상도 추가 가능 (push 위에서 control + 클릭 해보세요!)
console.log(`두개 push 후: `, myArray, `, returnVal: `, returnVal); 

// unshift : 배열 맨 앞에 항목을 추가, 배열 길이 리턴
console.log(`----- (추가) unshift : 배열 맨 앞에 항목을 추가, 배열 길이 리턴 (원본배열 변경 O)\n`);
myArray = [1,2,3];
console.log(`unshift 전: `, myArray); 
returnVal = myArray.unshift("쿠알라룸프르");
console.log(`1개 unshift 후: `, myArray, `, returnVal: ${returnVal}`); 
returnVal = myArray.unshift("말레이시아", "필리핀");
console.log(`2개 unshift 후: `, myArray, `returnVal: ${returnVal}`); 

// 배열에서 항목을 제거하기 (pop, shift)
// pop : 마지막 항목을 제거하고, 제거된 항목을 리턴.
console.log(`----- (제거) pop : 마지막 인덱스의 항목을 제거하고, 제거된 항목을 리턴. (원본배열 변경 O) \n`);
myArray = ['A','B','C'];
console.log(`pop 전: `, myArray); 
returnVal = myArray.pop();  //제거된 항목 리턴
console.log(`pop 후: `, myArray , ` returnVal: `, returnVal); 

//shift : 배열 맨앞에 항목 제거하고, 삭제된 항목 반환
console.log(`----- (제거) shift : 배열 맨앞에 항목 제거하고, 삭제된 항목 반환 (원본배열 변경 O)\n`);
myArray = ['A', 'B', 'C'];
console.log(`shift 전: `, myArray); 
returnVal = myArray.shift();
console.log(`shift 후: `, myArray, ` returnVal: ${returnVal}`); 

//slice : 배열을 잘라서 만든 새로운 배열 반환 (원본배열 변경 X)
console.log(`----- slice : 배열을 잘라서 만든 새로운 배열 반환 (원본배열 변경 X)\n`);
myArray = ["a", "b", "c", "d", "e"];
console.log(`slice 전: `, myArray); 
const myArray2 = myArray.slice(1, 4); //인덱스 1 부터 4앞까지 추출한 새 배열 반환
console.log(`slice 후: `, myArray, `원본배열은 그대로, 신규배열 리턴: `, myArray2); 

// splice : 요소 삭제와 추가를 한번에 처리, 제거된 항목을 배열로 반환
// 파라미터: (start: 삭제 시작 인덱스, deleteCount: 삭제할 항목수, ...items: 요소가 빠진 위치에 추가할 항목들)
console.log(`----- splice : 요소 삭제와 추가를 한번에 처리, 제거된 항목을 배열로 반환 (원본배열 변경 O) \n`);
myArray = ["1", "2", "3", "4", "5"];
console.log(`splice 전: `, myArray); 
let returnValue = myArray.splice(1, 3, "a", "b", "c", "d");
console.log(`splice 후: `, myArray, ` 리턴: `, returnValue); 

myArray = ["1", "2", "3"];
console.log(`splice 전: `, myArray); 
returnValue = myArray.splice(1, 0, 'A', 'B');    // (deleteCount = 0으로 하면, 추가만 됨.)
console.log(`splice 후: `, myArray, ` 리턴: `, returnValue); 

// reverse : 배열순서 거꾸로 (배열 자체를 수정함.)
console.log(`----- reverse : 배열순서 거꾸로 (원본배열 변경 O) \n`);
myArray = ["1", "2", "3"];
console.log(`reverse 전: `, myArray); 
myArray.reverse();
console.log(`reverse 후: `, myArray); 

