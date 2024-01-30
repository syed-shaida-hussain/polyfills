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

printFullName.myApply(obj , ["srinagar" , "j&k"])

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