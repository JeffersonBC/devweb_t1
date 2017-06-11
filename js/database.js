var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var open = indexedDB.open("PetshopDogosDatabase", 1);

// Se DB ainda não foi inicializado, cria os ObjectStore necessários
open.onupgradeneeded = function() {
    var db       = open.result;

    db.createObjectStore("AnimalsStore", {keyPath: "id", autoIncrement:true});
    db.createObjectStore("UsersStore",   {keyPath: "id", autoIncrement:true});
    db.createObjectStore("ProductStore", {keyPath: "id", autoIncrement:true});
    db.createObjectStore("ServiceStore", {keyPath: "id", autoIncrement:true});

    db.createObjectStore("CartStore",    {keyPath: "product_id", autoIncrement:true});
    db.createObjectStore("PaymentStore", {keyPath: "id", autoIncrement:true});
    db.createObjectStore("ScheduleStore", {keyPath: ["date", "time"]});
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
