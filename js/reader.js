// ====================================================
// READER.JS — Logic trang đọc truyện
// ====================================================

// Biến toàn cục của trang đọc
let truyen_hien_tai = null;    // Object truyện đang đọc
let so_chuong_hien_tai = 1;    // Số chương đang hiện

// Chạy khi trang sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
  khoiDong();
});


// ----------------------------------------------------
// KHỞI ĐỘNG — Đọc tham số URL và load nội dung
// ----------------------------------------------------

function khoiDong() {
  // Lấy tham số từ URL: ?id=1&chuong=2
  const params = new URLSearchParams(window.location.search);
  const id      = params.get('id');
  const so_chuong = parseInt(params.get('chuong')) || 1;

  // Tìm truyện trong data.js
  truyen_hien_tai = layTruyenTheoId(id);

  if (!truyen_hien_tai) {
    // Không tìm thấy → về trang chủ
    alert('Không tìm thấy truyện!');
    window.location.href = 'index.html';
    return;
  }

  so_chuong_hien_tai = so_chuong;

  // Cập nhật tiêu đề tab trình duyệt
  document.title = `${truyen_hien_tai.tieu_de} - TruyệnHay`;

  // Hiện tên truyện trên thanh trên
  document.getElementById('ten-truyen').textContent = truyen_hien_tai.tieu_de;

  // Tạo dropdown chọn chương
  taoDropdownChuong();

  // Load chương hiện tại
  loadChuong(so_chuong_hien_tai);

  // Gán các nút công cụ
  ganCacNut();

  // Khôi phục cài đặt đọc từ lần trước
  khoiPhucCaiDat();
}


// ----------------------------------------------------
// LOAD NỘI DUNG CHƯƠNG
// ----------------------------------------------------

function loadChuong(so) {
  // Tìm chương theo số
  const chuong = layChung(truyen_hien_tai, so);

  if (!chuong) {
    alert('Chương không tồn tại!');
    return;
  }

  so_chuong_hien_tai = so;

  // Cập nhật nội dung hiển thị
  document.getElementById('chuong-tieu-de').textContent = chuong.tieu_de;
  document.getElementById('chuong-phu-de').textContent  = chuong.phu_de || '';
  document.getElementById('noi-dung').innerHTML          = chuong.noi_dung;

  // Cập nhật dropdown
  document.getElementById('chon-chuong').value = so;

  // Cập nhật nút Trước / Sau (disable nếu ở đầu/cuối)
  document.getElementById('nut-truoc').disabled = (so === 1);
  document.getElementById('nut-sau').disabled   = (so === truyen_hien_tai.chapters.length);

  // Cập nhật thông tin "Chương X / Y"
  document.getElementById('vi-tri-chuong').textContent =
    `${so} / ${truyen_hien_tai.chapters.length}`;

  // Cập nhật thanh tiến trình
  const phan_tram = (so / truyen_hien_tai.chapters.length) * 100;
  document.getElementById('progress-fill').style.width = phan_tram + '%';

  // Cuộn lên đầu trang
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Cập nhật URL mà không reload trang
  const url_moi = `doc-truyen.html?id=${truyen_hien_tai.id}&chuong=${so}`;
  history.pushState(null, '', url_moi);

  // Lưu vị trí đọc vào localStorage
  luuViTriDoc();
}


// ----------------------------------------------------
// DROPDOWN CHỌN CHƯƠNG
// ----------------------------------------------------

function taoDropdownChuong() {
  const select = document.getElementById('chon-chuong');
  select.innerHTML = '';   // Xóa cũ

  truyen_hien_tai.chapters.forEach(function(chuong) {
    const option = document.createElement('option');
    option.value       = chuong.so;
    option.textContent = chuong.tieu_de;
    select.appendChild(option);
  });

  // Khi chọn chương từ dropdown
  select.addEventListener('change', function() {
    loadChuong(parseInt(this.value));
  });
}


// ----------------------------------------------------
// GÁN CÁC NÚT
// ----------------------------------------------------

function ganCacNut() {
  // Nút chương trước
  document.getElementById('nut-truoc').addEventListener('click', function() {
    if (so_chuong_hien_tai > 1) {
      loadChuong(so_chuong_hien_tai - 1);
    }
  });

  // Nút chương sau
  document.getElementById('nut-sau').addEventListener('click', function() {
    if (so_chuong_hien_tai < truyen_hien_tai.chapters.length) {
      loadChuong(so_chuong_hien_tai + 1);
    }
  });

  // Nút đánh dấu (bookmark)
  document.getElementById('nut-bookmark').addEventListener('click', function() {
    luuBookmark();
  });

  // Nút chế độ tối
  document.getElementById('nut-toi').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const la_toi = document.body.classList.contains('dark-mode');
    localStorage.setItem('che_do_toi', la_toi);
  });
}


// ----------------------------------------------------
// CỠ CHỮ
// ----------------------------------------------------

function datCochu(co) {
  const body = document.getElementById('reader-body');

  body.classList.remove('font-nho', 'font-vua', 'font-lon');
  body.classList.add('font-' + co);

  document.querySelectorAll('.btn-co-chu').forEach(n => n.classList.remove('active'));
  
  // Xử lý thông minh giữa 'to' và 'lon' để khớp ID HTML của bạn
  const id_nut = (co === 'to' || co === 'lon') ? 'btn-co-lon' : 'btn-co-' + co;
  const nut_active = document.getElementById(id_nut);
  if (nut_active) {
    nut_active.classList.add('active');
  }

  localStorage.setItem('co_chu', co);
}


// ----------------------------------------------------
// FONT CHỮ
// ----------------------------------------------------

function datFont(ten) {
  const body = document.getElementById('reader-body');
  body.classList.remove('font-serif', 'font-sans', 'font-mono');
  body.classList.add('font-' + ten);

  document.querySelectorAll('.btn-font').forEach(n => n.classList.remove('active'));
  const nut_active = document.getElementById('btn-font-' + ten);
  if (nut_active) {
    nut_active.classList.add('active');
  }

  localStorage.setItem('font_chu', ten);
}


// ----------------------------------------------------
// BỔ SUNG CÁC HÀM TIỆN ÍCH
// ----------------------------------------------------

function layChung(truyen, so) {
  return truyen.chapters.find(c => c.so === so);
}

function luuBookmark() {
  if (!truyen_hien_tai) return;

  const ds = JSON.parse(localStorage.getItem('bookmarks') || '{}');
  ds[truyen_hien_tai.id] = {
    truyen_id:  truyen_hien_tai.id,
    tieu_de:    truyen_hien_tai.tieu_de,
    so_chuong:  so_chuong_hien_tai,
    thoi_gian:  new Date().toISOString()
  };
  localStorage.setItem('bookmarks', JSON.stringify(ds));

  const toast = document.getElementById('toast');
  if (toast) {
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2000);
  } else {
    alert(`Đã đánh dấu thành công Chương ${so_chuong_hien_tai}!`);
  }
}

function luuViTriDoc() {
  if (!truyen_hien_tai) return;
  const ds = JSON.parse(localStorage.getItem('lich_su_doc') || '{}');
  ds[truyen_hien_tai.id] = so_chuong_hien_tai;
  localStorage.setItem('lich_su_doc', JSON.stringify(ds));
}

function khoiPhucCaiDat() {
  const co_chu_cu = localStorage.getItem('co_chu') || 'vua';
  datCochu(co_chu_cu);

  const font_cu = localStorage.getItem('font_chu') || 'serif';
  datFont(font_cu);

  const la_toi_cu = localStorage.getItem('che_do_toi');
  if (la_toi_cu === 'true') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}
