

const socket = io();
const FormBtn = document.getElementById('btn-form');
const form = document.getElementById('addNewProd');
const newProd = e => {
	e.preventDefault();
	const data = new FormData(form);
	const prod = {
		title: data.get('title'),
		description: data.get('description'),
		category: data.get('category'),
		price: data.get('price'),
		code: data.get('code'),
		stock: data.get('stock'),
        thumbnail: data.get('thumbnail')
	};
	socket.emit('addProd', prod);
	form.reset();
};

const delProd = async e => socket.emit('delProd', e.target.id);

socket.on('products', products => {
	const productContainer = document.getElementById('productContainer');
	productContainer.innerHTML = '';
	for (const prod of products) {
		productContainer.innerHTML += `
			<div>
            	<h2>${prod.title}</h2>
            	<p><b>Descripción:</b> ${prod.description}</p>
            	<p><b>Categoría:</b> ${prod.category}</p>
            	<p><b>Precio: $</b>${prod.price}</p>
            	<p><b>Código:</b> ${prod.code}</p>
            	<p><b>Stock:</b> ${prod.stock}</p>
            	<p><b>Thumbnail:</b> ${prod.thumbnail}</p>
            	<button id=${prod.id} class='ButtonDelete'>Eliminar</button>
        	</div>
		`;
	}
});

document.addEventListener('click', e => e.target.matches('ButtonDelete') && delProd(e));
FormBtn.addEventListener('click', newProd);