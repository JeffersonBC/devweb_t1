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
        products_table.append(
            `<tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><strong>Valor total da compra</strong></td>
                <td id="cart_total"></td>
                <td></td>
            </tr>`
        );
        var products_total = $('#cart_total');
        var qtds = {};

        products.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
                products_table.prepend(
                    `<tr id="` + cursor.value.product_id + `">
                        <td>` + cursor.value.product_qtd + `</td>
                    </tr>`
                );
                qtds[cursor.value.product_id] = parseInt(cursor.value.product_qtd);

                $.get('http://localhost:5984/doggos_products/' + cursor.value.product_id, function(product, status){
                    total += product.price * qtds[product._id];
                    products_total.html(total);

                    $('#' + product._id).prepend(
                        `<td>` + product.name + `</td>
                        <td>` + product.price + `</td>`
                    );
                });
                cursor.continue();
			}
        };

		trans.oncomplete = function() {
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

        var getRequest = products.get(product_id);
		getRequest.onsuccess = function(event) {
            var product;

            if (getRequest.result){
                product = {
                    product_id: product_id,
                    product_qtd : getRequest.result.product_qtd + 1
                };
            }
            else {
                product = {
                    product_id: product_id,
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
        var products_total = $('#price');
        var qtds = {};

        products.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
                qtds[cursor.value.product_id] = parseInt(cursor.value.product_qtd);

                $.get('http://localhost:5984/doggos_products/' + cursor.value.product_id, function(product, status){
                    total += product.price * qtds[product._id];
                    products_total.html(total);
                });

                cursor.continue();
			}
        };

		trans.oncomplete = function() {
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
            // Adiciona Objeto Pagamento
            $.get('http://localhost:5984/_uuids', function(data, status){
				var payment = `{
                    \"name\": \"` 	+ $('#name').val().toString() + `\",
                    \"price\": \"` 	+ $('#price').html().toString() + `\",
                    \"card\": \"` 	+ $('#credit_card').val().toString() + `\"
                }`;

				put('http://localhost:5984/doggos_sales/' + data.uuids[0], payment);


                // Remove objetos do carrinho e salva ids e quantidades de produtos em arrays
                var db = open.result;
                var cart_trans = db.transaction("CartStore", "readwrite");

                var products_ids = [];
                var products_qtd = [];

                cart_trans.objectStore("CartStore").openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        products_ids.push(cursor.value.product_id);
                        products_qtd.push(cursor.value.product_qtd);

                        cursor.delete();
                        cursor.continue();
                    }
                };

                // Atualiza a quantidade de produtos
                cart_trans.oncomplete = function(event) {
                    for (let i = 0; i < products_ids.length; i++){
                        $.get('http://localhost:5984/doggos_products/' + products_ids[i], function(product, status){
                            product.qtd = (parseInt(product.qtd) - products_qtd[i]);
                            var product_updt = `{
                                \"_rev\": \"` 	+ product._rev + `\",
                                \"name\": \"` 	+ product.name + `\",
                                \"desc\": \"`	+ product.desc + `\",
                                \"qtd\":  \"` 	+ product.qtd + `\",
                                \"price\": \"` 	+ product.price + `\"
                            }`;
                            console.log(product_updt);

                            put('http://localhost:5984/doggos_products/' + products_ids[i], product_updt);
                        });

                        if (i == products_ids.length - 1) {
                            window.location.href = '/';
                            db.close();
                        }
                    }
                };
            });
        }
    }
}


// ===
function ProductSalesTable(){
    $.get('http://localhost:5984/doggos_sales/_all_docs', function(data, status){
        var payments_table = $('#pay_table');
        var total = 0;

        for (let i = 0; i < data.total_rows; i++){
			$.get('http://localhost:5984/doggos_sales/' + data.rows[i].id, function(sales, status){
                total += parseFloat(sales.price);
                payments_table.append(
                    `<tr>
                        <td>` + sales.name + `</td>
                        <td>` + parseFloat(sales.price).toFixed(2) + `</td>
                    </tr>`
                );

                if (i == data.total_rows - 1)
                    $('#total_sales').html(total.toFixed(2));
            });
        }
    });
}

function ServiceSalesTable(){
    var srv_name = {};
    var srv_pric = {};
    var ani_name = {};

    var len1 = 0;
    var len2 = 0;

    // Nomes dos serviços
    $.get('http://localhost:5984/doggos_services/_all_docs', function(data, status){
        for (let i = 0; i < data.total_rows; i++){
            $.get('http://localhost:5984/doggos_services/' + data.rows[i].id, function(service, status){
                srv_name[service._id] = service.name;
                srv_pric[service._id] = service.price;
                len1++;

                if (len1 == data.total_rows){

                    // Nome dos animais
                    $.get('http://localhost:5984/doggos_animals/_all_docs', function(data_a, status){
                        console.log(data_a.total_rows)
                        for (let j = 0; j < data_a.total_rows; j++){
                            $.get('http://localhost:5984/doggos_animals/' + data_a.rows[j].id, function(animal, status){
                                ani_name[animal._id] = animal.name;
                                len2++;

                                if (len2 == data_a.total_rows){
                                    // Preenche a tabela
                                    FillServicesTable(data, srv_name, srv_pric, ani_name);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

function FillServicesTable(data, srv_name, srv_pric, ani_name){
    $.get('http://localhost:5984/doggos_shceduling/_all_docs', function(data, status){
        var serv_table = $('#serv_table');
        var total = 0;

        for (let i = 0; i < data.total_rows; i++){
            $.get('http://localhost:5984/doggos_shceduling/' + data.rows[i].id, function(schedule, status){
                total += parseFloat(srv_pric[schedule.service_id]);
                serv_table.append(
                    `<tr>
                        <td>` + srv_name[schedule.service_id] + `</td>
                        <td>` + ani_name[schedule.animal_id] + `</td>
                        <td>` + schedule.date + `</td>
                        <td>` + schedule.time + `h00</td>
                        <td>` + parseFloat(srv_pric[schedule.service_id]).toFixed(2) + `</td>
                    </tr>`
                );

                if (i == data.total_rows - 1){
                    $('#total_sales').html(total.toFixed(2));
                }
            });
        }
    });
}