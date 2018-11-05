'use strict';
/*global Item, cuid*/
// eslint-disable-next-line no-unused-vars
const store = (function () {
  const items = [
    { id: cuid(), name: 'apples', checked: false },
    { id: cuid(), name: 'oranges', checked: false },
    { id: cuid(), name: 'milk', checked: true },
    { id: cuid(), name: 'bread', checked: false }
  ];
  const hideCheckedItems = false;
  const searchTerm = '';

  //finding the id that matches an item in the store items array, and this returns the item
  function findById(id) {
    return store.items.find(item => item.id === id);
  }

  //why are we not rendering in the below function?
  function addItem(name) {
    try {
      Item.validateName(name);
      this.items.push(Item.create(name));
    } catch(error) {
      console.log(`${error.message}`);
    }
  }

  //QUESTION: why use this -- works without it? 
  function findAndToggleChecked(id) {
    let item = this.findById(id);
    item.checked = !item.checked;
  } 
  
  function findAndUpdateName(id, newName) {
    try {
      Item.validateName(newName);
      this.findById(id).name = newName;
    } catch(error) {
      console.log(`Cannot update name: ${error.message}`);
    }
  }

  function findAndDelete(id) {
    //this.items = this.items.filter(item => item.id !== id);
    let index = this.items.findIndex(item => item.id === id);
    this.items.splice(index, 1);
  }

  function toggleCheckedFilter(){
    this.hideCheckedItems = !this.hideCheckedItems;
  }

  function setSearchTerm(searchTerm){
    this.searchTerm = searchTerm;
  }

  return {items, hideCheckedItems, searchTerm, findAndDelete, findAndUpdateName, findAndToggleChecked, findById, addItem, toggleCheckedFilter, setSearchTerm};
}() );
