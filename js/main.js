
//Variables Globales !IMPORTANTE
var productos =[];
var baseProductos = [];

//Funciones Tienda !IMPORTANTE
function loadProducts(Catalogo) {
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      limpiarTienda()
      productos = data[Catalogo]['Productos'];
      baseProductos = data[Catalogo]['Productos'];
      const contenedorProductos = document.getElementById('contenedor-productos');

      // Recorrer el arreglo de productos
      productos.forEach(producto => {
        fetch("/PWM-TEMPLATES/component/product.html")
          .then(response => response.text())
          .then(data => {
            var template = new DOMParser().parseFromString(data, "text/html").querySelector('.product')
            template = template.cloneNode(true);
            template.querySelector('.card-text').textContent = producto['NombreCorto'];
            template.querySelector('.card-title').textContent = producto['PVP'];
            template.querySelector('.img-product').style.backgroundImage = "url('" + producto['IMAGEN'] + "')";

            contenedorProductos.appendChild(template);
          })
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}
function agregarProductos () {
  const contenedorProductos = document.getElementById('contenedor-productos');
  productos.forEach(producto => {
    fetch("/PWM-TEMPLATES/component/product.html")
      .then(response => response.text())
      .then(data => {
        var template = new DOMParser().parseFromString(data, "text/html").querySelector('.product')
        template = template.cloneNode(true);
        template.querySelector('.card-text').textContent = producto['NombreCorto'];
        template.querySelector('.card-title').textContent = producto['PVP'];
        template.querySelector('.img-product').style.backgroundImage = "url('" + producto['IMAGEN'] + "')";

        contenedorProductos.appendChild(template);
      })
  });
}
function limpiarTienda() {
  var show = document.getElementById('contenedor-productos');
  while(show.hasChildNodes()){
    show.removeChild(show.firstChild);
  }
}
function ordenar(i) {
  //ordenar por precio + a -
  if(i == 4){
    productos = productos.sort((a, b) => {if (a.PVP.split("€")[0] > b.PVP.split("€")[0]) {return -1;}});
  }
  //ordenar por precio - a +
  if(i == 3){
    productos = productos.sort((a, b) => {if (a.PVP.split("€")[0] < b.PVP.split("€")[0]) {return -1;}});
  }
  //ordenar por precio A-Z
  if(i == 2){
    productos = productos.sort((a, b) => {if (a.NombreCorto.replace(/ /g, "")> b.NombreCorto.replace(/ /g, "")) {return -1;}});
  }
  //ordenar por precio A-Z
  if(i == 1){
    productos = productos.sort((a, b) => {if (a.NombreCorto.replace(/ /g, "")< b.NombreCorto.replace(/ /g, "")) {return -1;}});
  }
  limpiarTienda();
  agregarProductos();
}
function filtrar(i, modo) {
  if(modo){
    productos = baseProductos.filter(x => {return removeAccents(x.CATEGORIA).toLowerCase().toString() === removeAccents(i).toLowerCase().toString();})
  }else{
    productos = baseProductos.filter(x => {return removeAccents(x.FAMILIA).toLowerCase().toString() === removeAccents(i).toLowerCase().toString();})
  }
  limpiarTienda();
  agregarProductos();
}
function buscar() {
  let query = document.getElementById("query").value;
  productos = baseProductos.filter(x => {
    return removeAccents(x.NombreCorto).toLowerCase().toString().includes(removeAccents(query).toLowerCase().toString());
  })

  limpiarTienda();
  agregarProductos();
}
function loadCategory(Catalogo){
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      var categorias = data[Catalogo]['Categorias'];
      categorias.sort((a,b)=>{if(a.Categoria < b.Categoria ){return -1;}})
      const contenedorCategoria = document.getElementById('aside');

      categorias.forEach(producto => {

        fetch("/PWM-TEMPLATES/component/aside.html")
          .then(response => response.text())
          .then(data => {
            //Categoria
            var template = new DOMParser().parseFromString(data, "text/html").querySelector('.category')
            template = template.cloneNode(true)
            template.querySelector('.nameC').textContent = producto['Categoria'];
            template.querySelector('.nameC').href = "#";
            template.querySelector('.nameC').addEventListener("click", function(){filtrar(producto['Categoria'], false);});


            //Subcategoria
            const productosS = producto['Subcategorias'];
            const categoryContent = document.createElement('div');
            categoryContent.className += "category-content";
            var click = "prueba(id);"
            productosS.forEach(p => {
              templateSubcategoria = document.createElement('a');
              templateSubcategoria.textContent = p.Subcategoria;
              templateSubcategoria.id= p.Subcategoria;
              templateSubcategoria.style="color:white;"
              templateSubcategoria.href="#";
              templateSubcategoria.addEventListener("click", function(){filtrar(p.Subcategoria, true);});
              categoryContent.appendChild(templateSubcategoria);
            })
            template.appendChild(categoryContent);
            contenedorCategoria.appendChild(template);

          })
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

}

//Utilidades Carga Dinamica de Componentes, Herramientas Tratamiento String
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function loadComponenHome() {
  $(function (){$('#footer').load("/PWM-TEMPLATES/component/footer.html")});
  $(function (){$('#header').load("/PWM-TEMPLATES/component/header.html")});
  $(function (){$('#carousel').load("/PWM-TEMPLATES/component/carousel.html")});
  $(function (){$('#social').load("/PWM-TEMPLATES/component/social.html")});
}
function loadComponenOther() {
  $(function (){$('#footer').load("/PWM-TEMPLATES/component/footer.html")});
  $(function (){$('#header').load("/PWM-TEMPLATES/component/header.html")});
  $(function (){$('#social').load("/PWM-TEMPLATES/component/social.html")});
}
function loadComponenEsc() {
  $(function (){$('#footer').load("/PWM-TEMPLATES/component/footer.html")});
  $(function (){$('#header').load("/PWM-TEMPLATES/component/header.html")});
}
function showCategoryMov(i){
  if(i==1) document.getElementById("aside").style="display:block;"
  else  document.getElementById("aside").style="display:none;"
}

//Funciones Reservas Servicios
function loadServices() {
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      var serviciosTaller = data['ServiciosTaller'];
      serviciosTaller.sort((a, b) => {
        if (a.Descripcion < b.Descripcion) {
          return -1;
        }
      })
      const contenedorServicios = document.getElementById('serviciosTaller');

      serviciosTaller.forEach(producto => {

        fetch("/PWM-TEMPLATES/component/aside.html")
          .then(response => response.text())
          .then(data => {
            //Categoria
            var template = new DOMParser().parseFromString(data, "text/html").querySelector('.category')
            template = template.cloneNode(true)
            template.querySelector('.nameC').textContent = producto['Descripcion'];
            contenedorServicios.appendChild(template);
          })
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}
function loadReserveHours() {

  var fecha = new Date('2023-03-13');
  var opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };

  var daysOfWeek = document.querySelectorAll('.dayOfWeek')
  var arrayDaysOfWeek = Array.from(daysOfWeek);
  x=0;
// Ahora podemos trabajar con el array de elementos
  arrayDaysOfWeek.forEach(function(day) {

    day.querySelector('.date').textContent = fecha.toLocaleDateString('es-ES', opciones);

    var hora = new Date();
    hora.setHours(8);
    hora.setMinutes(0);

    for (var i = 0; i < 20; i++) {
      fetch("/PWM-TEMPLATES/component/reserveBoxItem.html")
        .then(response => response.text())
        .then(data => {
          var template = new DOMParser().parseFromString(data, "text/html").querySelector('.reserve-box-item')
          template = template.cloneNode(true);
          template.querySelector('.hour').textContent = hora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          day.appendChild(template);
          hora.setMinutes(hora.getMinutes() + 30);
        })
    }
    x++;
    if(x%5==0)fecha.setDate(fecha.getDate() + 3);
    else fecha.setDate(fecha.getDate() + 1);
  });
  comprobarReservasOcupadas();
}
function comprobarReservasOcupadas(){
  setTimeout(function() {
    fetch('/PWM-TEMPLATES/json/archivo2.json')
      .then(response => response.json())
      .then(data => {
        const reservas = data['Reservas Taller'];
        reservas.forEach(reserva => {

          var daysOfWeek = document.querySelectorAll('.dayOfWeek')
          var arrayDaysOfWeek = Array.from(daysOfWeek);

          arrayDaysOfWeek.forEach(function(day) {
            var reserveItems = day.querySelectorAll('.reserve-box-item')
            var arrayReserveItems = Array.from(reserveItems);

            arrayReserveItems.forEach(function (reserveItem) {
              console.log(reserveItem.querySelector('.hour').textContent)
              console.log(day.querySelector('.date').textContent)
              if (reserveItem.querySelector('.hour').textContent === reserva.Hora &&
                day.querySelector('.date').textContent === reserva.Fecha) {
                reserveItem.style.backgroundColor = 'red';
              }
            })
          })
        });
      });
  }, 2000);
}


//No Usado
function validarFormulario() {
  // Obtener los valores de los campos del formulario
  var nombreCompleto = document.getElementById("nombreCompleto").value;
  var correoElectronico = document.getElementById("correoElectronico").value;
  var contrasena = document.getElementById("contrasena").value;
  var repetirContrasena = document.getElementById("repetirContrasena").value;


  // Validar que se haya ingresado la misma contraseña en ambos campos
  if (contrasena !== repetirContrasena) {
    alert("Las contraseñas no coinciden.");
    return false;
  }

  // Si todos los campos son válidos, crear un objeto con los datos del usuario
  var usuario = {
    "Username": nombreCompleto,
    "Email": correoElectronico,
    "Password": contrasena
  };

// Convertir el objeto a formato JSON
  var usuarioJSON = JSON.stringify(usuario);

  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      data['Usuarios'].push(usuarioJSON);

      // Enviar la solicitud de actualización al servidor
      fetch('/PWM-TEMPLATES/json/archivo2.json', {
        method: 'PUT', // Usar el método HTTP PUT para actualizar el archivo
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Enviar el objeto JSON actualizado al servidor
      })
        .then(response => {
          if (response.ok) {
            console.log('Archivo JSON actualizado correctamente');
          } else {
            throw new Error('Error al actualizar el archivo JSON');
          }
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

  // Mostrar un mensaje de éxito
  alert("¡Registro exitoso!");

  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = "/PWM-TEMPLATES/pages/signIn.html";

  // Evitar que se envíe el formulario
  return false;
}


//Pantalla de Carga
$( document ).ajaxStop(function() {
  setTimeout(() => {
    $('#loading').hide()
  }, 700);
  ;
});


