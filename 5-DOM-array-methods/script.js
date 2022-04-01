const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0];

    const newUser =  {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);    
}

// Add new obg to array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM (providedData = data) {
    //clear DOM
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(user => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
        main.appendChild(element);
    });
}

// Format money 
function formatMoney (number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double money 
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });
    updateDOM();
}

// sort by money 
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// filter only millionares 
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

// calculate wealth of users
function calculateWealth() {
    total = data.reduce((acc, user) => (acc += user.money), 0);
    main.innerHTML += `<h3><strong>Total Wealth</strong> ${ formatMoney(total)} </h3>`;
} 
// Event Listeners 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)