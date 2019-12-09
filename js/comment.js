console.log(1);
document.addEventListener("DOMContentLoaded", function () {
    let allAppeals = [];

    document.getElementById("send").addEventListener("click", addAppeal);
    window.addEventListener("online", function (event) {
        provider.get("appeals", (appeals) => {
            if (appeals) {
                allAppeals = appeals;
            }
            sendAllAppealsToServer(allAppeals);
            showAllAppeals(allAppeals);
            provider.remove("appeals");
            allAppeals = [];
        });
    });

    provider.get("appeals", (appeals) => {
        if (appeals) {
            allAppeals = appeals;
        }
    });
    if (isOnline()) {
        sendAllAppealsToServer(allAppeals);
        provider.remove("appeals");
        allAppeals = [];

        let req = new XMLHttpRequest();
        req.open("GET", "http:localhost:3000/all_appeals", true);
        req.send();
        req.onreadystatechange = function() {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status != 200) {
                    console.log("Something goes wrong!");
                }
                else {
                    let data = JSON.parse(req.responseText);
                    showAllAppeals(data);
                }
            }
        };
    }


function addAppeal() {
    var txtVal = document.getElementById('exampleFormControlTextarea1').value;
              if (/\S/.test(txtVal)) {
const nickname = "User"
    var date = new Date();

    if (isOnline()) {
        sendAppealToServer(nickname, date, txtVal);
        showAppeal(nickname, date, txtVal);
        alert("Successfully sent to server");
    } else {
        allAppeals.push({name: nickname, date: date, text: txtVal});
        provider.add("appeals", allAppeals);
        alert("Saved to  storage");
    }
              }
    

    
    document.getElementById('form').reset();
}

function showAppeal(name, date, txtVal) {
       var dates = new Date();
                 console.log(exampleFormControlTextarea1);
                 var div = document.createElement("div");
                 div.classList.add('block');
                 var divUser = document.createElement("div");
                 divUser.classList.add('user');
                 var pUser = document.createElement("p");
                 var pUserTime = document.createElement("p");
                 var pUserDate = document.createElement("p");
                   
                 //const date = new Date();
                 var pLogin = document.createTextNode(name);
                 var pTime = document.createTextNode(dates.getHours()+":"+dates.getMinutes()+":"+dates.getSeconds());
                 var pDate = document.createTextNode(dates.getDate() +"."+(dates.getMonth()+1)+"."+dates.getFullYear());
                 var para = document.createElement("p");

                 var node = document.createTextNode(txtVal);

                 para.classList.add('coment');
                 pUser.appendChild(pLogin);
                 pUserTime.appendChild(pTime);
                 pUserDate.appendChild(pDate);
                 para.appendChild(node);
                 var element = document.getElementById("coments");
                 divUser.appendChild(pUser)
                 divUser.appendChild(pUserTime)
                 divUser.appendChild(pUserDate)
                 div.appendChild(divUser);
                 div.appendChild(para);
              
                 element.appendChild(div);
}

 

    function showAllAppeals(allAppeals) {
        for (let i = 0; i < allAppeals.length; i++) {
            showAppeal(allAppeals[i].name, new Date(allAppeals[i].date), allAppeals[i].text)
        }
    }

    
    function sendAppealToServer(nickname, date, txtVal) {
        fetch("http:localhost:3000/all_appeals", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({name: nickname, date: date, text: txtVal}),
        })
            .catch(error => console.error("Cannot fetch data:", error));
    }

    function sendAllAppealsToServer(allAppeals) {
        for (let i = 0; i < allAppeals.length; i++) {
            sendAppealToServer(allAppeals[i].name, allAppeals[i].date, allAppeals[i].txtVal)
        }
    }
});
function isOnline() {
    return window.navigator.onLine;
}