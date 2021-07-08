# Hướng dẫn chạy API
- docker-compose up
- docker ps -a
- docker container start <ID>
- Bật terminal tại thư mục backend.
- Gõ vào: npm start
- Server chạy trên: http://localhost:8080
# Product API
- Để lấy toàn bộ sản phẩm: GET http://localhost:8080/api/products
- Để lấy sản phẩm theo SKU: GET http://localhost:8080/api/products/<mã sku của product>
- Để tạo một sản phẩm mới: POST http://localhost:8080/api/products
- Để chỉnh sửa một sản phẩm theo SKU: PUT http://localhost:8080/api/products/<mã sku của product>
- Để xóa một sản phẩm theo SKU: DELETE http://localhost:8080/api/products/<mã sku của product>

|Thuộc tính| Kiểu dữ liệu |Chú thích|
|--|--|--|
|name|String||
|slug|String|Không cần nhập|
|price|Number||
|rating|Object|Không cần nhập|
|brand|String||
|shortDesc|String||
|size|Array||
|color|Array||
|quantity|Number||
|remaining|Number|Không cần nhập|
|sku|String|Không cần nhập|
|category|String||
|tags|Array||
|fullDesc|String||
|additionalInfo|String||
|images|Array||
|status|Number||
|postOn|Date|Không cần nhập|


# Category API
- Để lấy toàn bộ category: GET http://localhost:8080/api/categories
- Để lấy category theo ID: GET http://localhost:8080/api/categories/<id của category>
- Để tạo một category mới: POST http://localhost:8080/api/categories
- Để chỉnh sửa một category theo ID: PUT http://localhost:8080/api/categories/<id của category>
- Để xóa một category theo ID: DELETE http://localhost:8080/api/categories/<id của category>

|Thuộc tính| Kiểu dữ liệu |Chú thích|
|--|--|--|
|name|String||
|slug|String|Không cần nhập|
|tags|Array||
|fullDesc|String||
