// Função para iterar sobre os objetos serviços e renderizar a respectiva tabela
function ServiceTable(){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 		 = open.result;
        var trans 	 = db.transaction("ServiceStore", "readwrite");
		var services = trans.objectStore("ServiceStore");

		var services_table = $('#services_table');

        services.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
				 services_table.append(
					`<tr>
						<td><a href="/area_adm/servicos/registrar?id=` + cursor.value.id + `"><i class="material-icons">edit</i></a></th>
						<td>` + cursor.value.name + `</th>
						<td>R$` + cursor.value.price + `</th>
						<td>xx</th>
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

// Função para adicionar/ atualizar serviço
function AddService(){
    var service_name = $('#name').val();
    var service_desc = $('#description').val();
    var service_pric = $('#price').val();

    // Se algum campo estiver vazio, mostra mensagem de erro
	if (!service_name || !service_desc || !service_pric){
		var error_box = $('#warning');
		error_box.html('Um ou mais campos estão vazios, por tanto não foi possível salvar')
		error_box.addClass('card-panel red white-text');
	}
	else{
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
		var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

		open.onsuccess = function(event) {
			var db = open.result;
			var trans = db.transaction("ServiceStore", "readwrite");
			var services = trans.objectStore("ServiceStore");

			var service_id = getParameterByName('id');
			var service;

			if (service_id){
				service = {
					id: parseInt(service_id),
					name: service_name,
                    description: service_desc,
                    price: service_pric
				};
			}
			else {
				service = {
					name: service_name,
                    description: service_desc,
                    price: service_pric
				};
			}

			services.put(service);

			trans.oncomplete = function() {
				db.close();
				window.location.href = "/area_adm/servicos/";
			};
		}
	}
}

function ShowScheduleService(){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 		= open.result;
        var trans 	= db.transaction(["AnimalsStore", "ServiceStore"], "readwrite");

        var animals  = trans.objectStore("AnimalsStore");
        var services = trans.objectStore("ServiceStore");

		var animals_select = $('#animals_select');
		var services_select = $('#services_select');

        animals.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
				 animals_select.append(
					`<option value="` + cursor.value.id  + `">` + cursor.value.name  + `</option>`
				);
				cursor.continue();
			}
        };

        services.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
				 services_select.append(
					`<option value="` + cursor.value.id  + `">` + cursor.value.name  + `</option>`
				);
				cursor.continue();
			}
        };

		trans.oncomplete = function() {
			$('select').material_select();
            db.close();
		};
	}
}

function ScheduleService(serv_id, serv_name, serv_price, anim_id, anim_name, date, time){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db = open.result;
        var trans = db.transaction("ScheduleStore", "readwrite");
        var services = trans.objectStore("ScheduleStore");

        var service = {
            service_id:     parseInt(serv_id),
            service_name:   serv_name,
            service_price:  parseFloat(serv_price),
            animal_id:      parseInt(anim_id),
            animal_name:    anim_name,
            date: date,
            time: time
        };

        services.put(service);

        trans.oncomplete = function() {
            var error_box = $('#message');
            error_box.html('Serviço agendado com sucesso.')
            error_box.addClass('card-panel green white-text');
            db.close();
        };
    }
}

function RedirectSchedule(){
    var serv_id     = $('#services_select').val();
    var serv_name   = $('#services_select :selected').text();
    var serv_price;
    var anim_id     = $('#animals_select').val();
    var anim_name   = $('#animals_select :selected').text();
    var serv_date   = $('#service_date').val();


    // Procura no DB o preço do serviço selecionado
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 		 = open.result;
        var trans 	 = db.transaction("ServiceStore", "readwrite");
		var services = trans.objectStore("ServiceStore");

        var getRequest = services.get(parseInt(serv_id));
		getRequest.onsuccess = function(event) {
            serv_price = getRequest.result.price;

            trans.oncomplete = function() {
                db.close();
                window.location.href = "./calendario_cadastro.html?" +
                    "serv_id="      + serv_id +
                    "&serv_name="   + serv_name +
                    "&serv_price="  + serv_price +
                    "&anim_id="     + anim_id +
                    "&anim_name="   + anim_name +
                    "&serv_date="   + serv_date;
            };
        };
	}

}

function ShowSchedeuleList(){
    var serv_id     = getParameterByName('serv_id');
    var serv_name   = getParameterByName('serv_name');
    var serv_price  = getParameterByName('serv_price');
    var anim_id     = getParameterByName('anim_id');
    var anim_name   = getParameterByName('anim_name');
    var serv_date   = getParameterByName('serv_date');

    var cards = $('#cards');
    for (var i = 8; i <= 18; i++){
        cards.append(
            `<div id="` + i + `">
                <div class="card">
                    <div class="row" style="margin-bottom: 0; display: flex;">
                        <div class="m2 s3 col" style="display: inline-block;">
                            <div class="green lighten-4 calendar-time center-align">
                                <span>` + i + `h00</span>
                            </div>
                        </div>
                        <div class="m10 s9 col">
                            <a class="card-title" href="./calendario_cadastro.html?` +
                                `serv_id=`      + serv_id +
                                `&serv_name=`   + serv_name +
                                "&serv_price="  + serv_price +
                                `&anim_id=`     + anim_id +
                                `&anim_name=`   + anim_name +
                                `&serv_date=`   + serv_date +
                                `&serv_time=`   + i +
                            `">Agendar</a>
                        </div>
                    </div>
                </div>
            </div>`
        );
    }

    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 		 = open.result;
        var trans 	 = db.transaction("ScheduleStore", "readwrite");
		var services = trans.objectStore("ScheduleStore");

        services.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
                if(cursor.value.date == serv_date){
                    $('#' + cursor.value.time).html(`
                        <div class="card">
                            <div class="row" style="margin-bottom: 0; display: flex;">
                                <div class="m2 s3 col" style="display: inline-block;">
                                    <div class="green lighten-1 white-text calendar-time center-align">
                                        <span>` + cursor.value.time + `h00</span>
                                    </div>
                                </div>
                                <div class="m10 s9 col">
                                    <span class="card-title">` + cursor.value.service_name + `</span>
                                    <br>
                                    <strong>` + cursor.value.animal_name + `</strong>
                                </div>
                            </div>
                        </div>
                    `);
                }
				cursor.continue();
			}
        };

		trans.oncomplete = function() {
			db.close();
		};
	}
}

function ShowAnimalSchedule(animal_id){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        var db 		 = open.result;
        var trans 	 = db.transaction("ScheduleStore", "readwrite");
		var services = trans.objectStore("ScheduleStore");

        var animal_services = $('#animal_services');

        services.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
                if(cursor.value.animal_id == animal_id){
                    animal_services.append(`
                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">` + cursor.value.service_name +` </span>
                                <p><span class="grey-text">Dia: </span>` + cursor.value.date + `</p>
								<p><span class="grey-text">Hora: </span>` + cursor.value.time +`h00</p>
                            </div>
                        </div>
                    `);
                }
				cursor.continue();
			}
        };

		trans.oncomplete = function() {
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

function ShowUserSchedule(){
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var open = indexedDB.open("PetshopDogosDatabase", DB_VERSION);

    open.onsuccess = function(event) {
        console.log(".");

        var db 		 = open.result;
        var trans 	 = db.transaction("ScheduleStore", "readwrite");
		var payments = trans.objectStore("ScheduleStore");

		var cards = $('#cards');

        payments.openCursor().onsuccess = function(event) {
        	var cursor = event.target.result;
			if (cursor) {
                cards.append(
					`<div class="col s12 m6 l6">
						<div class="card">
							<div class="card-content">
								<div class="card-title">` + cursor.value.animal_name + `</div>
								<span style="color:gray;">Serviço:</span> ` + cursor.value.service_name + `<br>
								<span style="color:gray;">Dia:</span> ` + cursor.value.date + `<br>
								<span style="color:gray;">Horário:</span> ` + cursor.value.time + `h 00
							</div>
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