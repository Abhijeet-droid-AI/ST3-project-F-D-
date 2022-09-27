// https://dummyjson.com/products
let productsArr = [];

const listElements = document.querySelector('#list');
const search_itemsElement = document.querySelector('#search_items');
let cartContainer = document.getElementsByTagName('tbody')[0];
let quantityFields = document.getElementsByClassName('num');
let delete_buttons = document.getElementsByClassName('uk-button-danger');
console.log('hello');

//Function helps to Autocomplete the search bar
function loadData(products, element) {
	console.log(products, element);
	if (products) {
		element.innerHTML = '';
		let innerElement = '';
		products.forEach((data) => {
			innerElement += `
			<li>${data.title}</li>`;
		});
		element.innerHTML = innerElement;
	}
}
function filterData(productsArr, searchText) {
	return productsArr.filter((x) =>
		x.title.toLowerCase().includes(searchText.toLowerCase())
	);
}

search_itemsElement.addEventListener('input', function () {
	console.log('Search');
	const sortData = filterData(productsArr, search_itemsElement.value);

	loadData(sortData, listElements);
});

//function to show all products
function renderProducts(products) {
	let allproductsTemplate = '';
	const rootele = document.getElementById('prodsec');
	for (let i = 0; i < products.length; i++) {
		console.log(products[i]);
		let title = products[i].title;
		let id = products[i].id;
		let description = products[i].description;
		let thumbnail = products[i].thumbnail;
		let price = products[i].price;

		let template = `<div class = "col-md-4 col-lg-4">
            <div class="card" style="width: 18rem; border-radius: 12px; box-shadow:2px 2px #AAC4FF;">
                <img   src="${thumbnail}" class="card-img-top" alt="..." style="width: 17em; height:11em;">
                <div class="card-body">
                  <h3 class="card-title">${title}</h3>
                  <h4 class="card-text">${'$' + price}</h4>
                  <a href="#cart" class="btn btn-primary">Add to Cart</a>
                </div>
              </div>
          </div>`;
		allproductsTemplate += template;
	}
	rootele.innerHTML = allproductsTemplate;

	let addToCartButtons = document.getElementsByClassName('btn-primary');
	// picking up all the Add-To-Cart buttons
	for (let i = 0; i < addToCartButtons.length; i++) {
		addToCartButtons[i].addEventListener('click', addToCart);
	}
}

let sortData;
//fetching data from api
function fetchData() {
	let allproductsTemplate = '';
	fetch('https://dummyjson.com/products')
		.then((res) => res.json())
		.then((data) => {
			productsArr = data.products;
			sortData = filterData(productsArr, search_itemsElement.value);
			console.log('sort', sortData);
			renderProducts(data.products);

			loadData(sortData, listElements);
		});
}

fetchData();

//fucntion for searching of the products
function search(val) {
	console.log();
	let filterProductsList = productsArr.filter((product) =>
		product.title.toLowerCase().includes(val.toLowerCase())
	);
	renderProducts(filterProductsList);
}

document
	.getElementById('search_items')
	.addEventListener('change', (e) => search(e.target.value));

// This function helps to add items to our cart
function addToCart(event) {
	let itemContainer = document.createElement('tr');
	let btn = event.target;
	let btnGrandParent = btn.parentElement.parentElement;
	console.log(btnGrandParent);
	let btnParent = btn.parentElement;
	let itemImage = btnGrandParent.children[0].src;
	let itemName = btnParent.children[0].innerText;
	let itemPrice = btnParent.children[1].innerText;

	itemContainer.innerHTML = `
    <td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
`;

	cartContainer.append(itemContainer);

	// Accessing individual quantity fields
	for (let i = 0; i < quantityFields.length; i++) {
		quantityFields[i].value = 1;
		quantityFields[i].addEventListener('change', totalCost);
	}

	// Accessing individual quantity fields
	for (let i = 0; i < delete_buttons.length; i++) {
		delete_buttons[i].addEventListener('click', removeItem);
	}

	grandTotal();
}

// This function helps to multiply the quantity and the price
function totalCost(event) {
	let quantity = event.target;
	quantity_parent = quantity.parentElement.parentElement;
	price_field = quantity_parent.getElementsByClassName('item-price')[0];
	total_field = quantity_parent.getElementsByClassName('total-price')[0];
	price_field_content = price_field.innerText.replace('$', '');
	total_field.children[0].innerText =
		'$' + quantity.value * price_field_content;
	grandTotal();
	if (isNaN(quantity.value) || quantity.value <= 0) {
		quantity.value = 1;
	}
}

// This function helps to add up the total of the items
function grandTotal() {
	let total = 0;
	let grand_total = document.getElementsByClassName('grand-total')[0];
	all_total_fields = document.getElementsByClassName('total-price');
	for (let i = 0; i < all_total_fields.length; i++) {
		all_prices = Number(all_total_fields[i].innerText.replace('$', ''));
		total += all_prices;
	}
	grand_total.children[0].innerText = '$' + total;
	grand_total.children[0].style.fontWeight = 'bold';
	console.log(total);
}

//function to remove the products from the cart
function removeItem(event) {
	del_btn = event.target;
	del_btn_parent = del_btn.parentElement.parentElement;
	del_btn_parent.remove();
	console.log(del_btn);
	grandTotal();
}
function showList() {
	console.log('show');
	document.getElementById('list').style.display = '';
}
function hideList() {
	console.log('hide');
	document.getElementById('list').style.display = 'none';
}

function mouseOv() {
	document.getElementById('profile').style.color = 'red';
	document.getElementById('profile').style.textDecoration = 'underline';
}

function mouseOu() {
	document.getElementById('profile').style.color = 'black';
	document.getElementById('profile').style.textDecoration = 'none';
}
function mouseO() {
	document.getElementById('bag').style.color = 'red';
	document.getElementById('bag').style.textDecoration = 'underline';
}

function mouseOt() {
	document.getElementById('bag').style.color = 'black';
	document.getElementById('bag').style.textDecoration = 'none';
}
function mouseOver() {
	document.getElementById('wish').style.color = 'red';
	document.getElementById('wish').style.textDecoration = 'underline';
}

function mouseOut() {
	document.getElementById('wish').style.color = 'black';
	document.getElementById('wish').style.textDecoration = 'none';
}
