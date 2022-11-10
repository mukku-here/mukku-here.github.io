var section = 'all';
var source = 'nyt'


const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var x = document.getElementById('myInput');
    section = x.value;
    api();
})
function api() {
    let url = `https://api.nytimes.com/svc/news/v3/content/${source}/${section}.json?api-key=0K2MwnYUimIovGP3ZY78CEJ82AjN7Gz1`
    let newsAccordian = document.getElementById('accordionPanelsStayOpenExample');
    fetch(url).then((res) => res.json()).then(data => {
        let datajs = data.results;
        let news_html = "";
        datajs.forEach(
            (article, index) => {
                var arr = new Array(); //for url of best pic 
                var arr1 = new Array(); //for caption

                let media = article.multimedia;
                if (media == null) {
                    return;
                }

                media.forEach((it) => {
                    if (it == null) {
                        return;
                    }
                    arr.push(it.url);
                })
                //console.log(arr);
                media.map((it) => {
                    if (it == null) {
                        return;
                    }
                    arr1.push(it.caption);

                })
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
                            <div class="imageBox"><img src="${arr[2]}" alt="Image" width=75%></div>
                            <div>Image: ${arr1[2]}</div>
                                <div>${article.abstract}...<a href="${article.short_url}" target="_blank" >Read more</a></div>
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

$(function () {
    var suggestions = new Array();
    let url = "https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=0K2MwnYUimIovGP3ZY78CEJ82AjN7Gz1"
    fetch(url).then((res) => res.json()).then(data => {
        let datajs1 = data.results;

        datajs1.forEach((iterator) => {
            suggestions.push(iterator.section);
        })

    });
    $("#myInput").autocomplete({
        source: suggestions
    });
});

