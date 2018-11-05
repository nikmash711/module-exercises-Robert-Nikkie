'use strict';
/* global cuid */

const Item = (function(){
  function validateName(name) {
    //maybe have a function that checks somehow if the string is just spaces?...
    if(!name) {
      throw new Error('Name does not exist');
    }
  }
  
  function create(name) {
    return {
      id: cuid(),
      name,
      checked: false,
    };
  }

  return {validateName, create};
}()); 
