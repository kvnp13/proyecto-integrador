document.addEventListener('DOMContentLoaded', () => {

    // Div donde agregaremos los productos
    const productosContainer = document.getElementById('productos');
    // fetch para una solicitud HTTP para obtener datos desde un servidor
    // Cargar los datos de productos desde el archivo JSON
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            // Para cada producto en el JSON, crear un elemento HTML y mostrarlo en la página
            productos.forEach(producto => {
                // Crea un div, y le agrega su clase
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');

                // Agregar el título del producto
                const titulo = document.createElement('h3');
                titulo.textContent = producto.nombre;
                //Agrega el titulo al div padre del producto
                productoDiv.appendChild(titulo);

                // Agregar la imagen del producto
                const imagen = document.createElement('img');
                imagen.setAttribute('src', producto.imagen);
                imagen.setAttribute('alt', producto.nombre);
                imagen.style.width = '300px'; // Ajusta el ancho de la imagen 
                imagen.style.height = '300px'; // Ajusta el alto de la imagen 
                imagen.style.objectFit = 'cover'; // Ajusta el tamaño de la imagen para cubrir el contenedor
                             
                productoDiv.appendChild(imagen);
                
                // Agregar el precio del producto
                const precioParrafo = document.createElement('p');
                // Agrega el precio del objeto json
                precioParrafo.textContent = `Precio: $${producto.precio}`;
                productoDiv.appendChild(precioParrafo);

                // Agregar la etiqueta de cantidad
                const cantidadLabel = document.createElement('label');
                cantidadLabel.setAttribute('for', `cantidad-${producto.id}`);
                cantidadLabel.textContent = 'Cantidad:';
                productoDiv.appendChild(cantidadLabel);

                // Agregar el input de cantidad
                const cantidadInput = document.createElement('input');
                cantidadInput.setAttribute('type', 'number');
                cantidadInput.setAttribute('id', `cantidad-${producto.id}`);
                cantidadInput.setAttribute('value', '1');
                cantidadInput.setAttribute('min', '1');
                productoDiv.appendChild(cantidadInput);

                // Agregar el botón de agregar al carrito
                const botonAgregar = document.createElement('button');
                botonAgregar.classList.add('agregar-carrito');
                botonAgregar.setAttribute('data-id', producto.id);
                botonAgregar.setAttribute('data-nombre', producto.nombre);
                botonAgregar.setAttribute('data-precio', producto.precio);
                botonAgregar.textContent = 'Agregar al Carrito';
                botonAgregar.addEventListener('click', agregarAlCarrito);
                productoDiv.appendChild(botonAgregar);



                // Agregar el producto al contenedor de productos en la página
                productosContainer.appendChild(productoDiv);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
    // fin productos

   // Obtener el contador del carrito y el icono
   const contadorCarrito = document.getElementById('contador-carrito');

    // el operador lógico || se utilizará para proporcionar un valor de respaldo, que en este caso es un array vacío []. Esto asegura que carrito sea un array válido incluso si no hay ningún valor almacenado en el almacenamiento local bajo la clave 'carrito'
   let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

   function actualizarContadorCarrito() {
       // Obtener el carrito del almacenamiento local
       const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
       // Calcular la cantidad total de productos en el carrito
       const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
       // Actualizar el contenido del contador
       contadorCarrito.textContent = cantidadTotal;

   }

   // Actualizar el contador al cargar la página
   actualizarContadorCarrito();

    // Función para agregar productos al carrito
    function agregarAlCarrito(evento) {
        const boton = evento.target;
        const id = boton.dataset.id;
        const nombre = boton.dataset.nombre;
        const precio = parseFloat(boton.dataset.precio);
        const cantidadInput = document.querySelector(`#cantidad-${id}`);
        const cantidad = parseInt(cantidadInput.value);
    
        const producto = {
            id,
            nombre,
            precio,
            cantidad
        };
    
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
        // Verificar si el producto ya está en el carrito
        const indiceProductoExistente = carrito.findIndex(item => item.id === producto.id);
    
        if (indiceProductoExistente !== -1) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            carrito[indiceProductoExistente].cantidad += cantidad;
        } else {
            // Si el producto no está en el carrito, agregarlo
            carrito.push(producto);
        }
    
        localStorage.setItem('carrito', JSON.stringify(carrito));    
        // Recargar la página o actualizar el contenido del carrito cuando agregamos un producto      
        actualizarContadorCarrito();
    }
       
});
