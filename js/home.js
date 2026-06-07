document.addEventListener('DOMContentLoaded', function() {
  hienThiTruyen('tat-ca');
  ganSuKienTimKiem();
  ganSuKienLocLoai();
  hienThiLichSuDoc();
});

function hienThiLichSuDoc() {
  const lich_su = JSON.parse(localStorage.getItem('lich_su_doc') || '{}');
  const historyGrid = document.getElementById('history-grid');
  const khuVucLichSu = document.getElementById('khu-vuc-lich-su');
  
  if (!historyGrid || !khuVucLichSu) return;
  if (Object.keys(lich_su).length === 0) {
    khuVucLichSu.style.display = 'none';
    return;
  }

  khuVucLichSu.style.display = 'block';
  historyGrid.innerHTML = ''; 

  for (const truyenId in lich_su) {
    const chuongHienTai = lich_su[truyenId];
    const truyen = layTruyenTheoId(truyenId); 
    
    if (truyen) {
      const card = document.createElement('div');
      card.className = 'story-card';
      card.innerHTML = `
        <div class="cover-wrapper" style="background: linear-gradient(135deg, ${truyen.mau_nen} 0%, #1e293b 100%)">
          <span class="story-emoji">${truyen.bieu_tuong}</span>
          <span class="badge-history">⏱️ Chương ${chuongHienTai}</span>
        </div>
        <div class="card-info">
          <h3 class="card-title">${truyen.tieu_de}</h3>
          <div class="card-author">✍️ ${truyen.tac_gia}</div>
          <p style="color:#10b981; font-size:12px; font-weight:700; margin-top:6px;">Đang đọc dở...</p>
        </div>
      `;
      card.addEventListener('click', function() {
        window.location.href = `doc-truyen.html?id=${truyen.id}&chuong=${chuongHienTai}`;
      });
      historyGrid.appendChild(card);
    }
  }
}

function hienThiTruyen(the_loai) {
  const danh_sach = locTheoLoai(the_loai);
  const grid = document.getElementById('story-grid');
  grid.innerHTML = '';

  if (danh_sach.length === 0) {
    grid.innerHTML = '<p style="color:#888;font-size:14px;">Không tìm thấy truyện nào.</p>';
    return;
  }

  danh_sach.forEach(function(truyen) {
    grid.appendChild(taoTheHTML(truyen));
  });
}

function taoTheHTML(truyen) {
  const card = document.createElement('div');
  card.className = 'story-card';

  const ten_badge = {
    'tieu-thuyet': 'Tiểu thuyết',
    'ngon-tinh':   'Ngôn tình',
    'trinh-tham':  'Trinh thám',
    'viet-nam':    'Việt Nam'
  };

  card.innerHTML = `
    <div class="cover-wrapper" style="background: linear-gradient(135deg, ${truyen.mau_nen} 0%, #1e293b 100%)">
      <span class="story-emoji">${truyen.bieu_tuong}</span>
      <span class="badge badge-${truyen.the_loai}">
        ${ten_badge[truyen.the_loai] || truyen.the_loai}
      </span>
    </div>
    <div class="card-info">
      <h3 class="card-title">${truyen.tieu_de}</h3>
      <div class="card-author">✍️ ${truyen.tac_gia}</div>
      <div class="card-meta">
        <span class="text-rating">⭐ ${truyen.danh_gia}</span>
        <span class="meta-divider">•</span>
        <span>${(truyen.luot_doc/1000).toFixed(0)}k đọc</span>
      </div>
    </div>
  `;

  card.addEventListener('click', function() {
    window.location.href = `doc-truyen.html?id=${truyen.id}&chuong=1`;
  });

  return card;
}

function ganSuKienTimKiem() {
  const o_tim = document.getElementById('search-input');
  if (!o_tim) return;
  o_tim.addEventListener('input', function() {
    const tu_khoa = this.value.trim();
    if (tu_khoa === '') {
      hienThiTruyen('tat-ca');
      return;
    }
    const ket_qua = timKiem(tu_khoa);
    const grid = document.getElementById('story-grid');
    grid.innerHTML = '';
    if (ket_qua.length === 0) {
      grid.innerHTML = `<p style="color:#888;font-size:14px;">Không tìm thấy truyện với từ khóa "${tu_khoa}"</p>`;
      return;
    }
    ket_qua.forEach(function(truyen) {
      grid.appendChild(taoTheHTML(truyen));
    });
  });
}

function ganSuKienLocLoai() {
  const cac_nut = document.querySelectorAll('[data-loai]');
  cac_nut.forEach(function(nut) {
    nut.addEventListener('click', function() {
      cac_nut.forEach(n => n.classList.remove('active'));
      this.classList.add('active');
      const loai = this.getAttribute('data-loai');
      hienThiTruyen(loai);
    });
  });
}
