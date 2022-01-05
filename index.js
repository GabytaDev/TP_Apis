///ELEMENTOS DEL DOM/////
const linkCharacters = document.getElementById("link-characters")
const linkEpisodes = document.getElementById("link-episodes")
const linkLocations = document.getElementById("link-locations")

const tarjetaPersonaje = document.querySelector(".tarjeta-personaje")
const tarjetaEpisodios = document.querySelector(".tarjeta-episodios")
const tarjetaUbicaciones = document.querySelector(".tarjeta-ubicaciones")

const contenedorTarjetasPersonaje = document.querySelector(".contenedor-tarjetas-personaje")
const formulario = document.querySelector("#formulario")
const botonBuscar = document.getElementById("buscar")
const inputBuscador = document.querySelector("#input-buscador")
const selectBusqueda = document.getElementById("select-busqueda")
const selectStatus = document.getElementById("select-status")
const selectGender = document.getElementById("select-gender")

const selectOrden = document.getElementById("select-orden")

const baseUrl = "https://rickandmortyapi.com/api/"

//vista tarjetas///
const arrayTarjetas = [
    tarjetaPersonaje,
    tarjetaEpisodios,
    tarjetaUbicaciones 
]

const mostrarTarjetas = (array, tarjeta)=>{
    for (let i = 0; i < array.length; i++) {
        if(array[i] != tarjeta){
            array[i].classList.add("ocultar")
        }else if(array[i]=== tarjeta){
            array[i].classList.remove("ocultar")
        }  
    }
}

//links nav-bar///
linkCharacters.onclick = (e)=>{
    e.preventDefault()
    mostrarTarjetas(arrayTarjetas,tarjetaPersonaje)
    todosLosPersonajes()
    
}

linkEpisodes.onclick = (e)=>{
    e.preventDefault()
    mostrarTarjetas(arrayTarjetas,tarjetaEpisodios)   
    todosLosEpisodios()
}
linkLocations.onclick = (e)=>{
    e.preventDefault()
    mostrarTarjetas(arrayTarjetas,tarjetaUbicaciones)
    todasLasUbicaciones()
}


//todos los personajes //
const todosLosPersonajes = ()=>{
    fetch(`${baseUrl}character`)
    .then(res => res.json())
    .then(data =>{
        mostrarPersonajeEnHTML(data.results)
        console.log(data.results)
        ordenarAZ (data.results, selectOrden.value)
      
    })
}

todosLosPersonajes()

///todos los episodios///
const todosLosEpisodios = ()=>{
    fetch(`${baseUrl}episode`)
    .then((res)=> res.json())
    .then((data)=>{
        mostrarEpisodioEnHTML(data.results)
    })
}

//todas las ubicaciones //
const todasLasUbicaciones = ()=>{
    fetch(`${baseUrl}/location`)
    .then((res)=> res.json())
    .then((data)=>{
        mostrarUbicacionEnHTML(data.results)
    })
   
}
///FORMULARIO///
formulario.onsubmit = (event) => {
    event.preventDefault();

};

botonBuscar.onclick = ()=>{
   buscador ( selectBusqueda.value, inputBuscador.value, selectStatus.value, selectGender.value)
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
   detalleDePersonaje()
   
}  


////// EPISODIOS EN HTML////
const mostrarEpisodioEnHTML = (array) => {
    const html = array.reduce((acc,curr)=>{
        return acc = acc + 
        `<div class="card" data-id=${curr.id}>
    <h3>Name: ${curr.name}</h3>
    <p>Episode: ${curr.episode}</p>
    <link rel="stylesheet" href="">
    </div>`
      },"")

    tarjetaEpisodios.innerHTML = html  
  detalleDeEpisodio()
} 

///UBICACIONE EN HTML///
const mostrarUbicacionEnHTML = (array) => {
    const html = array.reduce((acc,curr)=>{
        return acc = acc +  `<div class="card" data-id=${curr.id}>
        <h3>Location: ${curr.name}</h3>
        <p>Type: ${curr.type}</p>
        <link rel="stylesheet" href="">
        </div>`  
    },"")
    tarjetaUbicaciones.innerHTML = html   
    detalleUbicaciones()  
} 
///BUSCADOR ////

const buscador = (tipoDeBusqueda , parametroDeBusqueda)=>{
    console.log(tipoDeBusqueda, parametroDeBusqueda)
   if(tipoDeBusqueda === "character"){
    obtenerPersonaje(parametroDeBusqueda)
    tarjetaPersonaje.classList.remove("ocultar")
    tarjetaEpisodios.classList.add("ocultar")
    tarjetaUbicaciones .classList.add("ocultar")
   } else if(tipoDeBusqueda === "episode"){
    buscarEpisodio(parametroDeBusqueda)
    tarjetaEpisodios.classList.remove("ocultar")
    tarjetaPersonaje.classList.add("ocultar")
    tarjetaUbicaciones .classList.add("ocultar")
   }
}

/**** Fetch que filtra por personaje *****/
const obtenerPersonaje = (nombrePersonaje)=>{
    console.log(nombrePersonaje)
    fetch(`${baseUrl}character/?name=${nombrePersonaje}&status=${selectStatus.value}&gender=${selectGender.value}`)
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

//// click a tarjeta personaje////
const detalleDePersonaje = ()=>{
    const cards = document.querySelectorAll(".card")
    for (let i = 0; i < cards.length; i++) {
        cards[i].onclick = ()=>{
            const idDelpersonaje = cards[i].dataset.id
            console.log("id personaje",idDelpersonaje)
            buscarPersonajePorID(idDelpersonaje)
        }
        
    }
}

const buscarPersonajePorID = (id) =>{
    console.log(id)
    fetch(`${baseUrl}character/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log("data id",data)
        mostrarDetallePersonajeHTML(data) 
    })  
}

//muestra detalle de 1 solo personaje
const mostrarDetallePersonajeHTML = (data)=>{
    tarjetaPersonaje.innerHTML = 
    `<div class="card">
    <h3>Name: ${data.name}</h3>
    <img src="${data.image}"></img>
    <p>Gender: ${data.gender}</p>
    <p>Specie: ${data.species}</p>
    <p>Status: ${data.status}</p>
  </div>`
}

///click tarjeta episodio///
const detalleDeEpisodio = ()=>{
    const cardEpisodio = document.querySelectorAll(".card")
    for (let i = 0; i < cardEpisodio.length; i++) {
        cardEpisodio[i].onclick = ()=>{
            const idDelEpisodio = cardEpisodio[i].dataset.id
            console.log("id episodio",idDelEpisodio)
            buscarEpisodioPorID(idDelEpisodio)
        }    
    }
}

const buscarEpisodioPorID = (id) =>{
    console.log(id)
    fetch(`${baseUrl}episode/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log("data id",data)
        mostrarDetalleEpisodioHTML(data) 
    })  
}
//muestra detalle de 1 solo episodio
const mostrarDetalleEpisodioHTML = (data)=>{
    tarjetaEpisodios.innerHTML = 
    `<div class="card">
    <h3>Name Episode: ${data.name}</h3>
    <p>Air Date: ${data.air_date}</p>
    <p>Episode: ${data.episode}</p>
    <p>Created: ${data.created}</p>
  </div>`
}

///click tarjeta ubicaciones///
const detalleUbicaciones = ()=>{
    const cardUbicacion = document.querySelectorAll(".card")
    for (let i = 0; i < cardUbicacion.length; i++) {
        cardUbicacion[i].onclick = ()=>{
            const idUbicacion = cardUbicacion[i].dataset.id
            console.log("id ubicacion",idUbicacion)
            buscarUbicacionPorId(idUbicacion)
        }  
        
    }
}

const buscarUbicacionPorId = (id)=>{
    fetch(`${baseUrl}location/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log("data id ubicacion",data)
        mostrarDetalleUbicacionHTML(data) 
    })  
}
//muestra detalle de 1 sola ubicacion
const mostrarDetalleUbicacionHTML = (data)=>{
    tarjetaUbicaciones.innerHTML = 
    `<div class="card">
    <h3>Name Episode: ${data.name}</h3>
    <p>Type: ${data.type}</p>
    <p>Dimension: ${data.dimension}</p>
    <p>Created: ${data.created}</p>
  </div>` 
}
//ordenar A/Z


selectOrden.onchange = ()=>{
    todosLosPersonajes()
}

const ordenarAZ = (data,value) =>{
    if(value === "a/z"){
        const ordenadoAZ = data.sort((a,b)=>{
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1
            }
            return 0
        })
        mostrarOrdenado(ordenadoAZ)
    }
    if(value === "z/a"){
        const ordenadoZA = data.sort((a,b)=>{
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return -1
            }
            if(a.name.toLowerCase() < b.name.toLowerCase()){
                return 1
            }
            return 0
        })
       mostrarOrdenado(ordenadoZA)
    }
}

const mostrarOrdenado = (array)=>{
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
}