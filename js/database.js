var DB_VERSION = 3;

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

// Se DB ainda não foi inicializado, cria os ObjectStore necessários
open.onupgradeneeded = function() {
    var db       = open.result;

	if(!db.objectStoreNames.contains("AnimalsStore"))
	{
		db.createObjectStore("AnimalsStore", {keyPath: "id", autoIncrement:true});
	}	
	if(!db.objectStoreNames.contains("UsersStore"))
	{
		let users = db.createObjectStore("UsersStore",   {keyPath: "id", autoIncrement:true});
		users.createIndex("username", "username", { unique: true });
	}	
	if(!db.objectStoreNames.contains("ProductStore"))
	{
		db.createObjectStore("ProductStore", {keyPath: "id", autoIncrement:true});
	}
	if(!db.objectStoreNames.contains("ServiceStore"))
	{
		db.createObjectStore("ServiceStore", {keyPath: "id", autoIncrement:true});
	}
	if(!db.objectStoreNames.contains("CartStore"))
	{
		db.createObjectStore("CartStore",    {keyPath: "product_id", autoIncrement:true});
	}
	if(!db.objectStoreNames.contains("PaymentStore"))
	{
		db.createObjectStore("PaymentStore", {keyPath: "id", autoIncrement:true});
	}
	if(!db.objectStoreNames.contains("ScheduleStore"))
	{
		db.createObjectStore("ScheduleStore", {keyPath: ["date", "time"]});
	}
	if(!db.objectStoreNames.contains("UserLoggedIn"))
	{
		db.createObjectStore("UserLoggedIn", {keyPath: "id", autoIncrement:false});
	}
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
