var username = "";

//creates a chat bubble written by 'name' with the content 'message'
function createBubble(name, message){
	//create html elements
	var div = document.createElement('div');
	var h3 = document.createElement('h3');
	var p = document.createElement('p');

	//trim messages that are too long
	//all emperical values
	if(message.length > 335){
		message = message.slice(0, 335);
		message += "..."
	}

	//format html elements
	h3.innerText = name + " says:";
	p.innerText = message;
	div.appendChild(h3);
	div.appendChild(p);

	div.style.display = "none"; //hide bubble initially
	div.className = "bubble"; //divs with this class get special css formatting (see chat.css)

	//determine the size of the bubble depending on the length of the message
	if(message.length < 89){
		div.style.height = "70px";
	} else if(message.length < 150){
		div.style.height = "100px";
	} else if(message.length < 250) {
		div.style.height = "120px";
	} else if(message.length < 350) {
		div.style.height = "150px";
	}

	//put the div into the body of the page
	var firstBubble = document.getElementsByClassName("bubble")[0];
	if(firstBubble){
		document.body.insertBefore(div, document.getElementsByClassName("bubble")[0]);
	} else {
		document.body.appendChild(div);
	}

	$(div).slideDown('slow'); //show bubble with cool jQuery effect
}

//chat logic
var socket = io.connect('http://localhost:3000');
socket.on('updatechat', function(data){
	createBubble(data.name, data.message);
});

//checks that the key pressed was Enter. If it was, create a chat bubble and clear the textarea.
function checkSubmit(e){
	if(e && e.keyCode == 13){
		e.preventDefault();
		var textarea = document.getElementsByTagName('textarea')[0];
		var input = document.getElementsByTagName('input')[0];
		var h2 = document.getElementsByTagName('h2')[0];

		var userval = input.value;
		var message = textarea.value;
		textarea.value = "";
		
		//get username
		if(userval && username == ""){
			username = userval;
			$(h2).fadeOut('slow');
			$(input).fadeOut('slow', function(){
				$(textarea).fadeIn('slow', function(){textarea.focus();});
			});
		} else if(message){
			//or send message to server
			var data = {name: username, message: message};
			socket.emit('sendchat', data);
		}
	}
}



