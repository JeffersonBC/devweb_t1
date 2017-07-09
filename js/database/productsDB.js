// Função para iterar sobre os objetos produtos e renderizar a respectiva tabela
function ProductTable (){
	$.get('http://localhost:5984/doggos_products/_all_docs', function(data, status){
		var products_table = $('#products_table');

		for (let i = 0; i < data.total_rows; i++){
			$.get('http://localhost:5984/doggos_products/' + data.rows[i].id, function(product, status){
				products_table.append(
					`<tr class="table-itens">
						<td>
							<a href="/area_adm/produtos/registrar?id=` + product._id + `&rev=` + product._rev + `">
							<i class="material-icons">edit</i></a></th>
						<td>` + product.name + `</th>
						<td>` + parseFloat(product.price).toFixed(2) + `</th>
						<td>` + product.qtd + `</th>
						<td>
							<a href="./update_prod.html"><i class="material-icons">update</i></a></th>
					</tr>`
				);
			});
		}
	});
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
		var product_id = getParameterByName('id');
		var product_rev = getParameterByName('rev');
		var product;

		// Editando produto existente
		if (product_id && product_rev){
			var product = `{
				\"_rev\": \"` 	+ product_rev + `\",
				\"name\": \"` 	+ product_name + `\",
				\"desc\": \"`	+ product_desc + `\",
				\"qtd\":  \"` 	+ product_qtd + `\",
				\"price\": \"` 	+ product_price + `\"
			}`;

			put('http://localhost:5984/doggos_products/' + product_id, product, "/area_adm/produtos");
		}
		// Adicionando produto novo
		else{
			$.get('http://localhost:5984/_uuids', function(data, status){
				var product = `{
					\"name\": \"` 	+ product_name + `\",
					\"desc\": \"`	+ product_desc + `\",
					\"qtd\":  \"` 	+ product_qtd + `\",
					\"price\": \"` 	+ product_price + `\"
				}`;

				put('http://localhost:5984/doggos_products/' + data.uuids[0], product, "/area_adm/produtos");
			});
		}
	}
}

// Se estiver editando uma instância válida de um objeto produto, inicializar página de acordo
function GetEditedProduct(product_id){
	$.get('http://localhost:5984/doggos_products/' + product_id, function(product, status){
		$("#title")	.html("Editar Produto");
		$("#send")	.html("Salvar");

		$("#name")			.val(product.name);
		$("#description")	.val(product.desc);
		$("#qtd")			.val(product.qtd);
		$("#price")			.val(product.price);
	});
}

// Função renderizar produtos na página inicial
function ProductCards (){
    $.get('http://localhost:5984/doggos_products/_all_docs', function(data, status){
		var products_table = $('#products_row');

		for (let i = 0; i < data.total_rows; i++){
			$.get('http://localhost:5984/doggos_products/' + data.rows[i].id, function(product, status){
				products_table.append(
					`<div class="col s12 m6 l4">
						<div class="card">
							<div class="card-content">
								<span class="card-title">` + product.name + `</span>
								<p><span class="grey-text">Preço: </span>R$` + parseFloat(product.price).toFixed(2) + `</p>
								<p>` + product.desc + `</p>
							</div>
							<div class="card-action">
								<a href="/carrinho?id=` + product._id + `">Adicionar ao Carrinho</a>
							</div
						</div>
					</div>`
				);
			});
		}
	});
}