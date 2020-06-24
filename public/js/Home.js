class Home {
	static fetchMenus =  async () => {
        try {
            let response = await axios.get("/api/menu")
            document.querySelector('#menu-container').innerHTML = response.data.map(menu => `
            <div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-3">
                <img
                    src="${menu.thumbnail}"
                    width="100%"
                    alt="logo"
                />
            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col">
                        <h4>
                            ${menu.hotelName}
                        </h4>
                    </div>
                    <div class="col">
                        ${menu.hotelContact}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h5 class="card-title">
                            ${menu.name}
                        </h5>
                    </div>
                    <div class="col">
                        <h4>Price: ${menu.price} </h4>
                    </div>
                </div>
                <small>Cuisine: ${menu.cuisine} </small>
                <p>Serving for: ${menu.serving} </p>
                <p>Ingredients: ${menu.ingredients.toString()} </p>
            </div>
        </div>
    </div>
</div>
            `).join('');
        } catch (error) {
            console.log(error);   
        }
    };
}

export default Home;
