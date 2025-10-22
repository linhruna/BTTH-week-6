// Đợi DOM load xong trước khi thực thi JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Lấy các phần tử DOM cần thiết
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductSection = document.getElementById('add-product-section');
    const addProductForm = document.getElementById('addProductForm');
    const cancelAddBtn = document.getElementById('cancelAddBtn');
    const productList = document.getElementById('product-list');
    
    // Mảng lưu trữ tất cả sản phẩm (để tìm kiếm)
    let allProducts = [];
    
    // Khởi tạo: Lưu trữ tất cả sản phẩm hiện có
    function initializeProducts() {
        const productItems = document.querySelectorAll('.product-item');
        allProducts = Array.from(productItems);
    }
    
    // Hàm tìm kiếm sản phẩm
    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Nếu ô tìm kiếm trống, hiển thị tất cả sản phẩm
            allProducts.forEach(product => {
                product.style.display = '';
            });
        } else {
            // Lọc sản phẩm theo từ khóa
            allProducts.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                
                if (productName.includes(searchTerm)) {
                    product.style.display = '';
                } else {
                    product.style.display = 'none';
                }
            });
        }
    }
    
    // Hàm toggle form thêm sản phẩm
    function toggleAddProductForm() {
        if (addProductSection.classList.contains('hidden')) {
            addProductSection.classList.remove('hidden');
            addProductBtn.textContent = 'Đóng form';
        } else {
            addProductSection.classList.add('hidden');
            addProductBtn.textContent = 'Thêm sản phẩm';
            addProductForm.reset(); // Reset form khi đóng
        }
    }
    
    // Hàm thêm sản phẩm mới
    function addNewProduct(event) {
        event.preventDefault(); // Ngăn form submit mặc định
        
        // Lấy dữ liệu từ form
        const productName = document.getElementById('productName').value;
        const productImage = document.getElementById('productImage').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = document.getElementById('productPrice').value;
        
        // Tạo HTML cho sản phẩm mới
        const newProductHTML = `
            <article class="product-item">
                <h3>${productName}</h3>
                <img src="${productImage}" alt="${productName}">
                <p>${productDescription}</p>
                <p class="price"><strong>Giá: ${parseInt(productPrice).toLocaleString('vi-VN')} VNĐ</strong></p>
            </article>
        `;
        
        // Thêm sản phẩm mới vào danh sách
        productList.insertAdjacentHTML('beforeend', newProductHTML);
        
        // Cập nhật lại mảng allProducts
        initializeProducts();
        
        // Reset form và ẩn form
        addProductForm.reset();
        addProductSection.classList.add('hidden');
        addProductBtn.textContent = 'Thêm sản phẩm';
        
        // Hiển thị thông báo thành công
        alert('Đã thêm sản phẩm mới thành công!');
    }
    
    // Gắn sự kiện cho nút tìm kiếm
    searchBtn.addEventListener('click', searchProducts);
    
    // Gắn sự kiện cho ô tìm kiếm (tìm kiếm khi nhấn Enter)
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Gắn sự kiện cho nút "Thêm sản phẩm"
    addProductBtn.addEventListener('click', toggleAddProductForm);
    
    // Gắn sự kiện cho nút "Hủy"
    cancelAddBtn.addEventListener('click', function() {
        addProductSection.classList.add('hidden');
        addProductBtn.textContent = 'Thêm sản phẩm';
        addProductForm.reset();
    });
    
    // Gắn sự kiện cho form thêm sản phẩm
    addProductForm.addEventListener('submit', addNewProduct);
    
    // Khởi tạo khi trang load
    initializeProducts();
    
    console.log('JavaScript đã được tải thành công!');
});
