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
		error_box.html('Um ou mais campos est�o vazios, por tanto n�o foi poss�vel salvar')
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
				id: 	  user_id,
				name: 	  user_name,
				email: 	  user_email,
				pass: 	  user_pass1,
				address:  user_address,
				is_admin: false
			};

			users.put(user);

			trans.oncomplete = function() {
				db.close();
				window.location.href = "/login?reg=true";
			};
		}
	}
}

// Função para adicionar/ atualizar user
function AddAdmin(){
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
		error_box.html('Um ou mais campos est�o vazios, por tanto n�o foi poss�vel salvar')
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
				id: 	  user_id,
				name: 	  user_name,
				email: 	  user_email,
				pass: 	  user_pass1,
				address:  user_address,
				is_admin: true
			};

			users.put(user);


			trans.oncomplete = function() {
				db.close();
				window.location.href = "/area_adm?reg=true";
			};
		}
	}
}

function EditUser(){
	var user_pass1 	 = $('#pass1').val();
	var user_pass2 	 = $('#pass2').val();
	var user_name 	 = $('#name').val();
	var user_email 	 = $('#email').val();
	var user_address = $('#address').val();

	// Se as senhas forem diferentes
	if (user_pass1 != user_pass2){

		var error_box = $('#warning');
		error_box.html('As senhas nao coincidem')
		error_box.addClass('card-panel red white-text');

	}
	// Se algum campo estiver vazio, mostra mensagem de erro
	else if (!user_pass1 || !user_name || !user_email || !user_address){
		var error_box = $('#warning');
		error_box.html('Um ou mais campos est�o vazios, por tanto n�o foi poss�vel salvar')
		error_box.addClass('card-panel red white-text');
	}
	else{
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
		var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

		open.onsuccess = function(event) {

			var db = open.result;
			var trans = db.transaction(["UsersStore", "UserLoggedIn"], "readwrite");
			var users = trans.objectStore("UsersStore");
			var currentUser = trans.objectStore("UserLoggedIn");

			currentUser.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					user = {
						id: 	  cursor.value.id,
						name: 	  user_name,
						email: 	  user_email,
						pass: 	  user_pass1,
						address:  user_address,
						is_admin: cursor.value.is_admin
					};

					cursor.update(user);
					users.put(user);

					trans.oncomplete = function() {
						db.close();
						window.location.href = "/area_usuario?reg=true";
					};
				}
			};

		}
	}
}

function GetEditedUser(){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

	open.onsuccess = function(event) {
		var db = open.result;
		var trans = db.transaction(['UserLoggedIn'], 'readonly');
		var user = trans.objectStore('UserLoggedIn');

		user.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
				$("#pass1")		.val(cursor.value.pass);
				$("#pass2")		.val(cursor.value.pass);
				$("#name")		.val(cursor.value.name);
				$("#email")		.val(cursor.value.email);
				$("#address")	.val(cursor.value.address);
			}
        };

		trans.oncomplete = function() {
			db.close();
		};
	}
}

function Login() {
	var user_id    = $('#Id').val();
	var user_pass1 = $('#pass1').val();

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
			var trans = db.transaction(['UsersStore', 'UserLoggedIn'], 'readwrite');

			var users = trans.objectStore('UsersStore');
			var userLoggedIn = trans.objectStore('UserLoggedIn');

			var getUser = users.get(user_id);
			getUser.onsuccess = function() {
				if(getUser.result){
					// Usuário existe mas senha está errada
					if (getUser.result.pass != user_pass1){
						var error_box = $('#warning');
						error_box.html('Senha incorreta');
						error_box.addClass('card-panel red white-text');

						trans.oncomplete = function() {
							db.close();
						};
					}

					// Credenciais corretas
					else{
						userLoggedIn.openCursor().onsuccess = function(event) {
							var cursor = event.target.result;
							if (cursor) {
								cursor.delete();
								cursor.continue();
							}
							else {
								user = {
									id: 	  getUser.result.id,
									name: 	  getUser.result.name,
									email: 	  getUser.result.email,
									pass: 	  getUser.result.pass,
									address:  getUser.result.address,
									is_admin: getUser.result.is_admin
								};

								userLoggedIn.put(user);

								trans.oncomplete = function() {
									db.close();
									window.location.href = "/";
								};
							}
						};
					}
				}
				// Usuário não existe
				else {
					var error_box = $('#warning');
					error_box.html('Nome de usuário não existe');
					error_box.addClass('card-panel red white-text');

					trans.oncomplete = function() {
						db.close();
					};
				}
			};
		}
	}
}

function Loggoff() {
	var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

	open.onsuccess = function(event) {
		var db = open.result;
		var trans = db.transaction(['UserLoggedIn'], 'readwrite');
		var userLoggedIn = trans.objectStore('UserLoggedIn');

		userLoggedIn.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if (cursor) {
				cursor.delete();
				cursor.continue();
			}
			else{
				trans.oncomplete = function() {
					db.close();
					window.location.href = "/";
				};
			}
		}
	}

}

function LoggedUserName(){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 	  = open.result;
        var trans = db.transaction("UserLoggedIn", "readwrite");
		var user  = trans.objectStore("UserLoggedIn");

        user.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
				$('#username').append(cursor.value.name);
			}
        };

		trans.oncomplete = function() {
			db.close();
		};
	}
}

function CheckAdm(){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 	  = open.result;
        var trans = db.transaction("UserLoggedIn", "readwrite");
		var user  = trans.objectStore("UserLoggedIn");

        user.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
				if (cursor.value.is_admin != true){
					$('#link_adm').remove();
					$('#link_adm_side').remove();
				}
			}
			else {
				trans.oncomplete = function() {
					db.close();
				};
			}
        };
	}
}