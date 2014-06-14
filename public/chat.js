window.onload = function() {
 
    var socket = io.connect();
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var sendLink = document.getElementById("link");
    var sendImage = document.getElementById("imgs");
    var sendVideo = document.getElementById("videos");
    var sendSite = document.getElementById("site")

    socket.on('message', function (data) {
        if(data.message) {
            var html = "";
            html += '<b>' + (data.username ? data.username : 'Server') + ': </b>';
            html += data.message + '<br />';
            content.innerHTML += html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        if(name.value == "" || name.value.indexOf("<") > -1 || name.value.indexOf(">") > -1) {
            alert("Please type a valid name!");
        } 
        else {
            var text = field.value;
            if (text.indexOf("<") > -1 || text.indexOf(">") > -1) {
                text = "<i>Message censored</i>";
            }
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }
    };

    sendLink.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } 
        else {
            var linkurl = prompt("Enter URL:");
            var linktext = "<a href='" + linkurl + "'>" + linkurl + "</a>";
            socket.emit('send', { message: linktext, username: name.value });
            field.value = "";
        }
    };

    sendImage.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } 
        else {
            var imgurl = prompt("Enter Image URL:");
            var imagetext = "<img src='" + imgurl + "' />"
            socket.emit('send', { message: imagetext, username: name.value });
            field.value = "";
        }
    };

    sendVideo.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } 
        else {
            var vidurl = prompt("Enter End of Video URL (the part after the = sign):");
            var vidtext = "<iframe width='420' height='315' src='//youtube.com/embed/" + vidurl + "' frameborder='0' allowfullscreen></iframe>"
            socket.emit('send', { message: vidtext, username: name.value });
            field.value = "";
        }
    };

    sendSite.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } 
        else {
            var siteurl = prompt("Enter Website URL:");
            var sitetext = "<iframe width='500' height='500' src='" + siteurl + "'></iframe>"
            socket.emit('send', { message: sitetext, username: name.value });
            field.value = "";
        }
    };
    
    window.onkeydown = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 13) {
            sendButton.onclick();
        }
    }
}