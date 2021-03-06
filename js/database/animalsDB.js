// Função para iterar sobre os objetos animais e renderizar a respectiva tabela
function AnimalsTable (){
	$.get('http://localhost:5984/doggos_animals/_all_docs', function(data, status){
        var animals_table = $('#animals_table');

		// Abrindo IndexedDB para pegar id de usuário atual
		var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);
		open.onsuccess = function(event) {
			var db = open.result;
			var trans = db.transaction(['UserLoggedIn'], 'readonly');
			trans.objectStore('UserLoggedIn').openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {

					// Busca no CouchDB os animais cadastrados do usuário atual
					for (let i = 0; i < data.total_rows; i++){
						$.get('http://localhost:5984/doggos_animals/' + data.rows[i].id, function(animal, status){
							if (cursor.value.id == animal.owner_id){
								animals_table.append(
									`<tr class="table-itens">
										<td>
											<a href="/area_usuario/animais/editar?id=` + animal._id + `&rev=` + animal._rev + `">
											<i class="material-icons">edit</i></a></td>
										<td class="flat-btn">
											<a href="/area_usuario/animais/visualizar?id=` + animal._id + `">
											<span>` + animal.name + `</span></a></td>
										<td>` + animal.species + ` - ` + animal.race + `</td>
									</tr>`
								);
							}
						});
					}

				}
			};
			trans.oncomplete = function() {	db.close(); };
		}
	});

}

// Função para adicionar/ atualizar animal
function AddAnimal (){
	var animal_name 	= $('#name').val();
	var animal_species 	= $('#species').val();
	var animal_race 	= $('#race').val();
	var animal_birth 	= $('#birth').val();

	// Se algum campo estiver vazio, mostra mensagem de erro
	if (!animal_name || !animal_species || !animal_race || !animal_birth){
		var error_box = $('#warning');
		error_box.html('Um ou mais campos estão vazios, por tanto não foi possível salvar')
		error_box.addClass('card-panel red white-text');
	}
	else{
		var animal_id = getParameterByName('id');
		var animal_rev = getParameterByName('rev');

		// Abrindo IndexedDB para pegar id de usuário atual
		var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);
		open.onsuccess = function(event) {
			var db = open.result;
			var trans = db.transaction(['UserLoggedIn'], 'readonly');

			trans.objectStore('UserLoggedIn').openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {

					// Editando animal existente
					if (animal_id && animal_rev){
						var animal = {
							_rev: 		animal_rev,
							name: 		animal_name,
							species: 	animal_species,
							race: 		animal_race ,
							birthdate: 	animal_birth,
							owner_id:	cursor.value.id
						};

						put('http://localhost:5984/doggos_animals/' + animal_id, JSON.stringify(animal), "/area_usuario/animais");
					}
					// Adicionando animal novo
					else{
						$.get('http://localhost:5984/_uuids', function(data, status){
							var animal = {
								name: 		animal_name,
								species: 	animal_species,
								race: 		animal_race ,
								birthdate: 	animal_birth,
								owner_id:	cursor.value.id
							};

							put('http://localhost:5984/doggos_animals/' + data.uuids[0], JSON.stringify(animal), "/area_usuario/animais");
						});
					}

				}
			}
			trans.oncomplete = function() {	db.close(); };
		}
	}
}

// Se estiver editando uma instância válida de um objeto animal, inicializar página de acordo
function GetEditedAnimal(animal_id){
	$.get('http://localhost:5984/doggos_animals/' + animal_id, function(animal, status){
		$("#title").html("Editar Animal");
		$("#send").html("Salvar");

		$("#name").val(animal.name);
		$("#species").val(animal.species);
		$("#race").val(animal.race);
		$("#birth").val(animal.birthdate);
	});
}

// Usada para renderizar animal na "visualização de animal"
function GetAnimal(animal_id){
	$.get('http://localhost:5984/doggos_animals/' + animal_id, function(animal, status){
		$("#name").append(animal.name);
		$("#species").append(animal.species);
		$("#race").append(animal.race);
		$("#birth").append(animal.birthdate);
	});
}
