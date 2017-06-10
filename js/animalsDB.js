// Função para iterar sobre os objetos animais e renderizar a respectiva tabela
function AnimalsTable (){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", 1);

    open.onsuccess = function(event) {
        var db 		= open.result;
        var trans 	= db.transaction("AnimalsStore", "readwrite");
		var animals = trans.objectStore("AnimalsStore");

		var animals_table = $('#animals_table');

        animals.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
				 animals_table.append(
					`<tr class="table-itens">
						<td><a href="reg_animal.html?id=` + cursor.value.id + `"><i class="material-icons">edit</i></a></td>
						<td class="flat-btn"><a href="vis_animal.html"><span>` + cursor.value.name + `</span></a></td>
						<td>` + cursor.value.kind.species + ` - ` + cursor.value.kind.race + `</td>
					</tr>`
				);
				cursor.continue();
			}
        };

		trans.oncomplete = function() {
			db.close();
		};
	}

}

// Função para adicionar novo animal
function AddAnimal (){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	var open = indexedDB.open("PetshopDogosDatabase", 1);

	open.onsuccess = function(event) {
		var db = open.result;
		var trans = db.transaction("AnimalsStore", "readwrite");
		var animals = trans.objectStore("AnimalsStore");

		var animal = {
			name: $('#name').val(),
			kind: {
				species: $('#species').val(),
				race: $('#race').val() },
			birthdate: $('#birth').val()
		};
		//console.log(animal);
		animals.add(animal);

		trans.oncomplete = function() {
			db.close();
		};
	}
}

// Função para editar animal existente
function EditAnimal (animal_id){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	var open = indexedDB.open("PetshopDogosDatabase", 1);

	open.onsuccess = function(event) {
		var db = open.result;
		var trans = db.transaction("AnimalsStore", "readwrite");
		var animals = trans.objectStore("AnimalsStore");


		animals.put({
			id: animal_id,
			name: $('#name').val(),
			kind: {
				species: $('#species').val(),
				race: $('#race').val() },
			birthdate: $('#birth').val()
		});

		trans.oncomplete = function() {
			db.close();
		};
	}
}

// Se estiver editando uma instância válida de um objeto animal, inicializar página de acordo
function GetAnimal(animal_id){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	var open = indexedDB.open("PetshopDogosDatabase", 1);

	open.onsuccess = function(event) {
		var db = open.result;
		var trans = db.transaction(['AnimalsStore'], 'readonly');
		var animals = trans.objectStore('AnimalsStore');

 		var getRequest = animals.get(parseInt(animal_id));

		getRequest.onsuccess = function(event) {
			$("#title").html("Editar Animal");
			$("#send").html("Salvar");
			//$("#send").click("EditAnimal(" + animal_id + ")");

			$("#name")		.val(getRequest.result.name			);
			$("#species")	.val(getRequest.result.kind.species);
			$("#race")		.val(getRequest.result.kind.race	);
			$("#birth")		.val(getRequest.result.birthdate	);

		};
	}
}

// Função para processar a query string
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
