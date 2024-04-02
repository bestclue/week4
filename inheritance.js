class Animal {
    constructor (name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name}이(가) 소리를 냅니다.`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    speak(){
        console.log(`${this.name}이(가) 멍멍 짖습니다.`);
    }
    fetch(){
        console.log(`${this.name}이(가) 공을 가져옵니다.`);
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    speak(){
        console.log(`${this.name}이(가) 야옹 웁니다.`);
    }
    fetch(){
        console.log(`${this.name}이(가) 공을 가져옵니다.`);
    }
}

const dog = new Dog("뽀삐");
dog.speak();
dog.fetch();

const cat = new Cat("네로");
cat.speak();
cat.fetch();
