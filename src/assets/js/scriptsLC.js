window.addEventListener('scroll', function() {
    let animacion = document.getElementById('animado');
    let posicionObj1 = animacion.getBoundingClientRect().top;
    //console.log(posicionObj1);

    let sizeScreen = window.innerHeight / 3;

    if (posicionObj1 >= 99) {

        //console.log('Me active');
        animacion.src = "assets/images/fondo-2.png";
        animacion.style.animation = 'mover 2s ease-out';
        animacion.style.marginLeft = '200px';

    }

    if (posicionObj1 <= -1) {

        //console.log('Me active de vuelta');
        animacion.src = "assets/images/fondo-2Back.png";
        animacion.style.animation = 'moverBack 2s ease-out';
        animacion.style.marginLeft = '-200px';

    }

    let velociraptor = document.getElementById('velociraptor');
    let posicionObj2 = velociraptor.getBoundingClientRect().top;
    //console.log(posicionObj2);

    if (posicionObj2 <= 250) {

        //console.log('Me active');
        velociraptor.style.animation = 'moverVelociraptor 1s ease-out';
        velociraptor.style.marginLeft = '-400px';

    }

})

/* Cambio de color del icono del Menu al pasar el mouse */

function changeColor() {
    let a = document.getElementById('Trazado_1160');
    let b = document.getElementById('Trazado_1161');
    let c = document.getElementById('Trazado_1162');

    a.style.fill = "white";
    b.style.fill = "white";
    c.style.fill = "white";
}

function normalColor() {
    let a = document.getElementById('Trazado_1160');
    let b = document.getElementById('Trazado_1161');
    let c = document.getElementById('Trazado_1162');

    a.style.fill = "white";
    b.style.fill = "white";
    c.style.fill = "white";
}

/* Muestra el menu al dar click en el icono */

function showMenu() {
    let iconoMenu = document.getElementById('iconoMenu');
    let menu = document.getElementById('menu');

    if (menu.style.display == "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

/* Muestra el Password */

function showPassword(x) {
    let input = document.getElementById('password-registro');
    let inputLogin = document.getElementById('passwordLogin');

    if (input.type == "text") {
        input.type = "password";
        inputLogin.type = "password";
        x.src = "assets/images/show.png";
        x.title = "Mostrar Contraseña";
    } else {
        input.type = "text";
        inputLogin.type = "text";
        x.src = "assets/images/hide.png";
        x.title = "Esconder Contraseña";
    }
}


/* Lleva a las secciones de Registro, Ingresa y Recuperar Contraseña */
function menuRegistro(x) {
    const registro = document.getElementById('fondoRegistro');
    const ingresa = document.getElementById('fondoIngresa');
    const recuperarPassword = document.getElementById('fondoRecuperar');


    switch (x) {
        case 1:
            registro.style.display = "none";
            ingresa.style.display = "block";
            ingresa.classList.add('animate__flipInY');
            recuperarPassword.style.display = "none";
            break;

        case 2:
            registro.style.display = "block";
            registro.classList.add('animate__flipInY');
            ingresa.style.display = "none";
            recuperarPassword.style.display = "none";
            break;
        case 3:
            registro.style.display = "none";
            ingresa.style.display = "none";
            recuperarPassword.style.display = "block";
            recuperarPassword.classList.add('animate__flipInY');
            break;
        default:
            console.log('Error en la función "menuRegistro" variable no identificada.')
    }
}
/* Input File de Mi Cuenta */
function cambiar() {
    var pdrs = document.getElementById('file-upload').files[0].name;
    document.getElementById('info').innerHTML = pdrs;
}

function showPremios(x) {
    if (x == 1) {
        document.getElementById('carouselSemanal').style.display = "none";
        document.getElementById('carouselFinal').style.display = "block";
        document.getElementById('premiosFinales').style.backgroundColor = "#FFBA00";
        document.getElementById('premiosFinales').style.color = "#000000";
        document.getElementById('premiosSemanales').style.backgroundColor = "#000000";
        document.getElementById('premiosSemanales').style.color = "#FFBA00";
    }
    if (x == 2) {
        document.getElementById('carouselSemanal').style.display = "block";
        document.getElementById('carouselFinal').style.display = "none";
        document.getElementById('premiosFinales').style.backgroundColor = "#000000";
        document.getElementById('premiosFinales').style.color = "#FFBA00";
        document.getElementById('premiosSemanales').style.backgroundColor = "#FFBA00";
        document.getElementById('premiosSemanales').style.color = "#000000";
    }
}