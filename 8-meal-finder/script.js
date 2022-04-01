const searchEl = document.getElementById('search'),
 random = document.getElementById('random'),
 submit = document.getElementById('submit'),
 resultHeading = document.getElementById('result-heading'),
 mealsEl = document.getElementById('meals'),
 single_mealEl = document.getElementById('single-meal');

// Get meals from API
function searchMeal(e) {
    e.preventDefault();

    //clear single meal
    mealsEl.innerHTML = '';
    single_mealEl.innerHTML = '';

    //get the search word
    const searchWord = searchEl.value;

    //search the api meals
    if (searchWord.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWord}`)
    .then(res => res.json())
    .then(data => {

            if(data.meals == null) {
                resultHeading.innerHTML = `<p>There are not results for ${searchWord}. Try Again!</p>`
            } else {
                resultHeading.innerHTML = `<h2> Results for: ${searchWord}`
                data.meals.forEach((meal, index) => {
                    mealsEl.innerHTML += `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `
                });
            }
       
    })
    }

}

// Fetch Random Meal from API 
function randomMeal() {
    // Clear meals and headings 
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    //Get random recipe
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDOM(meal);
    })
}
// get single meal 
function getMealById(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.meals[0]);
        const meal = data.meals[0];
        addMealToDOM(meal);
    });
} 

// Add meal to DOM 
function addMealToDOM(meal) {
    const ingredients = [];
    
    for (let i =1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(meal[`strIngredient${i}`]);
        } else {
            break;
        }
    }
    console.log(ingredients);
    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingr => `<li>${ingr}</li>`).join('')}
            </div>
        </div>
        `
    }
    
// Event listeners
 submit.addEventListener('submit', searchMeal)

 random.addEventListener('click', randomMeal)

 mealsEl.addEventListener('click', (e) => {
     e.preventDefault;
    const mealInfo = e.path.find(item => {
        if (item.classList) {
          return item.classList.contains('meal-info');
        } else {
          return false;
        }
      });
    
      if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
      }
 });
