const searchButton = document.getElementById("search-btn");
const foodList = document.getElementById("meal");
const mealContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

searchButton.addEventListener("click", getfoodList);
foodList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealContent.parentElement.classList.remove("showRecipe");
});

function getfoodList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        });
        foodList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        foodList.classList.add("notFound");
      }

      foodList.innerHTML = html;
    });
}