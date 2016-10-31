"use strict";

const MyPromise = {
  all: function (iterable) {
    if (!Array.isArray(iterable))
      return Promise.resolve([]);


    let isRejected = false;
    let resultArray = new Array(iterable.length);
    let resolvedCount = 0;

    return new Promise((res, rej) => {
      iterable.forEach(function (promise, idx) {
        promise
          .then((resultResolve) => {
            if (isRejected)
              return;

            resolvedCount += 1;
            resultArray[idx] = resultResolve;

            if (resolvedCount === iterable.length)
              res(resultArray);
          }, (dataComingFromReject) => {
            if (isRejected)
              return;
            isRejected = true;
            rej(dataComingFromReject);
          });
      });
    });
  },
  race: function (iterable) {
    let isRejected = false;
    if (!Array.isArray(iterable))
      return Promise.resolve();

    return new Promise((res, rej) => {
      iterable.forEach(promise => {
        promise
          .then((dataComingFromResolve) => {
            if (isRejected)
              return;

            res(dataComingFromResolve);
          }, (dataComingFromReject) => {
            if (isRejected)
              return;

            rej(dataComingFromReject);
          });
      });
    });
  }
};

module.exports = MyPromise;

