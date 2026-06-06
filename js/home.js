// ====================================================
// HOME.JS — Logic trang chủ
// Chạy khi trang index.html được tải
// ====================================================

// Chạy ngay khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
  hienThiTruyen('tat-ca');    // Hiện toàn bộ truyện mặc định
  ganSuKienTimKiem();
  ganSuKienLocLoai();
});


// ----------------------------------------------------
// HIỂN THỊ LƯỚI TRUYỆN
// ----------------------------------------------------

function hienThiTruyen(the_loai) {
  // Lấy dữ liệu (từ data.js)
  const danh_sach = locTheoLoai(the_loai);

  // Lấy phần tử lưới trong HTML
  const grid = document.getElementById('story-grid');

  // Xóa nội dung cũ
  grid.innerHTML = '';

  // Nếu không có kết quả
  if (danh_sach.length === 0) {
    grid.innerHTML = '<p style="color:#888;font-size:14px;">Không tìm thấy truyện nào.</p>';
    return;
  }

  // Tạo thẻ cho từng truyện
  danh_sach.forEach(function(truyen) {
    const the = taoTheHTML(truyen);
    grid.appendChild(the);
  });
}

// Tạo 1 phần tử <div> thẻ truyện
function taoTheHTML(truyen) {
  // Tạo div mới
  const card = document.createElement('div');
  card.className = 'story-card';

  // Xác định tên badge thể loại
  const ten_badge = {
    'tieu-thuyet': 'Tiểu thuyết',
    'ngon-tinh':   'Ngôn tình',
    'trinh-tham':  'Trinh thám',
    'viet-nam':    'Việt Nam'
  };

  // Điền HTML vào thẻ
  card.innerHTML = `
    <div class="cover-placeholder" style="background: ${truyen.mau_nen}">
      ${truyen.bieu_tuong}
    </div>
    <div class="card-info">
      <div class="card-title">${truyen.tieu_de}</div>
      <div class="card-author">${truyen.tac_gia}</div>
      <span class="badge badge-${truyen.the_loai}">
        ${ten_badge[truyen.the_loai] || truyen.the_loai}
      </span>
      <div style="margin-top:8px;font-size:12px;color:#888;font-family:sans-serif;">
        ⭐ ${truyen.danh_gia} · ${(truyen.luot_doc/1000).toFixed(0)}k lượt đọc
      </div>
    </div>
  `;

  // Khi click vào thẻ → chuyển sang trang đọc
  // Truyền ID truyện qua URL parameter
  card.addEventListener('click', function() {
    window.location.href = `doc-truyen.html?id=${truyen.id}&chuong=1`;
  });

  return card;
}


// ----------------------------------------------------
// TÌM KIẾM
// ----------------------------------------------------

function ganSuKienTimKiem() {
  const o_tim = document.getElementById('search-input');
  if (!o_tim) return;

  // Lắng nghe sự kiện gõ phím
  o_tim.addEventListener('input', function() {
    const tu_khoa = this.value.trim();

    if (tu_khoa === '') {
      // Nếu xóa hết → hiện lại toàn bộ
      hienThiTruyen('tat-ca');
      return;
    }

    // Tìm kiếm và cập nhật lưới
    const ket_qua = timKiem(tu_khoa);
    const grid = document.getElementById('story-grid');
    grid.innerHTML = '';

    if (ket_qua.length === 0) {
      grid.innerHTML = `<p style="color:#888;font-size:14px;font-family:sans-serif;">
        Không tìm thấy truyện với từ khóa "<strong>${tu_khoa}</strong>"
      </p>`;
      return;
    }

    ket_qua.forEach(function(truyen) {
      grid.appendChild(taoTheHTML(truyen));
    });
  });
}


// ----------------------------------------------------
// LỌC THEO THỂ LOẠI
// ----------------------------------------------------

function ganSuKienLocLoai() {
  // Lấy tất cả nút lọc (có data-loai)
  const cac_nut = document.querySelectorAll('[data-loai]');

  cac_nut.forEach(function(nut) {
    nut.addEventListener('click', function() {
      // Bỏ active khỏi tất cả nút
      cac_nut.forEach(n => n.classList.remove('active'));

      // Thêm active vào nút được click
      this.classList.add('active');

      // Lọc và hiện truyện
      const loai = this.getAttribute('data-loai');
      hienThiTruyen(loai);
    });
  });
}