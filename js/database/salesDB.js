// Função para iterar sobre o carrinho e renderizar a respectiva tabela
function CartTable(){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

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
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db = open.result;
        var trans = db.transaction("CartStore", "readwrite");
        var products = trans.objectStore("CartStore");

        var product_store = db.transaction("ProductStore", "readwrite").objectStore("ProductStore");
        var current_product = product_store.get(parseInt(product_id));

        var getRequest = products.get(parseInt(product_id));
		getRequest.onsuccess = function(event) {
            var product;

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

function ShowCartPayment(){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 		 = open.result;
        var trans 	 = db.transaction("CartStore", "readwrite");
		var products = trans.objectStore("CartStore");

        var total = 0;

        products.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
                total += cursor.value.product_price * cursor.value.product_qtd;
				cursor.continue();
			}
        };

		trans.oncomplete = function() {
            $('#price').html(total);
            db.close();
		};
	}
}

function AddPayment(){
    // Se algum campo estiver vazio, mostra mensagem de erro
	if (!$('#name').val() || !$('#credit_card').val()){
		var error_box = $('#warning');
		error_box.html('Um ou mais campos estão vazios, por tanto não foi possível salvar')
		error_box.addClass('card-panel red white-text');
	}
	else{
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

        open.onsuccess = function(event) {
            var db = open.result;
            var cart_trans = db.transaction(["CartStore", "PaymentStore"], "readwrite");

            var products_ids = [];
            var products_qtd = [];
            var i = 0;

            // Adiciona Objeto Pagamento
            var payments = cart_trans.objectStore("PaymentStore");
            var payment;
            payment = {
                name: $('#name').val(),
                price: parseFloat($('#price').html()),
                credit_card : $('#credit_card').val()
            };
            payments.put(payment);

            // Remove objetos do carrinho e salva ids e quantidades de produtos em arrays
            var cart = cart_trans.objectStore("CartStore");
            cart.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    products_ids.push(cursor.value.product_id);
                    products_qtd[cursor.value.product_id] = cursor.value.product_qtd;
                    i++;

                    cursor.delete();
                    cursor.continue();
                }
            };

            // Atualiza a quantidade de produtos
            cart_trans.oncomplete = function(event) {
                var prod_trans = db.transaction("ProductStore", "readwrite");
                var products = prod_trans.objectStore("ProductStore");

                products.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        if (products_ids.includes(cursor.value.id)){
                            var product = {
                                id: cursor.value.id,
                                name: cursor.value.name,
                                description: cursor.value.description,
                                qtd : cursor.value.qtd - products_qtd[cursor.value.id],
                                price: cursor.value.price
                            }
                            console.log(product);
                            cursor.update(product);
                        }
                        cursor.continue();
                    }
                }

                prod_trans.oncomplete = function(event) {
                    db.close();
                    window.location.href = "/";
                };

            };
        }
    }
}


// ===
function ProductSalesTable(){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 		 = open.result;
        var trans 	 = db.transaction("PaymentStore", "readwrite");
		var payments = trans.objectStore("PaymentStore");

		var payments_table = $('#pay_table');
        var total = 0;

        payments.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
                total += cursor.value.price;

                payments_table.append(
					`<tr>
                        <td>` + cursor.value.name + `</td>
                        <td>` + cursor.value.price + `</td>
                    </tr>`
				);

				cursor.continue();
			}
        };

		trans.oncomplete = function() {
            $('#total_sales').html(total);
            db.close();
		};
	}
}

function ServiceSalesTable(){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 		 = open.result;
        var trans 	 = db.transaction("ScheduleStore", "readwrite");
		var payments = trans.objectStore("ScheduleStore");

		var serv_table = $('#serv_table');
        var total = 0;

        payments.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
                total += cursor.value.service_price;

                serv_table.append(
					`<tr>
                        <td>` + cursor.value.service_name + `</td>
                        <td>` + cursor.value.animal_name + `</td>
                        <td>` + cursor.value.date + `</td>
                        <td>` + cursor.value.time + `</td>
                        <td>` + cursor.value.service_price + `</td>
                    </tr>`
				);

				cursor.continue();
			}
        };

		trans.oncomplete = function() {
            $('#total_sales').html(total);
            db.close();
		};
	}
}