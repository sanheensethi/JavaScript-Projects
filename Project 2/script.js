console.log("Library Object");

function Book(name="",author="",type=""){
	this.name = name;
	this.author = author;
	this.type = type;
}

function Display(){

}

/*Add Methods to Display Prototype*/
Display.prototype.add = function(book){
	console.log("Adding to UI");
	let tableBody = document.getElementById('tableBody');
	let data = localStorage.getItem('books');
	if(data == null){
		dataObj = [];
	}else{
		dataObj = JSON.parse(data);
	}
	dataObj.push([book.name,book.author,book.type]);
	localStorage.setItem('books',JSON.stringify(dataObj));
	let d = new Display();
	d.display();
}	
Display.prototype.clear = function(){
	let libraryForm = document.getElementById("libraryForm");
	libraryForm.reset();
}

Display.prototype.validate = function(book){
	if(book.name.length < 2){
		return false;
	}
	if(book.author.length < 2){
		return false;
	}
	if(book.type == ""){
		return false;
	}
	return true;
}

Display.prototype.show = function(type,msg){
	let message = document.getElementById('message');
	message.innerHTML = `
		<div class="alert alert-${type} alert-dismissible fade show" role="alert" id="alt">
            <strong>Hey!</strong> ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
	`;
	setTimeout(()=>{
		message.innerHTML="";
	},2000);
}

Display.prototype.display = function(){
	let tableBody = document.getElementById('tableBody');
	tableBody.innerHTML = "";
	let data = localStorage.getItem('books');
	if(data == null){
		dataObj = [];
	}else{
		dataObj = JSON.parse(data);
	}
	dataObj.forEach(function(element,index){
		tableBody.innerHTML+=`
						<tr>
                          <td>${element[0]}</td>
                          <td>${element[1]}</td>
                          <td>${element[2]}</td>
                          <td><a class="btn btn-danger" id="${index}" onclick="deleteBook(this.id)">del</a></td>
                        </tr>
		`;
	});
}


let d = new Display();
d.display();

/*Add Submit Event Listener to libraryForm*/

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit',libraryFormSubmit);

function libraryFormSubmit(e){
	e.preventDefault();
	console.log("You have submitted libraryForm");
	let name = document.getElementById('bookname').value;
	let author = document.getElementById('author').value;

	let fiction = document.getElementById('fiction');
	let programming = document.getElementById('programming');
	let cooking = document.getElementById('cooking');
	let type = "";

	if(fiction.checked){
		type = fiction.value;
	}else if(cooking.checled){
		type = cooking.value;
	}else if(programming.checked){
		type = programming.value;
	}

	let book = new Book(name,author,type);
	console.log(book);

	let display = new Display();
	if(display.validate(book)){
		display.add(book);
		display.clear();
		display.show('success',"Your Book is Successfully Added.");	
	}else{
		//show error to the user
		display.show('danger',"Fill and Select Book Name, Book Author and Select Type Respectifully.");
	}
}


function deleteBook(index){
	console.log("Deleting Book : ",index);
	let data = localStorage.getItem('books');
	if(data == null){
		dataObj = [];
	}else{
		dataObj = JSON.parse(data);
	}
	console.log(dataObj);
	dataObj.splice(index,1);
	console.log(dataObj);
	localStorage.setItem('books',JSON.stringify(dataObj));
	let tableBody = document.getElementById('tableBody').innerHTML="";
	let d = new Display();
	d.display();
}

















