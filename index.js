///ELEMENTOS DEL DOM/////
const contenedorTarjetas = document.querySelector(".contenedor-tarjetas")
const formulario = document.querySelector("#formulario")
const botonBuscar = document.getElementById("buscar")
const inputBuscador = document.querySelector("#input-buscador")
const tarjetaPersonaje = document.querySelector(".tarjeta-personaje")
const selectBusqueda = document.getElementById("select-busqueda")


const baseUrl = "https://rickandmortyapi.com/api/"

///FORMULARIO///
formulario.onsubmit = (event) => {
    event.preventDefault();

};

botonBuscar.onclick = ()=>{
   buscador ( selectBusqueda.value, inputBuscador.value)

}
/** todos los personajes */
const todosLosPersonajes = ()=>{
    fetch(`${baseUrl}character`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        mostrarPersonajeEnHTML(data.results)
    })
}

todosLosPersonajes()

const mostrarPersonajeEnHTML = (array) => {
    const html = array.reduce((acc,curr)=>{
      return acc = acc + 
      `<div class="card" data-id=${curr.id}>
       <h3>Name: ${curr.name}</h3>
       <img src="${curr.image}"></img>
       <p>Gender: ${curr.gender}</p>
       <p>Specie: ${curr.species}</p>
     </div>`
    },"")
    tarjetaPersonaje.innerHTML = html

   // detalleDePersonaje()
}  


