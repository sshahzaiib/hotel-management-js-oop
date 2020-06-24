class Hotel {
	constructor(data = {}) {
		this.data = data;
	}

    set setData(data) {
        this.data = data
    }


	get name() {
		return this.data.name;
	}

	get contact() {
		return this.data.contact;
	}

	get description() {
		return this.data.description;
	}

	get logo() {
		return this.data.image;
    }

    get logData() {
        console.log(this.data);
    }
    
    addMenu = (e, form) => {
        e.preventDefault();
		let formData = new FormData(form);
        let data = Object.fromEntries(formData);
        delete data.logo;
        let ingredients = [];
        for (var prop in data) {
            if (Object.prototype.hasOwnProperty.call(data, prop)) {
                // do stuff
                if(prop.includes('ingredients')) {
                    ingredients.push(data[prop])
                    delete data[prop]
                }
            }
        }
        
        let menuData = {
            hotelName: this.data.name,
            hotelContact: this.data.contact,
            ingredients,
            ...data
        }
        axios.post('/uploadImage', formData)
        .then(res => {
            menuData.thumbnail = `/uploads/${res.data.file}`;
            axios.post('/api/menu', menuData);
            $('#menuadd-success').removeClass('d-none');
            setTimeout(() => {
                window.location.replace('/home');
            }, 1500);
        })
        .catch(err => {
            console.log(err.response);
        })
    }

}

export default Hotel;
