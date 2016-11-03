"use strict";


const MyPromise = require("./myMethod");
let testArray = [],
  promiseArrayFalsy = [],
  promiseArray = [],
  rejectedBefore = [],
  resolvedBefore = [];

for(let i = 0; i < 10; i++) {
  testArray[i] = i;
  promiseArray[i] = new Promise(res => {
    res(i);
  });
  promiseArrayFalsy[i] = new Promise((res, rej) => {
    rej(i);
  });
  rejectedBefore[i] = new Promise((res, rej) => {
    if(i === 0) {
      rej(i);
    }
    else {
      res(i);
    }
  });
  resolvedBefore[i] = new Promise((res, rej) => {
    if(i % 2 === 0) {
      res(i);
    }
    else {
      rej(i);
    }
  });
}

describe("Testing MyPromise.all method..", () => {

  it("When all of the promises in the array are resolved state", () => {
    return MyPromise.all(promiseArray)
      .then(result => expect(result).toEqual(testArray));
  });

  it("When all of the promises in the array are rejected state", () => {
    return MyPromise.all(promiseArrayFalsy)
      .catch(result => expect(result).toEqual(testArray[0]));
  });

  it("When the rejected promise comes before the resolved ones", () => {
    return MyPromise.all(rejectedBefore)
      .catch(result => expect(result).toEqual(testArray[0]));
  });

  it("When the resolved promise comes before the rejected ones", () => {
    return MyPromise.all(resolvedBefore)
      .catch(result => expect(result).toEqual(testArray[1]));
  });

});


describe("Testing MyPromise.race method..", () => {

  it("When all of the promises in the array are resolved state", () => {
    return MyPromise.race(promiseArray)
      .then(result => expect(result).toEqual(testArray[0]));
  });

  it("When all of the promises in the array are rejected state", () => {
    return MyPromise.race(promiseArrayFalsy)
      .catch(result => expect(result).toEqual(testArray[0]));
  });

  it("When the rejected promise comes before the resolved ones", () => {
    return MyPromise.race(rejectedBefore)
      .catch(result => expect(result).toEqual(testArray[0]));
  });

  it("When the resolved promise comes before the rejected ones", () => {
    return MyPromise.race(resolvedBefore)
      .then(result => expect(result).toEqual(testArray[0]));
  });

});
