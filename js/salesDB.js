// Função para iterar sobre o carrinho e renderizar a respectiva tabela
function CartTable(){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", 1);

    open.onsuccess = function(event) {
        var db 		= open.result;
        var trans 	= db.transaction("CartStore", "readwrite");
		var products = trans.objectStore("CartStore");

		var products_table = $('#cart_table');

        var total = 0;

        products.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
                total += cursor.value.product_price * cursor.value.product_qtd;

				 products_table.append(
					`<tr>
                        <td>` + cursor.value.product_name + `</td>
                        <td>` + cursor.value.product_price + `</td>
                        <td>` + cursor.value.product_qtd + `</td>
                    </tr>`
				);
				cursor.continue();
			}
        };

		trans.oncomplete = function() {
			products_table.append(
                `<tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td><strong>Valor total da compra</strong></td>
                    <td>` + total + `</td>
                    <td></td>
                </tr>`
            );

            db.close();
		};
	}
}

function AddToCart(product_id){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", 1);

    open.onsuccess = function(event) {
        var db = open.result;
        var trans = db.transaction("CartStore", "readwrite");
        var products = trans.objectStore("CartStore");

        var product_store = db.transaction("ProductStore", "readwrite").objectStore("ProductStore");
        var current_product = product_store.get(parseInt(product_id));

        var getRequest = products.get(parseInt(product_id));
		getRequest.onsuccess = function(event) {
            var product;
            console.log(getRequest);

            if (getRequest.result){
                product = {
                    product_id: parseInt(product_id),
                    product_name: current_product.result.name,
                    product_price: current_product.result.price,
                    product_qtd : getRequest.result.product_qtd + 1
                };
            }
            else {
                product = {
                    product_id: parseInt(product_id),
                    product_name: current_product.result.name,
                    product_price: current_product.result.price,
                    product_qtd : 1
                };
            }

            products.put(product);

			trans.oncomplete = function() {
				db.close();
			};
        }
    }
}

function ShowCart(){

}