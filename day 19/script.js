const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const fastestCars = [
    {
        car: 'Devel Sixteen',
        speed: '550+ km/h'
    },
    {
        car: 'SSC Tuatara',
        speed: '531 km/h'
    },
    {
        car: 'Koenigsegg Jesko Absolut',
        speed: '530 km/h'
    },
    {
        car: 'Hennessey Venom F5',
        speed: '500+ km/h'
    },
    {
        car: 'Bugatti Bolide',
        speed: '490 km/h'
    },
    {
        car: 'Bugatti Chiron',
        speed: '484 km/h'
    },
    {
        car: 'C zinger 21c',
        speed: '432 km/h'
    },
    {
        car: 'Koenigsegg Agera RS',
        speed: '447 km/h'
    },
    {
        car: 'Hennessey Venom GT',
        speed: '435 km/h'
    },
    {
        car: 'Bugatti Veyron',
        speed: '431 km/h'
    },
];

const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM 
function createList() {
    [...fastestCars]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((fastestCar,index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);
        listItem.setAttribute('data-speed', fastestCar.speed);
        
        listItem.innerHTML = `
            <span class="number"> ${index + 1}</span>
            <div class="draggable" draggable="true">
                <p><span class="car-name">${fastestCar.car}</span> <span class="speed">${fastestCar.speed}</span></p>
                <i class="fas fa-grip-lines"></i>
            </div>    
        `;
        listItems.push(listItem);
        draggableList.appendChild(listItem);
    });

    addEventListeners();
}



function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    });
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    // console.log(dragStartIndex);
  }
  
  function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
  }
  
  function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
  }
  
  function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
  }
  
  function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    // console.log(dragEndIndex);
    swapItems(dragStartIndex, dragEndIndex);
  
    this.classList.remove('over');
  }

  // Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
  
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

    checkOrder();
  }

  // Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const speedCon = listItem.querySelector('.speed');
    const carName = listItem.querySelector('.car-name').innerText.trim();

    if (carName !== fastestCars[index].car) {
        listItem.classList.add('wrong');
        speedCon.style.visibility = 'hidden';
    } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');
        speedCon.style.visibility = 'visible';
    }
  });
}

check.addEventListener('click', checkOrder);