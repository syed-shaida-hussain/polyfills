// Polyfill for call method

const obj = {
    firstname : "syed",
    lastname : "shaida"
}

function printFullName (city, state) {
    console.log(`My name is ${this.firstname} ${this.lastname} and i live at ${city}, ${state}`)
}

Function.prototype.myCall = function(object={} , ...args) {
    if(typeof this !== "function") {
        throw new Error(this + "is not callable")
    }
    object.fn = this;
    object.fn(...args)
}

printFullName.myCall(obj , "srinagar" , "j&k")


// Polyfill for apply method

Function.prototype.myApply = function(object={} , args = []) {
    if(typeof this !== "function") {
        throw new Error(this + "is not callable")
    }

    if(!Array.isArray(args)){
        throw new Error("arguments should be passed in an array")
    }

    object.fn = this;
    object.fn(...args);
}

printFullName.myApply(obj , ["srinagar" , "j&k"]);

// Polyfill for bind method


Function.prototype.myBind = function(object = {} , ...args){
    if(typeof this !== "function") {
        throw new Error(this + "is not callable")
    }

    object.fn = this;
    return function(...newArgs) {
        return object.fn(...args,...newArgs)
    };
};

const bindResult = printFullName.myBind(obj , "Srinagar");
bindResult("j&k")

// Polyfill for Flat method

Array.prototype.myFlat = function (depth=1) {
    let flattenedArray = [];
    if(!Array.isArray(this)) {
        throw new Error(`${this}.myFlat is not a function`)
    }
    this.forEach(el => {
        if(Array.isArray(el) && depth > 0){
            flattenedArray.push(...el.myFlat(depth-1))
        } else{
            flattenedArray.push(el)
        }
    })
    return flattenedArray;
}

const array = [1,2,3,[[4,5]]];
console.log(array.myFlat(2));

// My custom flat function

function customFlat (arr , depth=1){
    let flatArray = [];
    for(let i=0; i<arr.length; i++){
        if(Array.isArray(arr[i]) && depth > 0){
            let res = customFlat(arr[i] , depth-1)
            flatArray = [...flatArray , ...res]
        } else {
            flatArray = [...flatArray,arr[i]]
        }
    }
    return flatArray
}

console.log(customFlat(array,2))