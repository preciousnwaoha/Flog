"use strict";
// //  Arrays
// let names = ["luigi", "Mario", "yoshi"];
// names.push("toad");
// // names.push(3)
// // names[0] = 2
// let numbers = [10, 20, 30, 40];
// numbers.push(21);
// // numbers[2]= 'shaun'
// // Mixed Arrays
// let mixed = ["ken", 4, "chun-li", 8, 9];
// mixed.push("ryu");
// mixed.push(10);
// mixed[0] = 3;
// // mixed.push(true)
// // Objects
// let ninja = {
//   name: "Mario",
//   belt: "black",
//   age: 30,
// };
// ninja.age = 40;
// ninja.name = 'ryu'
// // ninja.age = '30'
// // ninja.skills = ['fighting', 'sneaking']
// ninja = {
//     name: 'yoshi',
//     belt: 'orange',
//     age: 40,
//     // skills: []
// }
// // explicit types
// let character: string;
// let age: number;
// let isLoggedIn: boolean;
// // Arrays
// let ninjas: string[];
// ninjas = ["yoshi", "mario"];
// // union types
// let mixed: (string | number | boolean)[] = [];
// mixed.push("hello");
// mixed.push(23);
// mixed.push(false);
// let uid: string | number;
// uid = "123";
// uid = 123;
// // objects
// let ninja1: object;
// ninja1 = { name: "yoshi", age: 20 };
// let ninja2: {
//   name: string;
//   age: number;
//   belt: number;
// };
// ninja2 = { name: "precious", age: 20, belt: 1 };
// // Any types
// let age: any = 25;
// age = true;
// age = "hello";
// age = { name: "luigi" };
// console.log(age);
// let mixed: any[] = [];
// mixed.push(5);
// mixed.push("hello");
// mixed.push({ name: "precious" });
// console.log(mixed)
// let student: { name: any, age: any}
// student = {name: 23, age: 'Precious'} // you can see the mistake now
// // Functions
// let greet: Function;
// greet = () => {
//     console.log('hello world')
// }
// // oprional params and default values
// const add = (a: number, b: number, c: string | number = 10) => {
//     console.log(a + b)
//     console.log(c)
// }
// // Explicit return type (optional)
// const minus = (a: number, b: number): number => {
//     return a - b;
// }
// let result = minus(10, 7)
// // Type Aliases
// type StringOrNum = string |number;
// type objWithName = { name: string, uid: StringOrNum}
// const logDetails = (uid: StringOrNum, item: string) => {
//     console.log(`${item} has a uid of ${uid}`);
// }
// const greet = (user: objWithName) => {
//     console.log(`${user.name} says hello`)
// }
// const greetAgain = (user: objWithName) => {
//     console.log(`${user.name} says hello`)
// }
// // Function Signatures
// // let greet: Function;
// // example 1
// let greet: (a: string, b: string) => void;
// greet = (name: string, greeting: string) => {
//   console.log(`${name} says ${greeting}`);
// };
// // example 2
// let calc: (a: number, b: number, c: string) => number;
// calc = (num1: number, num2: number, action: string) => {
//   if (action === "add") {
//     return num1 + num2;
//   } else {
//     return num1 - num2;
//   }
// };
// // example 3
// let logDetails: (obj: { name: string; age: number }) => void;
// type person = { name: string; age: number };
// logDetails = (ninja: person) => {
//   console.log(`${ninja.name} is ${ninja.age} years old`);
// };
// // GENERICS
// const addUID = <T extends { name: string}>(obj: T) => {
//     let uid = Math.floor(Math.random() * 100)
//     return {...obj, uid}
// }
// let docOne = addUID({name: "precious", age: 21})
// // let docTwo = addUID("some string")
// console.log(docOne.name)
// // Using Generics with interfaces
// interface Resource<T> {
//     uid: number;
//     resourceName: string;
//     data: T;
// }
// const docThree: Resource<object> = {
//     uid: 1,
//     resourceName: "person",
//     data: { name: "ghost"},
// }
// const docFour: Resource<string[]> = {
//     uid: 2,
//     resourceName: "shoppinglist",
//     data: ['bread', 'milk', 'toilet paper'],
// }
// // ENUMS
// enum ResourceType { BOOK, AUTHOR, FILM, DIRECTOR, PERSON}
// interface Resource<T> {
//     uid: number;
//    resourceType: ResourceType;
//     data: T;
// }
// const docOne: Resource<object> = {
//     uid: 1,
//    resourceType: ResourceType.BOOK,
//     data: { title: "ghost of the wind"},
// }
// const docTwo: Resource<string[]> = {
//     uid: 2,
//    resourceType: ResourceType.PERSON,
//     data: ['bread', 'milk', 'toilet paper'],
// }
// console.log(docOne)
// console.log(docTwo)
