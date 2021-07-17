console.log('Hi');
showNotes();
/*If User add a node to a Local Storage*/
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click',function(e){
	let addTxt = document.getElementById('addtxt');
	if(addTxt.value == ""){
		document.getElementById('dialog').innerHTML = `
			<div class="alert alert-danger" role="alert">
  	<center>Please Enter Text.</center>
</div>
		`;
	}else{
	document.getElementById('dialog').innerHTML = "";
	let notes = localStorage.getItem('notes');
	console.log(notes);
	if(notes == null){
		notesObj = [];
	}else{
		notesObj = JSON.parse(notes);
	}
	notesObj.push(addTxt.value);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	addTxt.value="";
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
    		<h5 class="card-title">Note ${index+1}</h5>
    		<p class="card-text">${element}</p>
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