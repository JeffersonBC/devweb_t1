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
						<td class="flat-btn"><a href="vis_animal.html?id=` + cursor.value.id + `"><span>` + cursor.value.name + `</span></a></td>
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

// Função para adicionar/ atualizar animal
function AddAnimal (){
	var animal_name 	= $('#name').val();
	var animal_species 	= $('#species').val();
	var animal_race 	= $('#race').val();
	var animal_birth 	= $('#birth').val();

	console.log(animal_name);
	console.log(animal_species);
	console.log(animal_race);
	console.log(animal_birth);

	// Se algum campo estiver vazio, mostra mensagem de erro
	if (!animal_name || !animal_species || !animal_race || !animal_birth){
		var error_box = $('#warning');
		error_box.html('Um ou mais campos estão vazios, por tanto não foi possível salvar')
		error_box.addClass('card-panel red white-text');
	}
	else{
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
		var open = indexedDB.open("PetshopDogosDatabase", 1);

		open.onsuccess = function(event) {
			var db = open.result;
			var trans = db.transaction("AnimalsStore", "readwrite");
			var animals = trans.objectStore("AnimalsStore");

			var animal_id = getParameterByName('id');
			var animal;

			if (animal_id){
				animal = {
					id: parseInt(animal_id),
					name: animal_name,
					kind: {
						species: animal_species,
						race: 	 animal_race},
					birthdate: 	 animal_birth
				};
			}
			else {
				animal = {
					name: animal_name,
					kind: {
						species: animal_species,
						race: 	 animal_race},
					birthdate: 	 animal_birth
				};
			}

			animals.put(animal);

			trans.oncomplete = function() {
				db.close();
				window.location.href = "./table_animais.html";
			};
		}
	}
}

// Se estiver editando uma instância válida de um objeto animal, inicializar página de acordo
function GetEditedAnimal(animal_id){
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

			$("#name").val(getRequest.result.name);
			$("#species").val(getRequest.result.kind.species);
			$("#race").val(getRequest.result.kind.race);
			$("#birth").val(getRequest.result.birthdate);
		};

		trans.oncomplete = function() {
			db.close();
		};
	}
}

function GetAnimal(animal_id){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	var open = indexedDB.open("PetshopDogosDatabase", 1);

	open.onsuccess = function(event) {
		var db = open.result;
		var trans = db.transaction(['AnimalsStore'], 'readonly');
		var animals = trans.objectStore('AnimalsStore');

 		var getRequest = animals.get(parseInt(animal_id));
		getRequest.onsuccess = function(event) {
			$("#name").append(getRequest.result.name);
			$("#species").append(getRequest.result.kind.species);
			$("#race").append(getRequest.result.kind.race);
			$("#birth").append(getRequest.result.birthdate);
		};

		trans.oncomplete = function() {
			db.close();
		};
	}
}
