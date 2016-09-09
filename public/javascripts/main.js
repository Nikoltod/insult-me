import makeRequest from "./requestFactory";

(function () {
    const api = '/api/post';
    const el = document.getElementById("message-input-button");

    el.parentElement.addEventListener("keyup", function (e) {
            e.preventDefault();
            if (e.keyCode == 13) {
                el.click();
            }
        });

    el.addEventListener("click", function () {

        postingInsult();

        setTimeout(function () {
            gettingInsult();
        }, responseTime());

    });
    
    const gettingInsult = function () {
        makeRequest({
            method: 'get',
            url: api
        }).then(function (data) {
            return makeRequest({
                method: 'get',
                url: api,
            }).then(function (data) {
                var response = JSON.parse(data);
                var randomIndex = getRandomIndex(response.length);
                var randomInsult = response[randomIndex];
                generateMessage("incoming", randomInsult.text);
            }).catch(function (err) {
                console.error("error", err.statusText);
            });
        }).catch(function (err) {
            console.error("error", err.statusText);
        })
    }

    function getRandomIndex(lengthOfResponse) {
        return Math.floor(Math.random(0, lengthOfResponse) * 100);
    }
    const postingInsult = function () {
        const message = document.getElementById("message-input").value;
        makeRequest({
            method: "get",
            url: api,
            params: { 'text': message }
        }).then(function (data) {
            return makeRequest({
                method: 'post',
                url: api,
                params: {
                    text: message
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }).catch(function (err) {
            console.error("error : ", err);
        });
        generateMessage("outgoing");
    }

    function fadeIn(element) {
        element.style.opacity = 0;

        let last = +new Date();
        const tick = function () {
            element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+element.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };

        tick();
    }

    function generateMessage(messageStatus, recievedMessage) {
        let input = document.getElementById("message-input"),
            message = recievedMessage ? recievedMessage : input.value,
            time = getTime(),
            article = generateArticle(message, time, messageStatus),
            chat = document.getElementById("message-pane");
        chat.appendChild(article);
        fadeIn(article);
        
        input.value = '';
    }

    function generateArticle(message, currentTime, messageStatus) {
        const article = document.createElement("article"),
            clock = document.createElement("span"),
            avatar = document.createElement("img");

        article.innerText = message ? message : "Lorem ipsum";

        if (messageStatus === "incoming") {
            article.className = "incoming";
            avatar.className = "incoming";
            avatar.setAttribute("src", "./images/bot" + (Math.floor(Math.random() * (5 - 1 + 1)) + 1) + ".jpg");
        } else {
            avatar.className = "sender";
            avatar.setAttribute("src", "./images/avatars.jpg");
        }

        clock.innerText = currentTime;
        clock.className = "time";

        article.appendChild(avatar);
        article.appendChild(clock);

        return article;
    }

    function getTime() {
        return new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "numeric",
            minute: "numeric"
        });
    }

    function responseTime() {
        return Math.floor(Math.random(2000, 6000));
    }

})();