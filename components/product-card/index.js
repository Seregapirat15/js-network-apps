export function createProductCard(product, onDelete) {
    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.style.width = '18rem';

    card.innerHTML = `
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>Price: $${product.price}</strong></p>
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary details-btn" data-product-id="${product.id}">Details</button>
                <button class="btn btn-danger delete-btn">Delete</button>
            </div>
        </div>
    `;

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => onDelete(product.id));

    const detailsBtn = card.querySelector('.details-btn');
    detailsBtn.addEventListener('click', () => {
        window.location.hash = `#product/${product.id}`;
    });

    return card;
}
