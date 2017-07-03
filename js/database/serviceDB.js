// Função para iterar sobre os objetos serviços e renderizar a respectiva tabela
function ServiceTable(){
    $.get('http://localhost:5984/doggos_services/_all_docs', function(data, status){
		var services_table = $('#services_table');

		for (let i = 0; i < data.total_rows; i++){
			$.get('http://localhost:5984/doggos_services/' + data.rows[i].id, function(service, status){
                services_table.append(
                    `<tr>
                        <td>
                            <a href="/area_adm/servicos/registrar?id=` + service._id + `&rev=` + service._rev + `">
                            <i class="material-icons">edit</i></a></th>
                        <td>` + service.name + `</th>
                        <td>R$` + service.price + `</th>
                    </tr>`
                );
            });
        }
    });
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
        var service_id = getParameterByName('id');
        var service_rev = getParameterByName('rev');

        // Editando serviço existente
		if (service_id && service_rev){
			var service = `{
				\"_rev\": \"` 	+ service_rev + `\",
				\"name\": \"` 	+ service_name + `\",
				\"desc\": \"`	+ service_desc + `\",
				\"price\": \"` 	+ service_pric + `\"
			}`;

			put('http://localhost:5984/doggos_services/' + service_id, service, "/area_adm/servicos");
		}
		// Adicionando serviço novo
		else{
			$.get('http://localhost:5984/_uuids', function(data, status){
				var service = `{
					\"name\": \"` 	+ service_name + `\",
					\"desc\": \"`	+ service_desc + `\",
					\"price\": \"` 	+ service_pric + `\"
				}`;

				put('http://localhost:5984/doggos_services/' + data.uuids[0], service, "/area_adm/servicos");
			});
		}
	}
}

// Se estiver editando uma instância válida de um objeto serviço, inicializar página de acordo
function GetEditedService(service_id){
	$.get('http://localhost:5984/doggos_services/' + service_id, function(service, status){
		$("#title")	.html("Editar Serviço");
		$("#send")	.html("Salvar");

		$("#name")			.val(service.name);
		$("#description")	.val(service.desc);
		$("#price")			.val(service.price);
	});
}



// Inicializa os campos 'select' da página 'Agendar Serviço'
function ShowScheduleService(){
    var animals_select = $('#animals_select');
    var services_select = $('#services_select');

    $.get('http://localhost:5984/doggos_animals/_all_docs', function(data, status){
        for (let i = 0; i < data.total_rows; i++){
			$.get('http://localhost:5984/doggos_animals/' + data.rows[i].id, function(animal, status){
				animals_select.append(
					`<option value="` + animal._id  + `">` + animal.name  + `</option>`
				);
                if (i == data.total_rows - 1)
                    animals_select.material_select();
			});
        }
    });

    $.get('http://localhost:5984/doggos_services/_all_docs', function(data, status){
        for (let i = 0; i < data.total_rows; i++){
			$.get('http://localhost:5984/doggos_services/' + data.rows[i].id, function(service, status){
				services_select.append(
					`<option value="` + service._id  + `">` + service.name  + `</option>`
				);
                if (i == data.total_rows - 1)
                    services_select.material_select();
			});
        }
    });
}

// Redireciona 'Agendar Serviço' para a escolha de data, no serviço e para o animal selecionados
function RedirectSchedule(){
    var serv_id     = $('#services_select') .val();
    var anim_id     = $('#animals_select')  .val();
    var serv_date   = $('#service_date')    .val();

    window.location.href = "/area_usuario/agendar/data_hora?" +
        "serv_id="      + serv_id +
        "&anim_id="     + anim_id +
        "&serv_date="   + serv_date;
}

function ShowSchedeuleList(){
    var serv_id     = getParameterByName('serv_id');
    var anim_id     = getParameterByName('anim_id');
    var serv_date   = getParameterByName('serv_date');

    var cards = $('#cards');
    for (var i = 8; i <= 18; i++){
        cards.append(
            `<div id="` + i + `">
                <div class="card">
                    <div class="row" style="margin-bottom: 0; display: flex;">
                        <div class="m2 s3 col" style="display: inline-block;">
                            <div class="green lighten-3 calendar-time center-align">
                                <span>` + i + `h00</span>
                            </div>
                        </div>
                        <div class="m10 s9 col">
                            <a class="card-title" href="/area_usuario/agendar/data_hora?` +
                                `serv_id=`      + serv_id +
                                `&anim_id=`     + anim_id +
                                `&serv_date=`   + serv_date +
                                `&serv_time=`   + i +
                            `">Agendar</a>
                        </div>
                    </div>
                </div>
            </div>`
        );
    }


    $.get('http://localhost:5984/doggos_shceduling/_all_docs', function(data, status){
		for (let i = 0; i < data.total_rows; i++){
			$.get('http://localhost:5984/doggos_shceduling/' + data.rows[i].id, function(schedule, status){
                if(schedule.date == serv_date){
                    // Busca serviço correspondente
                    $.get('http://localhost:5984/doggos_services/' + schedule.service_id, function(service, status){
                        // Busca animal correspondente
                        $.get('http://localhost:5984/doggos_animals/' + schedule.animal_id, function(animal, status){
                            // Renderiza card de slot ocupado
                            $('#' + schedule.time).html(`
                                <div class="card">
                                    <div class="row" style="margin-bottom: 0; display: flex;">
                                        <div class="m2 s3 col" style="display: inline-block;">
                                            <div class="green lighten-1 white-text calendar-time center-align">
                                                <span>` + schedule.time + `h00</span>
                                            </div>
                                        </div>
                                        <div class="m10 s9 col">
                                            <span class="card-title">` + service.name + `</span>
                                            <br>
                                            <strong>` + animal.name + `</strong>
                                        </div>
                                    </div>
                                </div>
                            `);
                        });
                    });
                }
			});
        }
	});

}

function ScheduleService(serv_id, anim_id, date, time){
    $.get('http://localhost:5984/_uuids', function(data, status){
        var schedule = `{
            \"service_id\": \"` + serv_id + `\",
            \"animal_id\": \"`	+ anim_id + `\",
            \"date\":  \"` 	    + date + `\",
            \"time\": \"` 	    + time + `\"
        }`;

        $.ajax({
            method: "PUT",
            url: 'http://localhost:5984/doggos_shceduling/' + data.uuids[0],
            data: schedule,
            success: function() {
                var msg_box = $('#message');
                msg_box.html('Serviço agendado com sucesso.')
                msg_box.addClass('card-panel green white-text');

                ShowSchedeuleList();
            }
        });
    });
}

function ShowAnimalSchedule(animal_id){
    var animal_services = $('#animal_services');

    $.get('http://localhost:5984/doggos_shceduling/_all_docs', function(data, status){
		for (let i = 0; i < data.total_rows; i++){
			$.get('http://localhost:5984/doggos_shceduling/' + data.rows[i].id, function(schedule, status){
                if(schedule.animal_id == animal_id){
                    // Busca serviço correspondente
                    $.get('http://localhost:5984/doggos_services/' + schedule.service_id, function(service, status){
                        // Renderiza card de slot ocupado
                        animal_services.append(`
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title">` + service.name +` </span>
                                    <p><span class="grey-text">Dia: </span>` + schedule.date + `</p>
                                    <p><span class="grey-text">Hora: </span>` + schedule.time +`h00</p>
                                </div>
                            </div>
                        `);
                    });
                }
			});
        }
	});
}

function ShowUserSchedule(){
    var cards = $('#cards');

    $.get('http://localhost:5984/doggos_shceduling/_all_docs', function(data, status){
		for (let i = 0; i < data.total_rows; i++){
			$.get('http://localhost:5984/doggos_shceduling/' + data.rows[i].id, function(schedule, status){
                //if(schedule.user_id == user_id){
                    // Busca serviço correspondente
                    $.get('http://localhost:5984/doggos_services/' + schedule.service_id, function(service, status){
                        // Busca animal correspondente
                        $.get('http://localhost:5984/doggos_animals/' + schedule.animal_id, function(animal, status){

                            cards.append(
                                `<div class="col s12 m6 l6">
                                    <div class="card">
                                        <div class="card-content">
                                            <div class="card-title">` + animal.name + `</div>
                                            <span style="color:gray;">Serviço:</span> ` + service.name + `<br>
                                            <span style="color:gray;">Dia:</span> ` + schedule.date + `<br>
                                            <span style="color:gray;">Horário:</span> ` + schedule.time + `h 00
                                        </div>
                                    </div>
                                </div>`
                            );
                        });
                    });
                //}
            });
        }
    });
}