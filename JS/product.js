
let cardSection = document.getElementById('card-section');
let card = '';
const fetchData = async (query) => {
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '063b207368mshb7fbbbccbc496a5p1de4e9jsn61b34a3efa93',
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.data.products);

    for (i = 0; i < 8; i++) {
        console.log(result.data.products[i]);
        card += `

    <div class="col-lg-3 col-md-2 col-1 product card rounded-lg" style="width: 18rem;">
        <img src="${result.data.products[i].product_photo}" class="img-height card-img-top" alt="Cartoon Astronaut T-Shirt">
            <div class="card-body">
                <h5 class="card-title">${result.data.products[i].product_title}</h5>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="ratings">
                                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(result.data.products[i].product_star_rating))}${result.data.products[i].product_star_rating % 1 ? '<i class="fas fa-star-half-alt"></i>' : ' '}${'<i class="fa-regular fa-star"></i>'.repeat(5 - Math.ceil(result.data.products[i].product_star_rating))}

                    </div>
                    <a href="#" class="btn" data-id = > <i class="fas fa-shopping-cart"></i> </a>
                </div>
                <p class="card-text price">${result.data.products[i].product_price}</p>
            </div>
    </div>

        `
    }
    cardSection.innerHTML = card;

};

// Call the function with "Clothing" as the search term
fetchData('Clothing');

