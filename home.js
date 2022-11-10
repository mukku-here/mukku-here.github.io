var section = 'home';
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    var x = document.getElementById('myInput');
    section = x.value;
    api();

})
function api() {
    let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=0K2MwnYUimIovGP3ZY78CEJ82AjN7Gz1`;
    let newsAccordian = document.getElementById('accordionPanelsStayOpenExample');
    fetch(url).then(Response => Response.json()).then(data => {
        let datajs = data.results;
        let news_html = "";
        datajs.map(
            (article, index) => {
                if (article.multimedia == null) {
                    return;
                }
                if(article.title==null)
                {
                    return;
                }
                
                

                let news_og = `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-heading${index}">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="true"
                                aria-controls="panelsStayOpen-collapse${index}">
                                ${article.title}
                            </button>
                        </h2>
                        
                        <div id="panelsStayOpen-collapse${index}" class="accordion-collapse collapse"
                            aria-labelledby="panelsStayOpen-heading${index}">
                            <div class="accordion-body">
                            <div><img src="${article.multimedia[0].url}" width=75%></div>
                            <div>Image: ${article.multimedia[0].caption}</div>
                                <div>${article.abstract}...<a href="${article.short_url}" target="_blank" >Read more</a></div>
                            </div>
                        </div>
                    </div>`
                news_html += news_og;
            });
        newsAccordian.innerHTML = news_html;
    })
}
api();
$(() => {
    var suggestions =
        [
            "arts", "automobiles", "books", "business", "fashion", "food", "health", "home", "insider", "magazine", "movies", "nyregion",
            "obituaries", "opinion",
            "politics",
            "realestate",
            "science",
            "sports",
            "sundayreview",
            "technology",
            "theater",
            "t - magazine",
            "travel",
            "upshot",
            "us",
            "world"
        ]
    $("#myInput").autocomplete({
        source: suggestions
    });

})