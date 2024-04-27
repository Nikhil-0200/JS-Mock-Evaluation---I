let display = document.getElementById("display");
let categoryFilter = document.getElementById("categoryFilter");
let priceFilter = document.getElementById("priceFilter");
let searchDiv = document.getElementById("searchDiv");

let searchedItem = "";

searchDiv.addEventListener("input", () => {
  searchedItem = searchDiv.value.trim();

  searchFetch(searchedItem)
});

// search functionality

async function searchFetch(searchedItem) {
  let res = await fetch(`https://fakestoreapi.com/products`);
  let finalData = await res.json();

  let filteredData = finalData.filter((product)=>{
    return product.title.toLowerCase().includes(searchedItem.toLowerCase())
  })

  showData(filteredData)

}

// categoryFilter functionality

categoryFilter.addEventListener("change", () => {
  let selectedData = `products/category/${categoryFilter.value}`;

  if (selectedData === `products/category/`) {
    selectedData = "products";
  }

  allProducts(selectedData);
});

async function allProducts(selectedData) {
  let res = await fetch(`https://fakestoreapi.com/${selectedData}`);
  let finalData = await res.json();

  showData(finalData);
}

async function fetchData() {
  let res = await fetch(`https://fakestoreapi.com/products`);
  let finalData = await res.json();

  showData(finalData);
}

fetchData();


// Displaying Data on UI

function showData(fetchedData) {
  display.innerHTML = "";

  fetchedData.forEach((element) => {
    let itemCard = document.createElement("div");
    itemCard.id = "itemCard";

    let imgDiv = document.createElement("div");
    imgDiv.id = "imgDiv";

    let img = document.createElement("img");
    img.src = element.image;

    let title = document.createElement("h1");
    title.textContent = element.title;

    let price = document.createElement("h1");
    price.textContent = element.price;

    imgDiv.append(img);
    itemCard.append(imgDiv, title, price);

    display.append(itemCard);
  });

  
//   sort price functionality

  priceFilter.addEventListener("change", () => {
    let copiedArray = fetchedData;

    if (priceFilter.value === "asc") {
      copiedArray.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (priceFilter.value === "desc") {
      copiedArray.sort((a, b) => {
        return b.price - a.price;
      });
    }

    showData(copiedArray);
  });
}
