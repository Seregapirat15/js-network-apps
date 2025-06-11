export function createProductCard(product, onDelete) {
    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm';
    card.style.width = '18rem';

    card.innerHTML = `
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text flex-grow-1">${product.description || ''}</p>
            <p class="card-text"><strong>Цена: $${product.price}</strong></p>
            <div class="d-flex gap-2 mt-2">
                <button class="btn btn-sm btn-primary flex-grow-1 details-btn" data-product-id="${product.id}">
                    <i class="bi bi-info-circle me-1"></i> Детали
                </button>
                <button class="btn btn-sm btn-warning flex-grow-1 edit-btn">
                    <i class="bi bi-pencil me-1"></i> Изменить
                </button>
                <button class="btn btn-sm btn-danger flex-grow-1 delete-btn">
                    <i class="bi bi-trash me-1"></i> Удалить
                </button>
            </div>
        </div>
    `;

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => onDelete(product.id));

    const detailsBtn = card.querySelector('.details-btn');
    detailsBtn.addEventListener('click', () => {
        window.location.hash = `#product/${product.id}`;
    });
    
    const editBtn = card.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        window.location.hash = `#edit/${product.id}`;
    });

    return card;
}
