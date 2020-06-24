import Authenticate from "./Authenticate.js";
import Hotel from "./Hotel.js";
import Home from "./Home.js";


Authenticate.isLoggedIn();



// Hotel Object
let hotel;

if (localStorage.user) {
	hotel = new Hotel(JSON.parse(localStorage.user));
}

// register form
let registerForm = document.getElementById("register-form");
// submit event
registerForm &&
	registerForm.addEventListener("submit", (e) =>
		Authenticate.signup(e, registerForm)
	);

// login form
let loginForm = document.getElementById("login-form");
// submit event
loginForm &&
	loginForm.addEventListener("submit", (e) =>
		Authenticate.login(e, loginForm, hotel)
	);

// Signout event
let logoutBtn = document.getElementById("logout-btn");
logoutBtn && logoutBtn.addEventListener('click', Authenticate.logout)

// Add menu method
let addmenu = document.getElementById("addmenu-form");

addmenu &&
	addmenu.addEventListener("submit", e => hotel.addMenu(e, addmenu));





// Home profile data 
if(Authenticate.checkLoggedIn()) {
	document.querySelector('.profile-card-logo').src = hotel.logo;
	document.querySelector('#hotel-name').innerHTML = hotel.name;
	document.querySelector('#hotel-contact').innerHTML = hotel.contact;
	document.querySelector('#hotel-description').innerHTML = hotel.description;

	// Display menus
	Home.fetchMenus()
}


