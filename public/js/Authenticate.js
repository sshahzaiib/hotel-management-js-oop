class Authenticate {
	constructor() {
		this.signupData;
		this.loginData;
	}

	// Check user logged in
	static isLoggedIn = () => {
		if (localStorage.isLoggedIn && window.location.pathname === "/") {
			window.location.replace("/home");
		}

		if(window.location.pathname === '/home/' && !localStorage.isLoggedIn){
			window.location.replace("/")
		}

	};

	static checkLoggedIn = () => {
		if (localStorage.isLoggedIn && window.location.pathname === "/home/") {
			return true;
		} else {
			return false;
		}
	};

	// Signup static method
	static signup = (e, form) => {
		e.preventDefault();
		let formData = new FormData(form);
		let data = Object.fromEntries(formData);
		delete data.logo;
		this.signupData = data;

		setTimeout(() => {
			axios
				.post("/uploadImage", formData)
				.then((res) => {
					this.signupData.image = `/uploads/${res.data.file}`;
					axios.post("/api/hotel", this.signupData).then(() => {
						console.log("Signup successfully");
						window.location.replace("/login");
						form.reset();
					});
				})
				.catch((err) => {
					console.log(err.response);
				});
		}, 1500);
	};

	// Login static method
	static login = (e, form, hotel) => {
		e.preventDefault();
		$("#login-error").addClass("d-none");
		let formData = new FormData(form);
		this.loginData = Object.fromEntries(formData);

		setTimeout(() => {
			axios
				.get(
					`/api/hotel?email=${this.loginData.email}&password=${this.loginData.password}`
				)
				.then((res) => {
					if (!res.data.length) {
						$("#login-error").removeClass("d-none");
					} else {
						localStorage.isLoggedIn = true;
						localStorage.user = JSON.stringify(res.data[0]);
						$("#login-success").removeClass("d-none");
						window.location.replace("/home");
						hotel.setData(res.data[0]);
					}
				});
		}, 1500);
	};

	// Logout method
	static logout = () => {
		localStorage.clear();
		setTimeout(() => {
			window.location.replace("/")
		}, 1500);
	}
}

export default Authenticate;
