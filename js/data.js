// ====================================================
// DATA.JS — Kho dữ liệu truyện (giả lập database)
// Trong dự án thực: dữ liệu này lấy từ server qua API
// ====================================================

// Mảng chứa toàn bộ danh sách truyện
const DANH_SACH_TRUYEN = [
  {
    id: 1,
    tieu_de: "Kiếm Thần Vô Song",
    tac_gia: "Lý Thanh Vân",
    the_loai: "tieu-thuyet",       // Dùng để lọc theo thể loại
    mo_ta: "Hành trình trở thành Kiếm Thần của cậu bé làng quê Trần Phong.",
    bieu_tuong: "⚔️",              // Emoji dùng thay ảnh bìa
    mau_nen: "#EEEDFE",            // Màu nền bìa
    luot_doc: 125000,
    danh_gia: 4.8,
    chapters: [
      {
        so: 1,
        tieu_de: "Chương 1: Khởi Nguyên",
        phu_de: "Nơi mọi thứ bắt đầu...",
        noi_dung: `
          <p>Trong một đêm trăng tròn tháng bảy, cậu bé Trần Phong bước ra khỏi ngôi làng nhỏ ở chân núi Thái Sơn...</p>
          <p>Tiếng gió hú qua kẽ lá như lời thì thầm của số phận. Trần Phong siết chặt thanh kiếm gỗ cũ kỹ mà cha đã trao lại trước lúc lâm chung.</p>
          <p>"Cha ơi, con sẽ trở thành Kiếm Thần vĩ đại nhất thiên hạ," cậu khẽ thì thầm vào màn đêm bao la.</p>
        `
      },
      {
        so: 2,
        tieu_de: "Chương 2: Sư Phụ Bí Ẩn",
        phu_de: "Cuộc gặp gỡ định mệnh",
        noi_dung: `
          <p>Lão già xuất hiện từ trong màn sương sớm, tay cầm bầu rượu, bước chân như không chạm đất.</p>
          <p>"Nhóc con, ngươi muốn học kiếm thật sự không?" giọng lão khàn khàn nhưng vang vọng như sấm.</p>
          <p>Trần Phong nuốt nước bọt. Trước mặt cậu là một trong Tứ Đại Kiếm Thánh của võ lâm.</p>
        `
      },
      {
        so: 3,
        tieu_de: "Chương 3: Khổ Luyện",
        phu_de: "Một ngàn ngày rèn giũa",
        noi_dung: `
          <p>Ba năm trên đỉnh Tuyết Sơn, Trần Phong không biết đến giá lạnh là gì nữa.</p>
          <p>Kiếm pháp Vạn Kiếm Quyết có chín tầng, mỗi tầng tương ứng với một trạng thái của nước.</p>
          <p>Đêm đó, khi luyện đến lần thứ chín nghìn chín trăm chín mươi chín, Trần Phong đột nhiên cảm thấy cả thanh kiếm như tan biến.</p>
        `
      }
    ]
  },
  {
    id: 2,
    tieu_de: "Hoa Xuyên Tuyết",
    tac_gia: "Nguyệt Lạc",
    the_loai: "ngon-tinh",
    mo_ta: "Chuyện tình yêu đẹp như tranh giữa cô nàng vui vẻ và anh chàng lạnh lùng.",
    bieu_tuong: "🌸",
    mau_nen: "#FBEAF0",
    luot_doc: 89000,
    danh_gia: 4.6,
    chapters: [
      {
        so: 1,
        tieu_de: "Chương 1: Ngồi Nhầm Bàn",
        phu_de: "Một buổi chiều thu se lạnh",
        noi_dung: `
          <p>Khi Mỹ Linh bước vào quán cà phê nhỏ ở phố cổ, cô không nghĩ rằng mình sẽ ngồi nhầm bàn của người đẹp trai nhất cô từng gặp.</p>
          <p>"Xin lỗi, chỗ này có người ngồi rồi." Giọng anh ấm áp nhưng lạnh lùng, không thèm nhìn lên khỏi trang sách.</p>
          <p>Mỹ Linh đỏ mặt. Cả quán chỉ còn duy nhất chiếc bàn này trống. Ngoài trời, mưa bắt đầu rơi nặng hạt hơn.</p>
        `
      },
      {
        so: 2,
        tieu_de: "Chương 2: Hiểu Lầm",
        phu_de: "Tình yêu không bao giờ đơn giản",
        noi_dung: `
          <p>Ba tuần sau cuộc gặp gỡ tình cờ đó, Minh Khoa đã tìm mọi cách để không nghĩ đến cô gái tóc ngắn hay cười ấy. Anh thất bại thảm hại.</p>
          <p>Buổi sáng uống cà phê, anh nhớ cô. Trưa ăn cơm, anh nhớ cô. Tối đọc sách, anh lại nhớ cô cầm cuốn sách lộn ngược mà vẫn nghiêm túc bảo đang đọc.</p>
        `
      }
    ]
  },
  {
    id: 3,
    tieu_de: "Thám Tử Bóng Đêm",
    tac_gia: "Hắc Ảnh",
    the_loai: "trinh-tham",
    mo_ta: "Những vụ án kỳ bí và nữ thám tử thiên tài Gia Hân.",
    bieu_tuong: "🔍",
    mau_nen: "#E6F1FB",
    luot_doc: 67000,
    danh_gia: 4.9,
    chapters: [
      {
        so: 1,
        tieu_de: "Chương 1: Căn Phòng Khóa",
        phu_de: "Không có tội ác hoàn hảo",
        noi_dung: `
          <p>Đêm mưa ngày 13 tháng 11, thám tử Gia Hân nhận được cuộc gọi lúc 2 giờ sáng. Một xác chết trong căn phòng khóa kín, không có lối ra.</p>
          <p>"Đây là vụ thứ ba theo kiểu này trong hai tháng," thiếu tá Tuấn nói, giọng mệt mỏi.</p>
          <p>"Kẻ giết người vẫn còn trong phòng này," cô nói nhẹ nhàng. Cả phòng im lặng.</p>
        `
      }
    ]
  }
];

// ====================================================
// HÀM TIỆN ÍCH — Các hàm lấy dữ liệu dùng trong JS khác
// ====================================================

// Lấy toàn bộ truyện
function layTatCaTruyen() {
  return DANH_SACH_TRUYEN;
}

// Lấy 1 truyện theo ID
function layTruyenTheoId(id) {
  // parseInt vì URL param là string, id trong data là number
  return DANH_SACH_TRUYEN.find(t => t.id === parseInt(id));
}

// Lọc truyện theo thể loại
function locTheoLoai(the_loai) {
  if (the_loai === 'tat-ca') return DANH_SACH_TRUYEN;
  return DANH_SACH_TRUYEN.filter(t => t.the_loai === the_loai);
}

// Tìm kiếm theo tên truyện hoặc tác giả
function timKiem(tu_khoa) {
  const kw = tu_khoa.toLowerCase();
  return DANH_SACH_TRUYEN.filter(t =>
    t.tieu_de.toLowerCase().includes(kw) ||
    t.tac_gia.toLowerCase().includes(kw)
  );
}

// Lấy 1 chương của truyện theo số chương
function layChung(truyen, so_chuong) {
  return truyen.chapters.find(c => c.so === so_chuong);
}