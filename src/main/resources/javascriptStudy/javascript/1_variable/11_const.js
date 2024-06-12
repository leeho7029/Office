/*
https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/Variables#const를_사용하는_경우와_let을_사용하는_경우

[변수 선언을 위한 키워드]
let => 재할당 가능
const => 상수 (재할당 불가) (final변수)
var => 이건 사용하지 말자! 
*/
let a = 'let 은 재할당가능';
console.log(`a: ${a}`);

a = '이것봐! 가능하잖아!';
console.log(`a: ${a}`);

const b = 'const 는 상수 (재할당 불가)';
//b = '재할당 해봐! 오류가 발생할테니...TypeError: Assignment to constant variable.';     
console.log(`b: ${b}`); 

const c = {
    name : 'henny'
}
//즉, 이건 가능!
c.name = 'nana';
console.log(c);

