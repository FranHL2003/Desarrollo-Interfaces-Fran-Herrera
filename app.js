//cargar mapa
let map = L.map('mapaMalaga').setView([36.7201600, -4.4203400], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
{maxZoom: 19,attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

//json y localizaciones 
let template = document.querySelector("template");
let interior = document.querySelector("#contenido");
let id = 0;

fetch("https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json?classId=a44f2eea-e51b-4a7a-a11a-eefc73428d1a&assignmentId=b6d46e1e-b651-43e1-b861-1d6ba465dd82&submissionId=c773ff20-ba3d-cf9e-1095-93f6fedc73c5") 
 .then(response => response.json())
  .then(data => {
   data.forEach( function(element){
    let container = document.createElement("div");
    container.classList.add('localizacion')

    let position = template.content.cloneNode(true);
    position.querySelector("h4").innerText = element.properties.nombre;
    position.querySelector("p").innerText = element.properties.horario;
    position.querySelector("#direccion").innerText = element.properties.direccion;
    position.querySelector("#telefono").innerText = element.properties.telefono;
   
    let x = element.properties.x;
    let y = element.properties.y;
  
    let marker = L.marker([x, y]).addTo(map);
    let label = '<b>' + element.properties.nombre + '</b><br/>' + element.properties.direccion;
    
    marker.bindPopup(label);
    container.appendChild(position);
    interior.appendChild(container);
    id++
    });



   })

   //ventana modal
