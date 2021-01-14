const addItems = document.querySelector('.add-items')
const itemsList = document.querySelector('.plates')

//if there is an item in local storage get it, else fall back to an empty array
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem (e) {
  //prevent the form from submitting
  e.preventDefault()

  //get the value typed into the form input
  const text = this.querySelector('[name=item]').value

  //create an object to store the value typed into the input and set the state to false
  const item = {
    text,
    done: false
  }
  items.push(item)
  populateList(items, itemsList)
  //store the items array in localstorage
  localStorage.setItem('items', JSON.stringify(items))

  //clear the input box
  this.reset()
}

function populateList (plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${
        plates.done ? 'checked' : ''} />
        <label for="item${i}">${plate.text} </label>
        </li>
        `;
    }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return //only show this if it is an input

  //set the state of an item to true or false
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

//on page load
populateList(items, itemsList);
