document.addEventListener('DOMContentLoaded', () => {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function mostrarCarrito() {
        listaCarrito.innerHTML = '';
        let total = 0;

        carrito.forEach(producto => {
            const { id, nombre, precio, cantidad } = producto;
            const row = document.createElement('li');
            row.innerHTML = `
                ${nombre} - $${precio} x ${cantidad} = $${precio * cantidad}
                <button class="eliminar-producto" data-id="${id}">Eliminar</button>
            `;
            listaCarrito.appendChild(row);
            total += precio * cantidad;
        });

        totalCarrito.textContent = total.toFixed(2);
    }

    mostrarCarrito();

    vaciarCarritoBtn.addEventListener('click', () => {
        localStorage.removeItem('carrito');
        carrito = [];
        mostrarCarrito();
    });

    document.addEventListener('click', e => {
        if (e.target.classList.contains('eliminar-producto')) {
            const id = e.target.dataset.id;
            carrito = carrito.filter(item => item.id !== id);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        }
    });
});
