'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  return Object(val);
}

function isObj(val){
  return val!==null && typeof(val)=='object';
}

function assignKey(to, from, key) {
  var val = from[key];

  if (val === undefined || val === null) {
    return;
  }

  if (hasOwnProperty.call(to, key)) {
    if (to[key] === undefined || to[key] === null) {
      throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
    }
  }

  if (!hasOwnProperty.call(to, key) || !isObj(val)) {
    if(typeof(val)=='number'){
      to[key] = to[key] ? (to[key] + val) : val;
    }else if(typeof(val)=='object' && !isNaN(val.length)){
      to[key] = to[key] ? to[key].concat(val) : val;
    }else{
      to[key] = val;
    }
  } else {
    if(!isNaN(val.length)){
      to[key] = to[key] ? to[key].concat(val) : val;
    }else{
      to[key] = assign(Object(to[key]), from[key]);
    }
  }
}

function assign(to, from) {
  if (to === from) {
    return to;
  }

  from = Object(from);

  for (var key in from) {
    if (hasOwnProperty.call(from, key)) {
      assignKey(to, from, key);
    }
  }

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(from);

    for (var i = 0; i < symbols.length; i++) {
      if (propIsEnumerable.call(from, symbols[i])) {
        assignKey(to, from, symbols[i]);
      }
    }
  }

  return to;
}

module.exports = function deepAssign(target) {
  target = toObject(target);

  for (var s = 1; s < arguments.length; s++) {
    assign(target, arguments[s]);
  }

  return target;
};

module.exports = {
  assign: assign,
}

