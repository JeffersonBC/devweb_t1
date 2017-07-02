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

// Função para fazer request PUT
function put (_url, _data, _redirect){
	$.ajax({
		method: "PUT",
		url: _url,
		data: _data,
		success: function(data, status) {
			window.location.href = _redirect;
		}
	});
}