const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const clear = document.getElementById('clear');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;


//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}



//update count and total
function updateSelectCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); 
    const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf((seat)))
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }
  
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  
    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
  }

//movie select click event
movieSelect.addEventListener('change', e=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectCount();
})

//seat click event
container.addEventListener('click', e=> {
    if(
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ){
    e.target.classList.toggle("selected");
    }

    updateSelectCount();
})
//clear all selection seats
clear.addEventListener('click', e=> {
  const selectedSeatsAll = document.querySelectorAll('.row .seat.selected');
  selectedSeatsAll.forEach((seat) => {
    seat.classList.remove("selected");
  });
  count.innerText = 0;
  total.innerText = 0;
  localStorage.clear();
})
// Initial count and total
updateSelectCount();