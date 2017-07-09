// Os menus estão sendo feitos como strings por não ser possível fazer um XMLHttpRequest sem um servidor local.
// Na próxima entrega, quando haverá um servidor local, essas funções serão substituídas para carregar um arquivo html no lugar dessa gambiarra com strings.

function StartNavbar (){
    $('#navbar').html(`
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
                    <a href="/" class="brand-logo">
                        <img src="/svg/pata.svg" class="icon">
                        Petshop Dogos
                        <img src="/svg/pata.svg" class="icon">
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="/carrinho">Carrinho</a></li>
                        <li><a href="/area_usuario/agenda">Agenda</a></li>
                        <li><a href="/area_usuario">Área de usuário</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    `);
}

function StartSidebar (){
    $('#sidebar').html(`
        <ul id="slide-out" class="side-nav fixed">
            <li><a href="/">Home</a></li>
            <li><a href="#">Endereço e Contato</a></li>

            <div class="divider hide-on-large-only"></div>

            <li class="hide-on-large-only"><a href="/carrinho">Carrinho</a></li>
            <li class="hide-on-large-only"><a href="/area_usuario/agenda">Agenda</a></li>
            <li class="hide-on-large-only"><a href="/area_usuario">Área de usuário</a></li>

            <div class="divider"></div>

            <h5 style="padding: 0 32px;">Produtos</h5>
            <li><a href="#">Ração</a></li>
            <li><a href="#">Produtos de Higiene</a></li>
            <li><a href="#">Brinquedos</a></li>
            <li><a href="#">Medicamentos</a></li>

            <div class="divider"></div>

            <h5 style="padding: 0 32px;">Serviços</h5>
            <li><a href="#">Banho e Tosa</a></li>
            <li><a href="#">Pet-Hotel</a></li>
            <li><a href="#">Veterinário</a></li>
            <li><a href="/area_usuario/agendar">Agendar Serviço</a></li>
            <li><a href="/area_usuario/animais">Gerenciar Animais</a></li>
        </ul>
    `);
}

function StartNavbarOff (){
    $('#navbar').html(`
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
                    <a href="/" class="brand-logo">
                        <img src="/svg/pata.svg" class="icon">
                        Petshop Dogos
                        <img src="/svg/pata.svg" class="icon">
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="/carrinho">Carrinho</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    `);
}

function StartSidebarOff (){
    $('#sidebar').html(`
        <ul id="slide-out" class="side-nav fixed">
            <li><a href="/">Home</a></li>
            <li><a href="#">Endereço e Contato</a></li>

            <div class="divider hide-on-large-only"></div>

            <li class="hide-on-large-only"><a href="/carrinho">Carrinho</a></li>
            <li class="hide-on-large-only"><a href="/login">Login</a></li>

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
                    <a href="/" class="brand-logo">
                        <img src="/svg/pata.svg" class="icon">
                        Petshop Dogos
                        <img src="/svg/pata.svg" class="icon">
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <a href="/area_usuario">Área de usuário</a>
                    </ul>
                </div>
            </nav>
        </div>
    `);
}

function StartSidebarAdm (){
    $('#sidebar').html(`
        <ul id="slide-out" class="side-nav fixed">
            <li><a href="/">Home</a></li>

            <div class="divider hide-on-large-only"></div>
            <li class="hide-on-large-only"><a href="/area_usuario">Área de usuário</a></li>

            <div class="divider"></div>

			<h5 style="padding: 0 32px;">Cadastro</h5>
			<li><a href="/area_adm/produtos">Produtos</a></li>
			<li><a href="/area_adm/servicos">Serviços</a></li>

			<div class="divider"></div>
			<h5 style="padding: 0 32px;">Finanças</h5>
			<li><a href="/area_adm/produtos/vendas">Vendas de Produtos</a></li>
			<li><a href="/area_adm/servicos/vendas">Vendas de Serviços</a></li>

			<div class="divider"></div>
			<li><a href="/area_adm/cadastro">Cadastrar Administrador</a></li>
        </ul>
    `);
}

function StartNavbarUser (){
    $('#navbar').html(`
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a>
                    <a href="/" class="brand-logo">
                        <img src="/svg/pata.svg" class="icon">
                        Petshop Dogos
                        <img src="/svg/pata.svg" class="icon">
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="/carrinho">Carrinho</a></li>
				        <li><a href="/area_usuario/agenda">Agenda</a></li>
				        <li id="link_adm"><a href="/area_adm">Área de Adminstração</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    `);
}

function StartSidebarUser (){
    $('#sidebar').html(`
        <ul id="slide-out" class="side-nav fixed">
            <li><a href="/">Home</a></li>

            <div class="divider hide-on-large-only"></div>

            <li class="hide-on-large-only"><a href="/carrinho">Carrinho</a></li>
            <li class="hide-on-large-only"><a href="/area_usuario/agenda">Agenda</a></li>
            <li class="hide-on-large-only" id="link_adm_side"><a href="/area_adm">Área de Adminstração</a></li>

            <div class="divider"></div>

            <li><a href="/area_usuario/editar_usuario">Editar Conta</a></li>
            <li><a href="">Histórico de Compras</a></li>

            <div class="divider"></div>

            <li><a href="/area_usuario/agendar">Agendar Serviço</a></li>
            <li><a href="/area_usuario/animais">Gerenciar Animais</a></li>

            <div class="divider"></div>

            <li><a onclick="Loggoff()">Sair desta Conta</a></li>
        </ul>
    `);
}
