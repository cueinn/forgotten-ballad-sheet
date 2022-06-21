// helper functions
function log(message) {console.log(message)}

const instrument = document.getElementById('instrument')
const instrumentImgInput = document.getElementById("instrumentImgInput")
const heartsMax = document.getElementById("heartsMax")
const heartsButton = document.getElementById("heartsButton")
const heartsWrap = document.querySelector(".heartsWrap")
const modal = document.getElementById('modal')
const modalContainer = document.getElementById('modalContainer')
const newItemName = document.getElementById('newItemName')
const newItemAmount = document.getElementById('newItemAmount')
const createItemButton = document.getElementById('createItemButton')
const iconImages = document.querySelectorAll('.iconImage')


// Instrument image upload
instrumentImgInput.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    instrument.style.backgroundImage = `url(${uploaded_image})`
  });
  reader.readAsDataURL(this.files[0]);
})

instrument.addEventListener("click", function(){
    instrumentImgInput.click()
})


// Edit the max of hearts
function editHearts() {
  const heartsMaxValue = heartsMax.value
  let heartsChecks = `<div class="heartItem">
                        <input class="heartInput" id="heart1" name="hearts" type="checkbox" checked>
                        <label class="heartLabel" for="heart1">
                          <img class="heartIconFilled" src="./src/img/heart-filled.svg" alt="Heart">
                          <img src="./src/img/heart-empty.svg" alt="Heart">
                        </label>
                      </div>`
  for(let i = 1; i < heartsMaxValue; i++) {
      heartsChecks += `<div class="heartItem">
                        <input class="heartInput" id="heart${i+1}" name="hearts" type="checkbox" checked>
                        <label class="heartLabel" for="heart${i+1}">
                          <img class="heartIconFilled" src="./src/img/heart-filled.svg" alt="Heart">
                          <img src="./src/img/heart-empty.svg" alt="Heart">
                        </label>
                      </div>`
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
  slot.addEventListener('click', openModal)
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

//Modal control
function openModal() {
  if(!this.hasChildNodes()){
    modal.classList.add('on')
    itemSlots.forEach(slot => {
      slot.classList.remove('targetSlot')
    })
    this.classList.add('targetSlot')
  }
}
function closeModal(event) {
  modal.classList.remove('on')
  event.preventDefault
}
function clearModal() {
  newItemAmount.value = 1
  newItemName.value = ''
  document.querySelector('.iconImage.selected').classList.remove('selected')
}


const closeButton = document.getElementById('closeButton')   
closeButton.addEventListener('click', closeModal)

// Create new items
createItemButton.addEventListener('click', createItem)

function createItem(event) {

  event.preventDefault()

  const iconSelected = document.querySelector('.iconImage.selected')
  const iconSelectedSrc = iconSelected.src
  
  let newItem = document.createElement('div')
  newItem.classList.add('item')
  newItem.setAttribute('draggable', 'true')
  newItem.addEventListener('dragstart', dragstart)
  newItem.addEventListener('dragend', dragend)
  newItem.style.backgroundImage = `url(${iconSelectedSrc})`

  let amount = document.createElement('input')
  amount.type = 'number'
  amount.classList.add('itemAmount')
  amount.value = newItemAmount.value
  
  let itemName = document.createElement('input')
  itemName.type = 'text'
  itemName.classList.add('itemName')
  itemName.value = newItemName.value

  let deleteItemButton = document.createElement('div')
  deleteItemButton.classList.add('deleteItemButton')

  let deleteItemButtonIcon = document.createElement('img')
  deleteItemButtonIcon.src = './src/img/xmark.svg'

  deleteItemButton.appendChild(deleteItemButtonIcon)
  deleteItemButton.addEventListener('click', deleteItem)
  
  newItem.appendChild(amount)
  newItem.appendChild(itemName)
  newItem.appendChild(deleteItemButton)

  const targetSlot = document.querySelector(".targetSlot")
  targetSlot.appendChild(newItem)
  
  clearModal()
  closeModal()

}

iconImages.forEach(icon => {
  icon.addEventListener("click", selectIconImage)
})

function selectIconImage() {
  iconImages.forEach(icon => {
    icon.classList.remove('selected')
  })
  this.classList.add('selected')
}

function deleteItem() {
  setTimeout(() => 
    this.parentElement.remove(), 1
  )
}