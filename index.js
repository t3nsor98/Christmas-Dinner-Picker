const btnEl = document.getElementById("btn");
const imgEl = document.getElementById("food-pic");
const titleEl = document.getElementById("title");
const ingredientsEl = document.getElementById("ingredients");
const servingsEl = document.getElementById("servings");
const instructionsEl = document.getElementById("instructions");
const displayEl = document.getElementById("food");
// Food Names
const vegFoodArray = ["Vegetable Biryani", "Palak Paneer", "Chana Masala", "Aloo Gobi", "Dal Tadka"];
const nonVegFoodArray = ["Chicken Biryani", "Butter Chicken", "Rogan Josh", "Lamb Korma", "Fish Curry"];

function suggestIndianFood(isVegetarian, numOfPeople) {
    if (isVegetarian) {
        if (numOfPeople <= 2) {
            return vegFoodArray[0];
        } else if (numOfPeople <= 4) {
            return vegFoodArray[1];
        } else if (numOfPeople <= 6) {
            return vegFoodArray[2];
        } else if (numOfPeople <= 8) {
            return vegFoodArray[3];
        } else if (numOfPeople > 8) {
            return vegFoodArray[4];
        }
    } else {
        if (numOfPeople <= 2) {
            return nonVegFoodArray[0];
        } else if (numOfPeople <= 4) {
            return nonVegFoodArray[1];
        } else if (numOfPeople <= 6) {
            return nonVegFoodArray[2];
        } else if (numOfPeople <= 8) {
            return nonVegFoodArray[3];
        } else if (numOfPeople > 8) {
            return nonVegFoodArray[4];
        }
    }
}




btnEl.addEventListener("click", function () {
    const guestNum = document.getElementById("num-input").value;
    const isVegetarian = document.getElementById("vegetarian-input").checked;
    const suggestedFood = suggestIndianFood(isVegetarian, guestNum);
    imgEl.src = `./image/${suggestedFood.replace(/\s/g, '')}.jpg`;
    displayEl.innerText = suggestedFood;

    // lets setup the API
    const apiKey = "h/Ig48/zxpf083tO4DZgyg==eKkv49i06zx2Qm1f";
    fetch(`https://api.api-ninjas.com/v1/recipe?query=${suggestedFood}`, {
        headers: {
            "X-Api-Key": apiKey,
        },
    }).then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return res.json();
    }).then(data => {
        titleEl.innerText = data[0].title;
        ingredientsEl.innerText = data[0].ingredients;
        servingsEl.innerText = data[0].servings + "Please adjust portions according to person count";
        instructionsEl.innerText = data[0].instructions;
    })

})



