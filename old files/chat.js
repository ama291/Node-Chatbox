window.onload = function() {
 
    //var messages = [];
    var socket = io.connect();
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var sendImage = document.getElementById("imgs");
    var sendVideo = document.getElementById("videos");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                /*if (messages[i].message.length > 40) {
                    for (var x=0; x < messages[i].message.length; x++) {
                        if (x == 0) {
                            html += messages[i].message.substring(1,41) + '<br />';
                            x+=39;
                        }
                        else {
                            html += messages[i].message.substring(1+x,41+x+messages[i].username.length+1) + '<br />';  
                            x = x + 39 + messages[i].username.length + 1;
                        }
                    }
                }
                else {
                    html += messages[i].message + '<br />';
                }*/
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        if(name.value == "") {
            alert("Please type your name!");
        } 
        else {
            var text = field.value;
            if (text.indexOf("<h") > -1 || name.value.indexOf("<h") > -1 || text.indexOf("<small>") > -1 || name.value.indexOf("<small>") > -1) {
                alert("you're an idiot");
            }
            else {
                socket.emit('send', { message: text, username: name.value });
            }
            //socket.emit('send', { message: text, username: name.value });
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
    
    window.onkeydown = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 13) {
            sendButton.onclick();
        }
    }
}
