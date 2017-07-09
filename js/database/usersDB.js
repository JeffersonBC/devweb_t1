// Função para adicionar/ atualizar user
function AddUser(is_admin){
	var user_login 	 = $('#Id').val();
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
	else if (!user_login || !user_pass1 || !user_name || !user_email || !user_address){
		var error_box = $('#warning');
		error_box.html('Um ou mais campos estão vazios, por tanto não foi possível salvar')
		error_box.addClass('card-panel red white-text');
	}
	else{
		$.get('http://localhost:5984/_uuids', function(data, status){
			user = {
				login: 	  user_login,
				name: 	  user_name,
				email: 	  user_email,
				pass: 	  user_pass1,
				address:  user_address,
				is_admin: is_admin
			};

			put('http://localhost:5984/doggos_users/' + data.uuids[0], JSON.stringify(user), "/login?reg=true");
		});
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
		error_box.html('Um ou mais campos estão vazios, por tanto não foi possível salvar')
		error_box.addClass('card-panel red white-text');
	}
	else{
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
		var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

		open.onsuccess = function(event) {

			var db = open.result;
			var trans = db.transaction(["UserLoggedIn"], "readwrite");
			var currentUser = trans.objectStore("UserLoggedIn");

			currentUser.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					$.get('http://localhost:5984/doggos_users/' + cursor.value.id, function(user, status){
						var edited_user = {
							_rev: 	  user._rev,
							login:	  user.login,
							name: 	  user_name,
							email: 	  user_email,
							pass: 	  user_pass1,
							address:  user_address,
							is_admin: user.is_admin
						};

						trans.oncomplete = function() { db.close(); };
						put('http://localhost:5984/doggos_users/' + user._id, JSON.stringify(edited_user), "/area_usuario?reg=true");
					});
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
				user.openCursor().onsuccess = function(event) {
					var cursor = event.target.result;
					if (cursor) {
						$.get('http://localhost:5984/doggos_users/' + cursor.value.id, function(user, status){
							$("#name")		.val(user.name);
							$("#email")		.val(user.email);
							$("#address")	.val(user.address);
						});
					}
				};
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
	else{
		var users_dict = {}
		$.get('http://localhost:5984/doggos_users/_all_docs', function(data, status){
			for (let i = 0; i < data.total_rows; i++){
				$.get('http://localhost:5984/doggos_users/' + data.rows[i].id, function(user, status){
					users_dict[user.login] = {
						pw: user.pass,
						id: user._id
					};

					if (i == data.total_rows - 1){
						// Usuário não existe
						if (!users_dict[user_id]){
							var error_box = $('#warning');
							error_box.html('Nome de usuário não existe');
							error_box.addClass('card-panel red white-text');

							trans.oncomplete = function() {
								db.close();
							};
						}

						// Usuário existe mas senha está errada
						else if (users_dict[user_id] && users_dict[user_id].pw != user_pass1){
							var error_box = $('#warning');
							error_box.html('Senha incorreta');
							error_box.addClass('card-panel red white-text');

							trans.oncomplete = function() {
								db.close();
							};
						}

						// Credenciais corretas
						else{
							var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);
							open.onsuccess = function(event) {
								var db = open.result;
								var trans = db.transaction(['UserLoggedIn'], 'readwrite');

								user = {
									id: users_dict[user_id].id,
								};

							 	trans.objectStore('UserLoggedIn').put(user);
								trans.oncomplete = function() {
									db.close();
									window.location.href = "/";
								};
							}
						}

					}
				});
			}
		});


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
