console.log("vferve");
let cardSection = document.getElementById('card-section');
let card = '';

const Shop = async (query) => {
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '063b207368mshb7fbbbccbc496a5p1de4e9jsn61b34a3efa93',
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);



        result.data.products.forEach(product => {
            card += `
            <div class="col-lg-3 col-md-2 col-1 product card rounded-lg" style="width: 18rem;">
        <img src="${product.product_photo}" class="img-height card-img-top" alt="Cartoon Astronaut T-Shirt">
            <div class="card-body">
                <h5 class="card-title">${product.product_title}</h5>
                <p class="card-text">${product.product_description || 'No description available'}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="ratings">
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.product_star_rating))}${product.product_star_rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ' '}${'<i class="fa-regular fa-star"></i>'.repeat(5 - Math.ceil(product.product_star_rating))}
                    </div>
                    <a href="" class="btn"><i class="fas fa-shopping-cart"></i></a>
                </div>
                <p class="card-text price">${product.product_price}</p>
            </div>
    </div>`;
        });
        cardSection.innerHTML = card;

    } catch (error) {
        console.error("Error fetching data:", error);
        cardSection.innerHTML = "<p>Error fetching data.</p>";
    }
};

Shop('Clothing');
