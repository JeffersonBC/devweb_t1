// Função para iterar sobre os objetos produtos e renderizar a respectiva tabela
function ProductTable (){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", 1);

    open.onsuccess = function(event) {
        var db 		= open.result;
        var trans 	= db.transaction("ProductStore", "readwrite");
		var products = trans.objectStore("ProductStore");

		var products_table = $('#products_table');

        products.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
				 products_table.append(
					`<tr class="table-itens">
						<td><a href="./reg_prod.html?id=` + cursor.value.id + `"><i class="material-icons">edit</i></a></th>
						<td>` + cursor.value.name + `</th>
						<td>` + cursor.value.price + `</th>
						<td>` + cursor.value.qtd + `</th>
						<td><a href="./update_prod.html"><i class="material-icons">update</i></a></th>
					</tr>`
				);
				cursor.continue();
			}
        };

		trans.oncomplete = function() {
			db.close();
		};
	}
}

// Função para adicionar/ atualizar produto
function AddProduct (){
	var product_name 	= $('#name').val();
	var product_desc    = $('#description').val();
	var product_qtd 	= $('#qtd').val();
	var product_price   = $('#price').val();

	// Se algum campo estiver vazio, mostra mensagem de erro
	if (!product_name || !product_desc || !product_qtd || !product_price){
		var error_box = $('#warning');
		error_box.html('Um ou mais campos estão vazios, por tanto não foi possível salvar')
		error_box.addClass('card-panel red white-text');
	}
	else{
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
		var open = indexedDB.open("PetshopDogosDatabase", 1);

		open.onsuccess = function(event) {
			var db = open.result;
			var trans = db.transaction("ProductStore", "readwrite");
			var products = trans.objectStore("ProductStore");

			var product_id = getParameterByName('id');
			var product;

			if (product_id){
				product = {
					id: parseInt(product_id),
					name: product_name,
                    description: product_desc,
                    qtd : product_qtd,
                    price: product_price
				};
			}
			else {
				product = {
					name: product_name,
                    description: product_desc,
                    qtd : product_qtd,
                    price: product_price
				};
			}

			products.put(product);

			trans.oncomplete = function() {
				db.close();
				window.location.href = "./table_prod.html";
			};
		}
	}
}

// Se estiver editando uma instância válida de um objeto produto, inicializar página de acordo
function GetEditedProduct(product_id){
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
	var open = indexedDB.open("PetshopDogosDatabase", 1);

	open.onsuccess = function(event) {
		var db = open.result;
		var trans = db.transaction(['ProductStore'], 'readonly');
		var products = trans.objectStore('ProductStore');

 		var getRequest = products.get(parseInt(product_id));

		getRequest.onsuccess = function(event) {
			$("#title").html("Editar Produto");
			$("#send").html("Salvar");

			$("#name").val(getRequest.result.name);
			$("#description").val(getRequest.result.description);
			$("#qtd").val(getRequest.result.qtd);
			$("#price").val(getRequest.result.price);
		};

		trans.oncomplete = function() {
			db.close();
		};
	}
}

// Função renderizar produtos na página inicial
function ProductCards (){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", 1);

    open.onsuccess = function(event) {
        var db 		= open.result;
        var trans 	= db.transaction("ProductStore", "readwrite");
		var products = trans.objectStore("ProductStore");

		var products_table = $('#products_row');

        products.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
				 products_table.append(
					`<div class="col s12 m6 l4">
						<div class="card">
							<div class="card-content">
								<span class="card-title">` + cursor.value.name + `</span>
								<p><span class="grey-text">Preço: </span>R$` + cursor.value.price + `</p>
								<p>` + cursor.value.description + `</p>
							</div>
                            <div class="card-action">
                                <a href="./carrinho.html?id=` + cursor.value.id + `">Adicionar ao Carrinho</a>
                            </div
						</div>
					</div>`
				);
				cursor.continue();
			}
        };

		trans.oncomplete = function() {
			db.close();
		};
	}
}