const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const  localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transcactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add new transaction 
function addTransaction(e) {
    e.preventDefault();

    if(amount.value.trim() === '') {
        alert('Please enter a text and an amount')
    } else {
       const transaction = {
           id: generateID(),
           text: text.value ? text.value : '-',
           amount: +amount.value
       };
       
       transcactions.push(transaction);
       

       updateValues();

       updateLocalStorage();

       addTransactionDOM(transaction);
       
       text.value = '';
       amount.value = '';
    
    }
   }


// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}
// Add transaction to DOM list 
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}


// update the balance 
function updateValues() {
    const amounts = transcactions.map(transcaction => transcaction.amount);

    const total = amounts.reduce((a, b) => a + b, 0).toFixed(2);

    const income = amounts
                    .filter(item => item > 0)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2);
    
    const expenses = (amounts
                    .filter(item => item < 0)
                    .reduce((a, b) => a + b, 0)
                    .toFixed(2)) * -1;

    balance.innerHTML = '$'+total;
    money_plus.innerHTML = '+$'+ income;
    money_minus.innerHTML = '-$'+ expenses;

   
}

// remove transaction from list 
function removeTransaction(id) {
    transcactions = transcactions.filter(transcaction => transcaction.id !== id);

    updateLocalStorage();
    
    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transcactions));
}
// Initial app 
function init() {
    list.innerHTML = '';

    transcactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Event listeners 
form.addEventListener('submit', addTransaction)