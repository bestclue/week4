class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    sayHello(){
        console.log(`안녕하세요, ${this.name}입니다.`);
    }
}

const person1 = new Person("Kim", 24);
console.log(person1.name);
person1.sayHello();
