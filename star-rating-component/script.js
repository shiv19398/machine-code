const starArr = document.querySelectorAll(".star");
const stars = document.getElementById("stars");
const totalRatings = document.getElementById("total-ratings");
const avgRating = document.getElementById("avg-rating");
let totalRating = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};
let totalRatingNo = 0;
let lastFilled=0;

function addSelectedClass(index){
    for (let i = 0; i <= index; i++) {
        starArr[i].classList.add("selected");
    }
}

function removeSelectedClass(){
    for (let i = 0; i < starArr.length; i++) {
        starArr[i].classList.remove("selected");
    }  
}

function handleClick(index) {
    removeSelectedClass();
    addSelectedClass(index);
}

function updateTotalRatings() {
  totalRatings.textContent = totalRatingNo;
  avgRating.textContent = calculateAverage(totalRating);
}

function calculateAverage(totalRating) {
  let numertor = 0,
    denominator = 0,
    avgRating;
  for (let key in totalRating) {
    numertor += key * totalRating[key];

    if (totalRating[key] !== 0) {
      denominator += totalRating[key];
    }
  }

  if (!denominator) {
    return 0;
  }
  avgRating = (numertor / denominator).toFixed(2);

  return avgRating;
}

stars.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList[0] === "star") {
    const star = target;
    const index = star.dataset.index;
    totalRatingNo++;
    totalRating[index] = totalRating[index] + 1;
    handleClick(index - 1);
    updateTotalRatings();

    //to have the information which was the last element has been selected.
    lastFilled=index-1;
  }

  e.stopPropagation();
});

// on mouse over, follow the same process as click
stars.addEventListener('mouseover', (e)=>{
    if(e.target.classList[0]==='star'){
        const star = e.target;
        const index = star.dataset.index;
        removeSelectedClass();
        addSelectedClass(index-1);
    }
})

stars.addEventListener('mouseout', (e)=>{
    if(e.target.classList[0]==='star'){
        removeSelectedClass();
        // we are adding selected class again here because, firstly we are removing class from each star.
        // to persist the selected stars, we have defined globally lastfilled variable.
        addSelectedClass(lastFilled);
    }
})