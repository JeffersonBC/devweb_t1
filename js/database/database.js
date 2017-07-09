var DB_VERSION = 1;

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

// Se DB ainda não foi inicializado, cria os ObjectStore necessários
open.onupgradeneeded = function() {
    var db       = open.result;

	if(!db.objectStoreNames.contains("CartStore")) {
		db.createObjectStore("CartStore",    {keyPath: "product_id", autoIncrement:false});
	}
	if(!db.objectStoreNames.contains("UserLoggedIn")) {
		db.createObjectStore("UserLoggedIn", {keyPath: "id", autoIncrement:false});
	}


	$.get('http://localhost:5984/_uuids', function(data, status){
		user = {
			login: 	  "admin",
			name: 	  "admin",
			email: 	  "admin@admin.net",
			pass: 	  "senha",
			address:  ".",
			is_admin: true
		};

		put('http://localhost:5984/doggos_users/' + data.uuids[0], JSON.stringify(user));
	});

	db.close();
};


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

// Função para fazer request PUT
function put (_url, _data, _redirect){
	$.ajax({
		method: "PUT",
		url: _url,
		data: _data,
		success: function(data, status) {
			if (_redirect)
				window.location.href = _redirect;
		}
	});
}


// Função que redireciona para a página de login caso a página atual necessite login e o usuário não esteja logado
function RequireLogin(){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 	  = open.result;
        var trans = db.transaction("UserLoggedIn", "readwrite");
		var user  = trans.objectStore("UserLoggedIn");

        user.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			trans.oncomplete = function() {
				db.close();
			};

			if (!cursor) {
				window.location.href = "/login";
			}
        };
	}
}

// Função que redireciona para a página de login caso a página atual necessite permissão de adm e o usuário não a tenha
function RequireAdm(){
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
							if (!(user.is_admin)) window.location.href = "/";
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
				trans.oncomplete = function() {	db.close(); };
				$.get('http://localhost:5984/doggos_users/' + cursor.value.id, function(user, status){
					if (!(user.is_admin)){
						$('#link_adm').remove();
						$('#link_adm_side').remove();
					}
				});
			}
        };
	}
}

function CheckLogin(){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 	  = open.result;
        var trans = db.transaction("UserLoggedIn", "readwrite");
		var user  = trans.objectStore("UserLoggedIn");

        user.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			trans.oncomplete = function() {
				db.close();
			};

			if (cursor) {
				StartNavbar();
				StartSidebar();
			}
			else{
				StartNavbarOff();
				StartSidebarOff();
			}
			$(".button-collapse").sideNav();
        };
	}
}
