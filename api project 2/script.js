const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDtailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById('recipe-close-btn');



searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDtailsContent.parentElement.classList.remove('showRecipe');
})

function getMealList() {
    let searchInputText = document.getElementById('search-input').value.trim();
    //console.log(searchInputText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`).then(response => response.json()).then(data => {
        console.log(data);
        let html = '';
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `<div class="meal-item" data-id ="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>`;
            });
            mealList.classList.remove('notFound');
        } else {
            html = "Sorry We didn't find your food!";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });

}

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItems = e.target.parentElement.parentElement;
        console.log(mealItems);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItems.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModel(data.meals));
    }
}

function mealRecipeModel(meal) {
    console.log(meal);
    meal = meal[0];
    let html = ` <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3>Instructions:</h3>
                        
                        <p>${meal.strInstructions}</p>
                    </div>
                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="recipe-link">
                        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                    </div>`;
    mealDtailsContent.innerHTML = html;
    mealDtailsContent.parentElement.classList.add('showRecipe');
}