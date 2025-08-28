const productApi_Url = "https://dummyjson.com/products?limit=20";
const productSearch_Url = "https://dummyjson.com/products/search?q=";

const productSection = document.querySelector(".products-section");
const empty = document.querySelector(".empty");
const footerSpan = document.querySelector("footer span");
// Get product API
const getProducts = async (url) => {
  empty.style.display = "none";
  productSection.innerHTML = "";
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  if (data.products.length > 0) {
    displayProducts(data.products);
  } else {
    empty.style.display = "block";
  }
};
getProducts(productApi_Url);

// Display Product
function displayProducts(products) {
  productSection.innerHTML = "";
  products.forEach((product) => {
    const { availabilityStatus, price, thumbnail, title } = product;
    const productDiv = document.createElement("div");
    productDiv.className =
      "products max-w-[300px] bg-white rounded-lg   shadow-sm hover:shadow-md ";
    productDiv.innerHTML = `<img
            src="${thumbnail}"
            class="w-full rounded-lg"
            alt="${title}"
          />
          <div class="p-2">
            <h3 class="font-bold text-blue-900 mb-2">${title}</h3>
            <span
              class="font-medium text-white bg-blue-600 px-4 py-1 rounded-lg"
              >$${price}</span
            >
            <p class="font-medium  mt-2 ${assignClass(
              availabilityStatus
            )}">${availabilityStatus}</p>
          </div>
          `;
    productSection.append(productDiv);
  });
}
function assignClass(status) {
  return status === "In Stock" ? "text-green-500" : "text-red-500";
}
const year = new Date().getFullYear();
footerSpan.textContent = year;

const searchInput = document.querySelector("input");
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = searchInput.value.trim();
  if (inputValue) {
    getProducts(productSearch_Url + inputValue);
    searchInput.value = "";
  }
});
