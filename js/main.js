

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
        productos = productos.sort((a, b) => {if (a.PVP > b.PVP) {return -1;}});
      }
      //ordenar por precio - a +
      if(i == 3){
        productos = productos.sort((a, b) => {if (a.PVP < b.PVP) {return -1;}});
      }
      //ordenar por precio A-Z
      if(i == 2){
        productos = productos.sort((a, b) => {if (a.NombreCorto> b.NombreCorto) {return -1;}});
      }
      //ordenar por precio A-Z
      if(i == 1){
        productos = productos.sort((a, b) => {if (a.NombreCorto< b.NombreCorto) {return -1;}});
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
}
function loadComponenOther() {
  $(function (){$('#footer').load("/PWM-TEMPLATES/component/footer.html")});
  $(function (){$('#header').load("/PWM-TEMPLATES/component/header.html")});
}

function loadCategory(Catalogo){
  fetch('/PWM-TEMPLATES/json/archivo2.json')
    .then(response => response.json())
    .then(data => {
      const productos = data[Catalogo]['Categorias'];
      const contenedorCategoria = document.getElementById('aside');
      var i = 0 ;
      productos.forEach(producto => {
        fetch("/PWM-TEMPLATES/component/aside.html")
          .then(response => response.text())
          .then(data => {
            //Categoria
            var template = new DOMParser().parseFromString(data, "text/html").querySelector('.category')
            template = template.cloneNode(true)
            template.querySelector('.nameC').textContent = producto['Categoria'];
            contenedorCategoria.appendChild(template);

            //Subcategoria
            //const productosS = producto['Subcategorias'];
            //const contenedorCategoria = document.getElementById('category-content');
            //const categoryContent = document.createElement('div');
            //categoryContent.className += "category-content";
            //categoryContent.id = i;
            //contenedorCategoria.appendChild(categoryContent);
            //productosS.forEach(p => {




            //})
            i++;

          })
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

}
