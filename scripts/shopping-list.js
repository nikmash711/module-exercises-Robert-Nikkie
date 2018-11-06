'use strict';

/* global store */

// eslint-disable-next-line no-unused-vars
const shoppingList = (function(){

  function generateItemElement(item) {
    //see if check is clicked to toggle the class name and button name
    const checkButton = item.checked ? 'uncheck' : 'check';
    const checkedClass = item.checked ? 'shopping-item__checked' : '';
    //see if the item is in editing mode, and if it is then return a string with a form, with save and cancel (different mode)
    if(item.edit===true){
      return `
    <form id="js-shopping-list-form"> <li class="js-item-index-element" data-item-unique="${item.id}">
      <input class="shopping-item js-shopping-item-edit ${checkedClass}" value = "${item['name']}"></input>
      <div class="shopping-item-controls">
        <button class="shopping-item-save js-item-save" type = "submit">
            <span class="button-label">save</span>
        </button>
        <button class="shopping-item-cancel js-item-cancel">
            <span class="button-label">cancel</span>
        </button>
      </div>
    </li> </form>`;
    }
    //if it's not in editiing mode, just return the basic item look
    return  `
  <li class="js-item-index-element" data-item-unique="${item.id}">
    <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item['name']}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">${checkButton}</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
       <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
      </button>
    </div>
  </li>`;
  }
  
  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  function render() {
    // Filter item list if store prop is true by item.checked === false
    let items = store.items;

    if (items.length===0){
      listIsEmpty();
    }
    //if its not empty, then display should = none for the p, and do everything else
    else{
      listIsNotEmpty();
    }

    if (store.hideCheckedItems) {
      items = items.filter(item => !item.checked);
    }
  
    // Filter item list if store prop `searchTerm` is not empty
    if (store.searchTerm) {
      items = items.filter(item => item.name.toLowerCase().includes(store.searchTerm.toLowerCase()));
    }
  
    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateShoppingItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
    $('.js-list-count').html(`${items.length} items`);
  }

  function listIsEmpty(){
    $('#list-empty-message').css('display','block');
  }
  
  function listIsNotEmpty(){
    $('#list-empty-message').css('display','none');
  }
  
  function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      $('.js-shopping-list-entry').val('');
      store.addItem(newItemName);
      render();
    });
  }
  
  function getItemIdFromElement(item) {
    return $(item).closest('.js-item-index-element').data('item-unique');
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.target);
      store.findAndToggleChecked(id);
      render();
    });
  }
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.target);
      // delete the item
      store.findAndDelete(id);
      // render the updated shopping list
      render();
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }
  
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.target).val();
      store.setSearchTerm(val);
      render();
    });
  }

  function handleNameEdit(){
    //listen for when user hits edit button
    $('.js-shopping-list').on('click', '.js-item-edit', event =>{
    //find out which element they hit edit for
      const uniqueID = getItemIdFromElement(event.target);
      console.log(event.target);
      console.log(uniqueID);
      const item = store.findById(uniqueID);
      //toggle the edit mode for this item
      store.toggleEditForItem(item);
      //re-render (in there it'll call generateItemElement which will return a different looking element box thats in edit mode)
      render();
    });
  }
  
  function handleSaveNameEdit(){
    //listen for when save is clicked
    $('.js-shopping-list').on('click', '.js-item-save', event =>{
      //prevent default (save is submit btn in form)
      event.preventDefault();
      //grab whatever the new name val in input is 
      const newName = $('.js-shopping-item-edit').val();
      //find out which item they're editing 
      const uniqueID = getItemIdFromElement(event.target);
      const item = store.findById(uniqueID);
      console.log(item);
      //change the name of the item they edited to the new val 
      store.changeName(item, newName);
      //toggle edit for the item
      store.toggleEditForItem(item);
      //render 
      render();
    });
  }
  
  function handleCancelNameEdit(){
    //listen for when cancel button is clicked 
    $('.js-shopping-list').on('click', '.js-item-cancel', event =>{
      //find the item 
      const uniqueID = getItemIdFromElement(event.target);
      const item = store.findById(uniqueID);
  
      //toggle edit for that item 
      store.toggleEditForItem(item);
  
      //render
      render();
    });
  }
  
  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleToggleFilterClick();
    handleShoppingListSearch();
    handleNameEdit();
    handleSaveNameEdit();
    handleCancelNameEdit();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
