// Função para adicionar/ atualizar user
function AddUser(){
	
	var user_id 	 = $('#Id').val();
	var user_pass1 	 = $('#pass1').val();
	var user_pass2 	 = $('#pass2').val();
	var user_name 	 = $('#name').val();
	var user_email 	 = $('#email').val();
	var user_address = $('#address').val();
	var user_foto 	 = $('#foto').val();
	
	
	// Se as senhas forem diferentes
	if (user_pass1 != user_pass2){
			
		var error_box = $('#warning');
		error_box.html('As senhas nao coincidem')
		error_box.addClass('card-panel red white-text');
	
	}
	// Se algum campo estiver vazio, mostra mensagem de erro
	else if (!user_id || !user_pass1 || !user_name || !user_email || !user_address){
		var error_box = $('#warning');
		error_box.html('Um ou mais campos estão vazios, por tanto não foi possível salvar')
		error_box.addClass('card-panel red white-text');
	}
	else{
		
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
		var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

		open.onsuccess = function(event) {
			
			var db = open.result;
			var trans = db.transaction("UsersStore", "readwrite");
			var users = trans.objectStore("UsersStore");

			user = {
				id: user_id,
				name: user_name,
				email: user_email,
				pass: user_pass1,
				address: user_address
			};
			
			users.put(user);
		

			trans.oncomplete = function() {
				db.close();
				window.location.href = "./index_cliente.html";
			};
		}
	}
}



function login() {
	var user_id 	 = $('#Id').val();
	var user_pass1 	 = $('#pass1').val();
	console.log("user_id: " + user_id);
	
	if (!user_id) {
		var error_box = $('#warning');
		error_box.html('Informe o nome de usuario');
		error_box.addClass('card-panel red white-text');
	}
	else if (!user_pass1) {
		var error_box = $('#warning');
		error_box.html('Informe a senha');
		error_box.addClass('card-panel red white-text');
	}
	else
	{
		var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

		open.onsuccess = function(event) {
			var db = open.result;
			var trans = db.transaction(['UsersStore'], 'readonly');
			var users = trans.objectStore('UsersStore');
			
			var trans2 = db.transaction(['UserLoggedIn'], "readwrite");
			var userLoggedIn = trans2.objectStore('UserLoggedIn');
			
			users.openCursor().onsuccess = function(event) {
				let cursor = event.target.result;
				if(cursor){
					if (cursor.value.id == user_id) {	
							// TODO: VERIFICAR SE O USUARIO TÁ NA TABELA UsersLoggedIn 
							// E SE TIVER, SUBSTITUIR POR ESSE USUARIO
							// SENAO, ADICIONAR						
							
							// Redireciona pra pagina de cliente
							location = "./index_cliente.html";
						}
					}
					else {
						cursor.continue();
					}									
				}
				else { // Se todos os registros foram percorridos	
					var error_box = $('#warning');
					error_box.html('Nome de usuario ou senha invalidos');
					error_box.addClass('card-panel red white-text');				
				}		
			}
			trans2.oncomplete = function() {
				db.close();
			};
		}
	}
}
