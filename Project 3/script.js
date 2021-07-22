console.log("Dictionary.");

fetch = document.getElementById('fetch');
fetch.addEventListener('click',function(){
	let word = document.getElementById('word').value;
	call(word);
});

function call(word){
	console.log(word);
	let xhr = new XMLHttpRequest();
	xhr.open('GET',`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`,true);

	xhr.onload = ()=>{
		data = JSON.parse(xhr.responseText);
		update(data);
	}

	xhr.send();
}

function update(data){
	console.log(data);
	let def = data[0].meanings[0].definitions;
	let result = document.getElementById('result');
	result.innerHTML = "";
	def.forEach( function(element, index) {
		result.innerHTML += `
			<h3>Definition ${index+1}:</h3>
			<p>${element.definition}</p>
			<br><br>
		`
	});
}