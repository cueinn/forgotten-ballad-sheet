// helper functions
function log(message) {console.log(message)}

const instrument = document.getElementById('instrument')
const instrumentImgInput = document.getElementById("instrumentImgInput")
const heartsMax = document.getElementById("heartsMax")
const heartsButton = document.getElementById("heartsButton")
const heartsWrap = document.querySelector(".heartsWrap")
const modal = document.getElementById('modal')
const newItemImage = document.getElementById('newItemImage')
const newItemName = document.getElementById('newItemName')
const newItemAmount = document.getElementById('newItemAmount')
var newItemUploadedImage = ""

instrumentImgInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    instrument.style.backgroundImage = `url(${uploaded_image})`
  });
  reader.readAsDataURL(this.files[0]);
})

function editHearts() {
  const heartsMaxValue = heartsMax.value
  let heartsChecks = `<div><input id="heart1" name="hearts" type="checkbox" checked><label for="heart1">♥</label></div>`
  for(let i = 1; i < heartsMaxValue; i++) {
      heartsChecks += `<div><input id="heart${i+1}" name="hearts" type="checkbox" checked><label for="heart${i+1}">♥</label></div>`
  }
  heartsWrap.innerHTML = heartsChecks
}



// Drag and drop functions
const itemSlots = document.querySelectorAll('.itemSlot')
const items = document.querySelectorAll('.item')

items.forEach(item => {
  item.addEventListener('dragstart', dragstart)
  item.addEventListener('dragend', dragend)
})

itemSlots.forEach(slot => {
  slot.addEventListener('dragover', dragover)
  slot.addEventListener('dragleave', dragleave)
  slot.addEventListener('drop', drop)
  slot.addEventListener('click', createItem)
})

function dragstart() {
  itemSlots.forEach(slot => slot.classList.add('highlight'))
  
  this.classList.add('dragging')
}

function dragend() {
  itemSlots.forEach(slot => slot.classList.remove('highlight'))
  this.classList.remove('dragging')
}

function dragover() {
  this.classList.add('over')

  const draggedCard = document.querySelector('.dragging')
  this.appendChild(draggedCard)
}

function dragleave() {
  this.classList.remove('over')
}

function drop() {
  this.classList.remove('over')
}

// Create new items
function createItem() {
  
  if(!this.hasChildNodes()) {

    let newItem = document.createElement('div')
    newItem.classList.add('item')
    newItem.setAttribute('draggable', 'true')
    newItem.style.backgroundImage = `url(${newItemUploadedImage})`

    let counter = document.createElement('div')
    counter.classList.add('itemCounter')
    counter.innerText = newItemAmount.value
    
    let itemName = document.createElement('div')
    itemName.classList.add('itemName')
    itemName.innerText = newItemName.value

    newItem.appendChild(counter)
    newItem.appendChild(itemName)
  
    this.appendChild(newItem)
    newItem.addEventListener('dragstart', dragstart)
    newItem.addEventListener('dragend', dragend)
  }

}

newItemImage.addEventListener('change', function(){
  const reader = new FileReader()

  reader.addEventListener("load", function(){
    var newItemUploadedImage = reader.result
  })
})

function openModal() {
  modal.classList.add('on')
}
function closeModal() {
  modal.classList.remove('on')
}