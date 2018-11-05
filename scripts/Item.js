'use strict';
/* global cuid */

// eslint-disable-next-line no-unused-vars
const Item = (function(){
  function validateName(name) {
    //added in my own logic so if they put a space (or more than one space) it's also wrong 
    if(name === '' || name[0] ===' ') {
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
