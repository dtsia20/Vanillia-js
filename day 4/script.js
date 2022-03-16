function calculate() {
    fetch('items.json')
    .then(res => res.json())
    .then(data  => console.log(data[0].text));
}

calculate();