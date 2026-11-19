# Sommelier AI – Nhận biết rượu vang

Web một trang giúp nhận biết vang đỏ / vang trắng và ước lượng điểm chất lượng từ 11 chỉ số phân tích hóa học. Chạy hoàn toàn trên trình duyệt, không cần cài đặt hay backend.

## Cấu trúc thư mục

```
.
├── index.html          # Khung giao diện (HTML)
├── css/
│   └── style.css       # Giao diện, hỗ trợ chế độ sáng/tối
├── js/
│   ├── model-data.js   # Dữ liệu mô hình đã huấn luyện (file lớn, sinh tự động)
│   └── app.js          # Logic dự đoán và xử lý giao diện
├── README.md
└── .gitignore
```

## Chạy thử trên máy

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

## Ghi chú

- Dữ liệu là vang vinho verde của Bồ Đào Nha, kết quả chỉ mang tính tham khảo.
- Font chữ tải từ Google Fonts; khi offline trình duyệt dùng font hệ thống.
