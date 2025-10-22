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
        
        // Lấy lại danh sách sản phẩm hiện tại (bao gồm sản phẩm mới)
        const currentProducts = document.querySelectorAll('.product-item');
        
        if (searchTerm === '') {
            // Nếu ô tìm kiếm trống, hiển thị tất cả sản phẩm
            currentProducts.forEach(product => {
                product.style.display = '';
            });
        } else {
            // Lọc sản phẩm theo từ khóa
            currentProducts.forEach(product => {
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
    
    // Hàm hiển thị lỗi
    function showError(message) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }
    
    // Hàm ẩn lỗi
    function hideError() {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.style.display = 'none';
        errorMsg.textContent = '';
    }
    
    // Hàm validation dữ liệu
    function validateProductData(name, image, description, price) {
        // Kiểm tra tên sản phẩm
        if (!name || name.trim() === '') {
            showError('Tên sản phẩm không được để trống!');
            return false;
        }
        
        // Kiểm tra URL hình ảnh
        if (!image || image.trim() === '') {
            showError('URL hình ảnh không được để trống!');
            return false;
        }
        
        // Kiểm tra mô tả
        if (!description || description.trim() === '') {
            showError('Mô tả sản phẩm không được để trống!');
            return false;
        }
        
        if (description.trim().length < 10) {
            showError('Mô tả sản phẩm phải có ít nhất 10 ký tự!');
            return false;
        }
        
        // Kiểm tra giá
        if (!price || price.trim() === '') {
            showError('Giá sản phẩm không được để trống!');
            return false;
        }
        
        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            showError('Giá sản phẩm phải là số dương hợp lệ!');
            return false;
        }
        
        return true;
    }
    
    // Hàm thêm sản phẩm mới
    function addNewProduct(event) {
        event.preventDefault(); // Ngăn form submit mặc định
        
        // Ẩn thông báo lỗi cũ
        hideError();
        
        // Lấy dữ liệu từ form
        const productName = document.getElementById('productName').value.trim();
        const productImage = document.getElementById('productImage').value.trim();
        const productDescription = document.getElementById('productDescription').value.trim();
        const productPrice = document.getElementById('productPrice').value.trim();
        
        // Validation dữ liệu
        if (!validateProductData(productName, productImage, productDescription, productPrice)) {
            return; // Dừng nếu có lỗi
        }
        
        // Tạo phần tử sản phẩm mới bằng DOM manipulation
        const newProduct = document.createElement('article');
        newProduct.className = 'product-item';
        
        // Tạo tiêu đề sản phẩm
        const title = document.createElement('h3');
        title.textContent = productName;
        newProduct.appendChild(title);
        
        // Tạo hình ảnh sản phẩm
        const image = document.createElement('img');
        image.src = productImage;
        image.alt = productName;
        newProduct.appendChild(image);
        
        // Tạo mô tả sản phẩm
        const description = document.createElement('p');
        description.textContent = productDescription;
        newProduct.appendChild(description);
        
        // Tạo giá sản phẩm
        const price = document.createElement('p');
        price.className = 'price';
        const priceNumber = parseFloat(productPrice);
        price.innerHTML = `<strong>Giá: ${priceNumber.toLocaleString('vi-VN')} VNĐ</strong>`;
        newProduct.appendChild(price);
        
        // Thêm sản phẩm mới vào đầu danh sách
        productList.insertBefore(newProduct, productList.firstChild);
        
        // Cập nhật lại mảng allProducts để bao gồm sản phẩm mới
        allProducts = document.querySelectorAll('.product-item');
        
        // Reset form và ẩn form
        addProductForm.reset();
        addProductSection.classList.add('hidden');
        addProductBtn.textContent = 'Thêm sản phẩm';
        
        // Hiển thị thông báo thành công
        alert(`Đã thêm sản phẩm "${productName}" thành công!`);
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
        hideError(); // Ẩn thông báo lỗi khi hủy
    });
    
    // Gắn sự kiện cho form thêm sản phẩm
    addProductForm.addEventListener('submit', addNewProduct);
    
    // Khởi tạo khi trang load
    initializeProducts();
    
    console.log('JavaScript đã được tải thành công!');
});
