document.addEventListener('DOMContentLoaded', () => {
    //seleccionar elementos del formulario
    const formulario = document.querySelector('#registrationForm');
    const nombre = document.querySelector('#nombre');
    const enviar = document.querySelector('#enviar');
    const correo = document.querySelector('#correo');
    const telefono = document.querySelector('#telefono');
    const interes = document.querySelector('#interes');
    //agregar evento click al boton enviar
    enviar.addEventListener('click', validaEnvia);

    function validaEnvia(event){
        //prevenir el envio del formulario
        event.preventDefault();

        //reiniciar msj de error

        //validar el nombre
        if(nombre.value.length < 3){
            muestraError(nombre);
            return;
        }
        //Validar el correo con expresion regular
        const correoRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!correoRegex.test(correo.value)){
            muestraError(correo);
            return;
        }
        //validar telefono con expresion regular
        const telefonoRegex = /^([0-9]{10})+$/;
        if(!telefonoRegex.test(telefono.value)){
            muestraError(telefono);
            return;
        }
        //validar interes seleccionado
        if(interes.selectedIndex === 0){
            muestraError(interes);
            return;
        }
        //Mostrar msj de exito si pasa la validaciones
        muestraExito('!Formulario enviado correctamente!');
        //Envio del formulario
        setTimeout(() => formulario.submit(), 2000);
    }
    //otras funciones muestraError, muestraExito

    //funcion para mostrar msj de error y marcar el input
    function muestraError(input){
        alert(`El campo ${input.name} no cumple con los requisitos`);
    }

    //Funcion para mostrar mensaje de exito
    function muestraExito(mensaje){
        alert(mensaje);
    }
});

