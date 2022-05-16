'use strict';

const { prototype } = require("markdown-it/lib/token");


/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:





function $Promise(executor){

    this._state="pending"
    this._value

    this._internalResolve=(data)=>{
        if(this._state==="pending"){
            this._state="fulfilled"
            this._value=data
        }
        while(this._handlerGroups.length>0){
            let obj=this._handlerGroups.shift()
            this._callhandlers(obj)
        }
    }

    this._handlerGroups=[]

    this._callhandlers=(obj)=>{
        if(obj.successCb===false&&this._state==="fulfilled"){
            obj.downstreamPromise._internalResolve(this._value)
        }
        if(obj.errorCb===false&&this._state==="rejected"){
            obj.downstreamPromise._internalReject(this._value)
        }
        if(obj.successCb&&this._state==="fulfilled"){
            obj.successCb(this._value)
        }
        if(obj.errorCb){
            obj.errorCb(this._value)
        }
    }

    this.then=(successCb,errorCb)=>{

        let obj={}
        obj.downstreamPromise=new $Promise(executor)
        if(typeof errorCb==="function")obj.errorCb=errorCb
        else obj.errorCb=false
        if(typeof successCb==="function")obj.successCb=successCb
        else obj.successCb=false
        if(obj){
            if(this._state==="pending") this._handlerGroups.push(obj)
            else{
                this._callhandlers(obj)
            }
        }
        return obj.downstreamPromise
    }

    this.catch=(errorCb)=>{
        this.then(null,errorCb)
        return this.then(null,errorCb)
    }

    this._internalReject=(error)=>{
        if(this._state==="pending") {
            this._state="rejected"
            this._value=error
        }
        while(this._handlerGroups.length>0){
            let obj=this._handlerGroups.shift()
            this._callhandlers(obj)
        }
    }
    
    if(typeof executor!=="function") throw new TypeError ("executor is not a function")
    
    executor(this._internalResolve,this._internalReject)    
}





module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
