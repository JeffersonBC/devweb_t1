// Os menus estão sendo feitos como strings por não ser possível fazer um XMLHttpRequest sem um servidor local.
// Na próxima entrega, quando haverá um servidor local, essas funções serão substituídas para carregar um arquivo html no lugar dessa gambiarra com strings.

function StartNavbar (){
    $('#navbar').html(`
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
                    <a href="./index_cliente.html" class="brand-logo">
                        <img src="./svg/pata.svg" class="icon">
                        Petshop Dogos
                        <img src="./svg/pata.svg" class="icon">
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="./carrinho.html">Carrinho</a></li>
                        <li><a href="./agenda.html">Agenda</a></li>
                        <li><a href="./area_usuario.html">Área de usuário</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    `);
}

function StartSidebar (){
    $('#sidebar').html(`
        <ul id="slide-out" class="side-nav fixed">
            <li><a href="./index_cliente.html">Home</a></li>
            <li><a href="#">Endereço e Contato</a></li>

            <div class="divider hide-on-large-only"></div>

            <li class="hide-on-large-only"><a href="./carrinho.html">Carrinho</a></li>
            <li class="hide-on-large-only"><a href="./agenda.html">Agenda</a></li>
            <li class="hide-on-large-only"><a href="./area_usuario.html">Área de usuário</a></li>

            <div class="divider"></div>

            <h5 style="padding: 0 32px;">Produtos</h5>
            <li><a href="#">Ração</a></li>
            <li><a href="#">Produtos de Higiene</a></li>
            <li><a href="#">Brinquedos</a></li>
            <li><a href="#">Medicamentos</a></li>

            <div class="divider"></div>

            <h5 style="padding: 0 32px;">Serviços</h5>
            <li><a href="">Banho e Tosa</a></li>
            <li><a href="">Pet-Hotel</a></li>
            <li><a href="">Veterinário</a></li>
            <li><a href="./calendario.html">Agendar Serviço</a></li>
            <li><a href="./table_animais.html">Gerenciar Animais</a></li>
        </ul>
    `);
}

function StartNavbarOff (){
    $('#navbar').html(`
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
                    <a href="./index.html" class="brand-logo">
                        <img src="./svg/pata.svg" class="icon">
                        Petshop Dogos
                        <img src="./svg/pata.svg" class="icon">
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="./carrinho.html">Carrinho</a></li>
                        <li><a href="./login.html">Login</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    `);
}

function StartSidebarOff (){
    $('#sidebar').html(`
        <ul id="slide-out" class="side-nav fixed">
            <li><a href="./index.html">Home</a></li>
            <li><a href="#">Endereço e Contato</a></li>

            <div class="divider hide-on-large-only"></div>

            <li class="hide-on-large-only"><a href="./carrinho.html">Carrinho</a></li>
            <li class="hide-on-large-only"><a href="./login.html">Login</a></li>

            <div class="divider"></div>

            <h5 style="padding: 0 32px;">Produtos</h5>
            <li><a href="#">Ração</a></li>
            <li><a href="#">Produtos de Higiene</a></li>
            <li><a href="#">Brinquedos</a></li>
            <li><a href="#">Medicamentos</a></li>

            <div class="divider"></div>

            <h5 style="padding: 0 32px;">Serviços</h5>
            <li><a href="">Banho e Tosa</a></li>
            <li><a href="">Pet-Hotel</a></li>
            <li><a href="">Veterinário</a></li>
        </ul>
    `);
}

function StartNavbarAdm (){
    $('#navbar').html(`
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
                    <a href="./index_cliente.html" class="brand-logo">
                        <img src="./svg/pata.svg" class="icon">
                        Petshop Dogos
                        <img src="./svg/pata.svg" class="icon">
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <a href="./area_usuario.html">Área de usuário</a>
                    </ul>
                </div>
            </nav>
        </div>
    `);
}

function StartSidebarAdm (){
    $('#sidebar').html(`
        <ul id="slide-out" class="side-nav fixed">
            <li><a href="./index_cliente.html">Home</a></li>

            <div class="divider hide-on-large-only"></div>
            <li class="hide-on-large-only"><a href="./area_usuario.html">Área de usuário</a></li>

            <div class="divider"></div>

			<h5 style="padding: 0 32px;">Cadastro</h5>
			<li><a href="./table_prod.html">Produtos</a></li>
			<li><a href="./table_servico.html">Serviços</a></li>

			<div class="divider"></div>
			<h5 style="padding: 0 32px;">Finanças</h5>
			<li><a href="./vendas_prod.html">Vendas de Produtos</a></li>
			<li><a href="./vendas_servico.html">Vendas de Serviços</a></li>

			<div class="divider"></div>
			<li><a href="./reg_admin.html">Cadastrar Administrador</a></li>
        </ul>
    `);
}

function StartNavbarUser (){
    $('#navbar').html(`
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
                    <a href="./index_cliente.html" class="brand-logo">
                        <img src="./svg/pata.svg" class="icon">
                        Petshop Dogos
                        <img src="./svg/pata.svg" class="icon">
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="./carrinho.html">Carrinho</a></li>
				        <li><a href="./agenda.html">Agenda</a></li>
				        <li><a href="./area_adm.html">Área de Adminstração</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    `);
}

function StartSidebarUser (){
    $('#sidebar').html(`
        <ul id="slide-out" class="side-nav fixed">
            <li><a href="./index_cliente.html">Home</a></li>

            <div class="divider hide-on-large-only"></div>

            <li class="hide-on-large-only"><a href="./carrinho.html">Carrinho</a></li>
            <li class="hide-on-large-only"><a href="./agenda.html">Agenda</a></li>
            <li class="hide-on-large-only"><a href="./area_adm.html">Área de Adminstração</a></li>

            <div class="divider"></div>

            <li><a href="edit_usuario.html">Editar Conta</a></li>
            <li><a href="">Histórico de Compras</a></li>

            <div class="divider"></div>

            <li><a href="./calendario.html">Agendar Serviço</a></li>
            <li><a href="./table_animais.html">Gerenciar Animais</a></li>

            <div class="divider"></div>

            <li><a href="">Sair desta Conta</a></li>
        </ul>
    `);
}
