///ELEMENTOS DEL DOM/////
const linkCharacters = document.getElementById("link-characters")
const linkEpisodes = document.getElementById("link-episodes")
const linkLocations = document.getElementById("link-locations")

const contenedorTarjetas = document.querySelector(".contenedor-tarjetas")
const formulario = document.querySelector("#formulario")
const botonBuscar = document.getElementById("buscar")
const inputBuscador = document.querySelector("#input-buscador")
const tarjetaPersonaje = document.querySelector(".tarjeta-personaje")
const selectBusqueda = document.getElementById("select-busqueda")


const baseUrl = "https://rickandmortyapi.com/api/"

//links nav-bar///
linkCharacters.onclick = ()=>{
    todosLosPersonajes()
}

linkEpisodes.onclick = ()=>{
 todosLosEpisodios()
}
linkLocations.onclick = ()=>{
    todasLasUbicaciones()
}

//todos los personajes //
const todosLosPersonajes = ()=>{
    fetch(`${baseUrl}character`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        mostrarPersonajeEnHTML(data.results)
    })
}

todosLosPersonajes()

///todos los episodios///
const todosLosEpisodios = ()=>{
    fetch(`${baseUrl}episode`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data)
        mostrarEpisodioEnHTML(data.results)
    })
}

//todas las ubicaciones //
const todasLasUbicaciones = ()=>{
    fetch(`${baseUrl}/location`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data)
        mostrarUbicacionEnHTML(data.results)
    })
   
}
///FORMULARIO///
formulario.onsubmit = (event) => {
    event.preventDefault();

};

botonBuscar.onclick = ()=>{
   buscador ( selectBusqueda.value, inputBuscador.value)

}

///PERSONAJE EN HTML ///
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


////// EPISODIOS EN HTML////
const mostrarEpisodioEnHTML = (array) => {

    const html = array.reduce((acc,curr)=>{
        return acc = acc + 
        `<div class="card">
    <h3>Name: ${curr.name}</h3>
    <p>Episode: ${curr.episode}</p>
    <p> Más información</p>
    <link rel="stylesheet" href="">
    </div>`
      },"")

    tarjetaPersonaje.innerHTML = html  
  
} 

///UBICACIONE EN HTML///
const mostrarUbicacionEnHTML = (array) => {
    const html = array.reduce((acc,curr)=>{
        return acc = acc +  `<div class="card">
        <h3>Location: ${curr.name}</h3>
        <p>Type: ${curr.type}</p>
        <p> More info residents</p>
        <link rel="stylesheet" href="">
        </div>`  
    },"")
    tarjetaPersonaje.innerHTML = html
       
  
} 
///BUSCADOR ////

const buscador = (tipoDeBusqueda , parametroDeBusqueda)=>{
    console.log(tipoDeBusqueda, parametroDeBusqueda)
   if(tipoDeBusqueda === "character"){
    obtenerPersonaje(parametroDeBusqueda)
   } else if(tipoDeBusqueda === "episode"){
    buscarEpisodio(parametroDeBusqueda)
   }
}

/**** Fetch que filtra por personaje *****/
const obtenerPersonaje = (nombrePersonaje)=>{
    console.log(nombrePersonaje)
    fetch(`${baseUrl}character/?name=${nombrePersonaje}`)
    .then((res) => res.json())
    .then((data) => {
        console.log (data)
        mostrarPersonajeEnHTML(data.results) 
    })   
}
/**** Fetch que filtra por episodio *****/
const buscarEpisodio = (episodio)=>{
    fetch(`${baseUrl}episode?name=${episodio}`)
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data)
        mostrarEpisodioEnHTML(data.results)
    })
   
}