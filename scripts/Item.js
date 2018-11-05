'use strict';
/* global cuid */

const Item = (function(){
  function validateName(name) {
    //this validates that name is true...come back to this if error
    if(!name) {
      throw new Error('Name does not exist');
    }
  }
  
  function create(name) {
    return {
      id: cuid(),
      name,
      checked: false,
    }
  }

  return {validateName, create};
}()); 
