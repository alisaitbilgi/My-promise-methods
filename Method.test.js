"use strict";


const MyPromise = require("./Method");

let testArrayForValueCheck = [];
let promiseArrayFalsy = [];
let promiseArrayTruthy = [];
let rejectedBefore = [];
let resolvedBefore = [];

describe("", () => {
  
  // test values are created here.  
  beforeAll(() => {
    for(let i = 0; i < 10; i++) {
      testArrayForValueCheck[i] = i;

      promiseArrayTruthy[i] = Promise.resolve(i);

      promiseArrayFalsy[i] = Promise.reject(i);

      if(i === 0) 
        rejectedBefore[i] = Promise.reject(i);
      else
        rejectedBefore[i] = Promise.resolve(i);
      
      if(i % 2 === 0) 
        resolvedBefore[i] = Promise.resolve(i);
      else
        resolvedBefore[i] = Promise.reject(i);
    }
  });

  describe("MyPromise.all method should return", () => {

    it("all of the promises in the array, which are resolved state", () => {
      return MyPromise.all(promiseArrayTruthy)
        .then(result => expect(result).toEqual(testArrayForValueCheck));
    });

    it("first promise in the array, which is rejected state", () => {
      return MyPromise.all(promiseArrayFalsy)
        .catch(result => expect(result).toEqual(testArrayForValueCheck[0]));
    });

    it("first rejected promise comes before the resolved ones", () => {
      return MyPromise.all(rejectedBefore)
        .catch(result => expect(result).toEqual(testArrayForValueCheck[0]));
    });

    it("first rejected promise comes after the resolved ones", () => {
      return MyPromise.all(resolvedBefore)
        .catch(result => expect(result).toEqual(testArrayForValueCheck[1]));
    });

  });


  describe("MyPromise.race method should return", () => {

    it("first promise in the array which is resolved state", () => {
      return MyPromise.race(promiseArrayTruthy)
        .then(result => expect(result).toEqual(testArrayForValueCheck[0]));
    });

    it("first promise in the array which is rejected state", () => {
      return MyPromise.race(promiseArrayFalsy)
        .catch(result => expect(result).toEqual(testArrayForValueCheck[0]));
    });

    it("first rejected promise comes before the resolved ones", () => {
      return MyPromise.race(rejectedBefore)
        .catch(result => expect(result).toEqual(testArrayForValueCheck[0]));
    });

    it("first resolved promise comes before the rejected ones", () => {
      return MyPromise.race(resolvedBefore)
        .then(result => expect(result).toEqual(testArrayForValueCheck[0]));
    });

  });


})

