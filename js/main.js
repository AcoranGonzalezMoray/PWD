

function loadProducts(Catalogo) {
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      const productos = data[Catalogo]['Productos'];
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
            template.querySelector('.card-img-top').setAttribute('src', producto['IMAGEN']);

            contenedorProductos.appendChild(template);
          })
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}
function agregarProductos (productos) {
  const contenedorProductos = document.getElementById('contenedor-productos');
  productos.forEach(producto => {
    fetch("/PWM-TEMPLATES/component/product.html")
      .then(response => response.text())
      .then(data => {
        var template = new DOMParser().parseFromString(data, "text/html").querySelector('.product')
        template = template.cloneNode(true);
        template.querySelector('.card-text').textContent = producto['NombreCorto'];
        template.querySelector('.card-title').textContent = producto['PVP'];
        template.querySelector('.card-img-top').setAttribute('src', producto['IMAGEN']);

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
function ordenar(i,e) {
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      var productos = data['Catalogo Tienda']['Productos'];
      if(e == 1) productos = data['Catalogo Taller']['Productos'];
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
      agregarProductos(productos);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}
function filtrar() {
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      //filtrar
      const FILTRADO = productos.filter(d => d.posCode === 25000008);
      const ORDENADO = productos.filter(d => d.posCode = 25000008);

    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
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
              templateSubcategoria.href= "javascript:prueba("+p.Subcategoria.replace("\ \g","")+");";
              categoryContent.appendChild(templateSubcategoria);
            })
            template.appendChild(categoryContent);
            contenedorCategoria.appendChild(template);

          })
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

}

function prueba(i) {

  alert(i);
}
//no usado por ahora
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

$( document ).ajaxStop(function() {
  setTimeout(() => {
    $('#loading').hide()
  }, 700);
  ;
});

