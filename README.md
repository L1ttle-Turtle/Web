# PHIM HAY - Website Quản Lý & Xem Phim

**Phim Hay** là một website quản lý và xem phim đơn giản, xây dựng bằng **HTML, CSS, JavaScript** và sử dụng **LocalStorage** để lưu trữ dữ liệu. Giao diện mô phỏng phong cách giống trang phim.nguonc.com.

## Tính Năng

- Thêm phim mới: Lưu trữ thông tin phim, ảnh thumbnail, loại phim (lẻ / bộ), quốc gia, thể loại, mô tả, link xem.
- Sửa phim: Cho phép chỉnh sửa mọi thông tin và cập nhật link phim mới.
- Xoá phim: Xoá vĩnh viễn phim khỏi hệ thống.
- Xem phim: Xem phim với trình phát iframe, chọn tập với phim bộ.
- Tìm kiếm & Lọc phim:
  - Theo thể loại, quốc gia, năm phát hành.
  - Tìm kiếm nhanh theo tên phim.
- Lưu trữ offline: Dữ liệu được lưu trên LocalStorage, không cần server.
- Giao diện responsive: Hiển thị tốt trên máy tính và thiết bị di động.

## Cấu Trúc File Dự Án

phim-hay/
├── index.html # Trang chủ: hiển thị danh sách phim
├── add.html # Form thêm phim mới
├── edit.html # Danh sách phim để chọn sửa
├── edit_form.html # Form sửa phim chi tiết
├── delete.html # Trang xoá phim
├── developer.html # Thông tin dành cho nhà phát triển
├── film_watch.html # Trang xem phim / từng tập
│
├── style.css # Giao diện, hiệu ứng, layout
├── script.js # Xử lý logic hiển thị, tương tác, localStorage
│
└── README.md # Giới thiệu dự án (file này)
## Hướng Dẫn Sử Dụng

1. Mở `index.html` bằng trình duyệt (đề xuất Chrome).
2. Nhấn vào nút "Thêm phim" hoặc truy cập `add.html` để thêm phim.
3. Các phim được lưu vào `localStorage`, sẽ hiển thị trên trang chủ.
4. Có thể click vào tên phim để xem, hoặc vào `edit.html` để chỉnh sửa phim.

## Lưu Ý

- Ảnh thumbnail được lưu dưới dạng Base64 trong LocalStorage (không cần upload lên server).
- Nếu dùng trên trình duyệt khác, dữ liệu phim sẽ không đồng bộ do lưu trên LocalStorage riêng.
  
## Bản quyền & Tác giả

- Dự án phục vụ mục đích học tập và nghiên cứu cá nhân.
- Thiết kế mô phỏng lại giao diện phổ biến của các website xem phim tại Việt Nam.
- Người thực hiện: Lê Phước Danh, Đỗ Gia Tiến.
