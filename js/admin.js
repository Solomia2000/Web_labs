document.addEventListener("DOMContentLoaded", function() {
    let allNews = [];

    document.getElementById("addImageButton").addEventListener("click", addImage);
    document.getElementById("sendNewsButton").addEventListener("click", sendNews);
    window.addEventListener("online", function (event) {
        provider.get("news", (news) => {
            if (news) {
                allNews = news;
            }
            sendNewsToServer(allNews);
            provider.remove("news");
            allNews = [];
        });
    });

    provider.get("news", (news) => {
        if (news) {
            allNews = news;
        }
    });

//     function add_news_img(files) {
//     var img = document.getElementById("uploadedImage");
//     var reader = new FileReader();
//     reader.onload = function() {
//         src = reader.result;
//         img.src = src;


//     }
//     reader.readAsDataURL(files[0]);
//     alert("Uploaded");
// }

    function addImage() {
        const input = document.querySelector("input[type=file]");
        const uploadedImage = document.getElementById("uploadedImage");
        if (input.files[0] != null) {
            var reader = new FileReader();
    reader.onload = function() {
        src = reader.result;
        uploadedImage.src = src;
    }
    reader.readAsDataURL(input.files[0]);
         
        }
        document.getElementById("addImageButton").blur();
    // var img = document.getElementById("img");
    // var reader = new FileReader();
    // reader.onload = function() {
    //     src = reader.result;
    //     img.src = src;


    // }
    // reader.readAsDataURL(files[0]);
    // alert("Uploaded");
    }

  

    function sendNews() {
        let newsImageSrc, newsTitle, newsBody;

        //newsImageSrc = document.getElementById("uploadedImage").getAttribute('src');
       newsImageSrc = "C:/Users/Solomiya/Pictures/Saved Pictures/555.jpg"
        newsTitle = document.getElementById("newsTitle").value.trim();
        if (newsTitle === "" || newsTitle == null) {    
            alert("News title is incorrect!");
            document.getElementById("sendNewsButton").blur();
            return;
        }
       // console.log(newsImageSrc);
        newsBody = document.getElementById("newsBody").value.trim();
        if (newsBody === "" || newsBody == null) {
            alert("News body is incorrect!");
            document.getElementById("sendNewsButton").blur();
            return;
        }

         if (isOnline()) {
            alert("Successfully sent to server");
     
            console.log(newsImageSrc);
            console.log(newsTitle);
            allNews.push({imgSrc: newsImageSrc, title: newsTitle, body: newsBody});
            provider.add("news", allNews);
            alert("Saved to storage");
         }

        document.getElementById("newsTitle").value = "";
        document.getElementById("newsBody").value = "";
        document.getElementById("sendNewsButton").blur();
    }


    function sendNewsToServer(allNews) {
        if (allNews.length) {
            alert("Successfully sent to server!")
        }
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