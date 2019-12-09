const serverPath = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", function() {
    let allNews = [];

    window.addEventListener("online", function (event) {
        provider.get("news", (news) => {
            if (news) {
                allNews = news;
            }
            sendNewsToServer(allNews);
            showAllNews(allNews);
            provider.remove("news");
            allNews = [];
        });
    });

    provider.get("news", (news) => {
        if (news) {
            allNews = news;
        }
    });
    if (isOnline()) {
        sendNewsToServer(allNews);
        showAllNews(allNews);
        provider.remove("news");
        allNews = [];
         let req = new XMLHttpRequest();
        req.open("GET", "http://localhost:3000/anews", true);
        req.send();
        req.onreadystatechange = function() {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status != 200) {
                    console.log("Something goes wrong!");
                }
                else {
                    let data = JSON.parse(req.responseText);
                    showAllNews(data);
                }
            }
        };
    }

    function addNews(imgSrc, title, body) {
        console.log(title);
        const newsBlock = document.createElement("div");
        newsBlock.className = "col-sm-6 col-lg-4 mb-4";
        const card = document.createElement("div");
        card.className = "card shadow border-0 h-100";
      //  console.log(imgSrc);
         card.innerHTML = "<img src=\"" + imgSrc + "\" alt=\"News Image\" class=\"card-img-top p-2\">"
            + "<div class=\"card-body\"><h5 class=\"text-dark\">" + title + "</h5><p class=\"text-muted card-text\">"
            + body + "</p></div>";
        newsBlock.appendChild(card);

        document.getElementById("newsList").appendChild(newsBlock);
    }

    function showAllNews(allNews) {
        allNews.forEach(function (news) {
            addNews(news.imgSrc, news.title, news.body)
        });
    }

    function sendNewsToServer(imgSrc, title, body) {
        fetch("http://localhost:3000/anews", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({imgSrc: imgSrc, title: title, body: body}),
        })
            .catch(error => console.error("Cannot fetch data:", error));
    }

    function sendAllNewsToServer(allNews) {
        for (let i = 0; i < allNews.length; i++) {
            sendNewsToServer(allNews[i].imgSrc, allNews[i].title, allNews[i].body)
        }
    }
});