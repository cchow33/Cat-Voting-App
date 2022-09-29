const cat_url = "https://api.thecatapi.com/v1/images/search?limit=10";
const cat_img = document.getElementById("cat-img");
const yes_btn = document.getElementById("yes-btn");
const no_btn = document.getElementById("no-btn");
const results_header = document.getElementById("results");
let curr_index = 0;
let dislikeCount = 0;
let likeCount = 0;


// Function to get data from api
async function get_data() {
  const response = await fetch(cat_url);
  const data = await response.json();
  return data;
}

// Function to go to the next image
function next_image(cat_array) {
  curr_index++;
  if (curr_index === cat_array.length) {
    results_header.innerText = `The final result is ${likeCount} likes and ${dislikeCount} dislikes`;
    yes_btn.disabled = true;
    no_btn.disabled = true;
    return;
  }
  cat_img.src = cat_array[curr_index]["url"];
}

// Function vote 'NO'
function dislikes(cat_array) {
    dislikeCount++
    next_image(cat_array);
}

// Function vote 'YES'
function likes(cat_array) {
    likeCount++;
    next_image(cat_array);
}

(async () => {
  console.log("yes_btn");
  const cat_array = await get_data();
  cat_img.src = cat_array[curr_index]["url"];
  yes_btn.addEventListener("click", () => likes(cat_array));
  no_btn.addEventListener("click", () => dislikes(cat_array));
})();
