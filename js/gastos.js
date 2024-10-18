let gastos = [];
class Gastos {
    constructor(id, fecha, monto, categoria, descripcion) {
        this.id = id,
            this.fecha = fecha;
        this.monto = monto;
        this.categoria = categoria;
        this.descripcion = descripcion;
    }
}

//Vaidacion de los datos de los gatos ingresado por el usuario
function formatoMonto(monto) {
    const validador = /^\d+(\.\d+)?$/
    return validador.test(monto)
}

function formatoRut(rut) {
    const validador = /^[0-9]{8,9}-[0-9kK]{1}$/
    return validador.test(rut);
}

const rutBuscar = document.getElementById('rut').value;


function buscarUsuario(rutBuscar) {

    //const rutBuscar = document.getElementById('rut').value;


    if (!formatoRut(rutBuscar)) {
        const mensaje_ErrorDiv = document.querySelector('.mensaje_Error');
        mensaje_ErrorDiv.innerHTML = '';

        const parrafo = document.createElement('p')
        parrafo.textContent = 'Rut invalido'
        mensaje_ErrorDiv.appendChild(parrafo)
        return null;

    }


    const datos = JSON.parse(localStorage.getItem(rutBuscar));


    if (datos == null) {
        alert('Usuario/a no se encuentra registrado')
        window.location.href = '../index.html'

    }


    return datos;

}


let boton_Buscar = document.querySelector('#boton_BuscarPersona')

boton_Buscar.addEventListener('click', (event) => {

    event.preventDefault()
    const datos = buscarUsuario(rutBuscar);
    console.log(datos)
    const bUsuario = document.querySelector('.registroGastos');

    bUsuario.style.display = 'block';

    //Habilitar div mostrando los gastos ingresados
    const divMostrargastos = document.querySelector('.mostrarGastos');
    divMostrargastos.style.display = 'block';

    buscarGastos();
    mostrarGastos();


})




//Funcion para agregar gastos

function agregarGastos() {
    const formulario = Array.from(document.querySelectorAll('.registroGastos input, .registroGastos select, .registroGastos textarea')); //Acceder al formulario y obtener sus elementos
    const datos = formulario.map(element => element.value) // Creacion de array con los datos del formulario

    if (!formatoMonto(datos[3])) {
        const mensaje_ErrorDiv = document.querySelector('.mensaje_Error');
        mensaje_ErrorDiv.innerHTML = '';

        const parrafo = document.createElement('p')
        parrafo.textContent = 'Monto invalido'
        mensaje_ErrorDiv.appendChild(parrafo)
        return null;
    }

    const nuevoGasto = {
        fecha: datos[0],
        catergoria: datos[1],
        descripcion: datos[2],
        monto: datos[3]
    };

    return nuevoGasto;
}


//Funcion para buscar los gastos anteriores


function buscarGastos() {
    let salida = true
    let contador = 1;
    while (salida) {
        let clave = contador + '_' + rutBuscar;
        let datos = JSON.parse(localStorage.getItem(clave))

        if (datos != null) {
            gastos.push(new Gastos(contador, datos[0], datos[1], datos[2], datos[3]))
        } else { salida = false }
        contador++;
    }
    
    

}

//Funcion para mostrar los gastos del usuario
function mostrarGastos() {

    let divMostrarGastos = document.querySelector('.divMostrarGastos');
    divMostrarGastos.innerHTML = '';

    gastos.forEach(objeto =>{
        //creear un elemento html para cada objeto

        let p = document.createElement('p');
        p.textContent = `ID: ${objeto.id}Fecha: ${objeto.fecha} - Categoria: ${objeto.categoria} - 
        Descripcion: ${objeto.descripcion} - Monto: ${objeto.monto}`
        // Agrega el elemento al div
        divMostrarGastos.appendChild(p);

    });


}

//habilitacion de envento para agregar los gastos en localstorage


let boton_AgregarGastos = document.querySelector('#agregarGastos');

boton_AgregarGastos.addEventListener('click', (event) => {
    event.preventDefault();
    const nuevoGasto = agregarGastos();
    let contador = 1;
    let salida = true
    while (salida) {
        let clave = contador + '_' + rutBuscar;
        let datos = JSON.parse(localStorage.getItem(clave))

        if (datos == null) {
            localStorage.setItem(clave, JSON.stringify(datos))
            salida = false;
        }
        contador++;
    }


    buscarGastos();
    mostrarGastos();
})






