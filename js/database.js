var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var open = indexedDB.open("PetshopDogosDatabase", 1);

// Se DB ainda não foi inicializado, cria os ObjectStore necessários
open.onupgradeneeded = function() {
    var db       = open.result;

    var animals  = db.createObjectStore("AnimalsStore", {keyPath: "id", autoIncrement:true});
    var users    = db.createObjectStore("UsersStore",   {keyPath: "id", autoIncrement:true});
    var products = db.createObjectStore("ProductStore", {keyPath: "id", autoIncrement:true});
    var service  = db.createObjectStore("ServiceStore", {keyPath: "id", autoIncrement:true});
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
