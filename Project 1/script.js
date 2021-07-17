console.log('Hi');
showNotes();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function dateString(){
	let date = new Date();
	dateStr = date.getDate()+"-"+months[date.getMonth()]+"-"+date.getFullYear()+'@'+days[date.getDay()];
	hour = date.getHours();
	let pre = "AM";
	if(hour>12){
		hour%=12;
		pre = "PM";
	}
	timeStr = hour+":"+date.getMinutes()+":"+date.getSeconds()+" "+pre;
	return [dateStr,timeStr];
}

/*If User add a node to a Local Storage*/
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click',function(e){
	let addTxt = document.getElementById('addtxt');
	let noteTitle = document.getElementById('title');
	if(addTxt.value == "" && noteTitle == ""){
		document.getElementById('dialog').innerHTML = `
			<div class="alert alert-danger" role="alert">
  	<center>Please Enter Text and Title</center>
</div>
		`;
	}else{
	document.getElementById('dialog').innerHTML = "";
	let notes = localStorage.getItem('notes');
	if(notes == null){
		notesObj = [];
	}else{
		notesObj = JSON.parse(notes);
	}
	addTxt.value = addTxt.value.replace(/(?:\r\n|\r|\n)/g,'<br>');
	notesObj.push([noteTitle.value,addTxt.value,dateString()]);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	addTxt.value="";
	noteTitle.value = "";
	console.log(notesObj);
	showNotes();
}
});

// fuctions to show elemets from local storage.
function showNotes(){
	let notes = localStorage.getItem('notes');
	if(notes == null){
		notesObj = [];
	}else{
		notesObj = JSON.parse(notes);
	}
	let html = "";
	notesObj.forEach(function(element,index){
		html += `
		<div class="noteCard card my-2 mx-2" style="width: 18rem;">
  		<div class="card-body">
    		<h5 class="card-title">Title : ${element[0]}</h5>
    		<p class="card-text">${element[1]}</p>
    		<p class="card-text" style="font-size:12px">${element[2][0]} | ${element[2][1]}</p>
    		<hr>
    		<a id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</a>
  		</div>
	</div>
	`;
	});

	let notesElem = document.getElementById('notes');
	if(notesObj.length != 0){
		notesElem.innerHTML = html;
	}else{
		notesElem.innerHTML = `No Notes Avaliable, you have to use Add Notes Section.`
	}
}

//function to delete note
function deleteNote(index){
	let notes = localStorage.getItem('notes');
	if(notes == null){
		notesObj = [];
	}else{
		notesObj = JSON.parse(notes);
	}
	notesObj.splice(index,1);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	showNotes();
}


search = document.getElementById('searchtxt');
search.addEventListener('input',function(){
	let inputVal = search.value.toLowerCase();
	let noteCards = document.getElementsByClassName('noteCard');
	Array.from(noteCards).forEach(function(element){
		let cardText = element.getElementsByClassName('card-text')[0];
		let text = cardText.innerText.toLowerCase();
		if(text.includes(inputVal)){
			element.style.display = "block";
		}else{
			element.style.display = "none";
		}
	});
});