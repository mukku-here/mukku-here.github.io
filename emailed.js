var days = 7;
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var x = document.getElementById('myInput');
    days = x.value;
    api();
})
function api() {
    let url = `https://api.nytimes.com/svc/mostpopular/v2/emailed/${days}.json?api-key=0K2MwnYUimIovGP3ZY78CEJ82AjN7Gz1`
    let newsAccordian = document.getElementById('accordionPanelsStayOpenExample');
    fetch(url).then((res) => res.json()).then(data => {
        let datajs = data.results;
        let news_html = "";
        
        
        datajs.forEach(
            (article, index) => {

                if(article.media[0]==null)
                {
                    return
                }
                let something=article.media[0]["media-metadata"][2].url;
                console.log(something);
                
                
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
                            <div class="imageBox"><img src="${something}" alt="Image" width=75%></div>
                            <div>Image: ${article.media[0].caption}</div>
                                <div>${article.abstract}...<a href="${article.url}" target="_blank" >Read more</a></div>
                            </div>
                        </div>
                    </div>`
                news_html += news_og;

            });
        newsAccordian.innerHTML = news_html;
        newsAccordian.style.fontFamily = "Times New Roman, serif"
        newsAccordian.style.fontSize = "large";

    })
}
api();

 
    
