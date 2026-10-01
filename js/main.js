let currentSelectedLetter = 'a';

// Khởi chạy ứng dụng khi trang web nạp xong
document.addEventListener('DOMContentLoaded', () => {
    renderAlphabetButtons();
    selectLetter('a'); // Mặc định mở chữ 'a'
});

// 1. Tạo danh sách các nút chữ cái ở Sidebar
function renderAlphabetButtons() {
    const grid = document.getElementById('alphabet-grid');
    if (!grid) return;

    grid.innerHTML = '';
    ALPHABET_DATA.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.id = `btn-letter-${item.letter}`;
        btn.innerText = item.letter;
        btn.onclick = () => selectLetter(item.letter);
        grid.appendChild(btn);
    });
}

// 2. Xử lý sự kiện khi bấm chọn một chữ cái
function selectLetter(letter) {
    currentSelectedLetter = letter;

    // Cập nhật trạng thái Active trên giao diện
    document.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
    const selectedBtn = document.getElementById(`btn-letter-${letter}`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }

    // Lấy dữ liệu chữ cái
    const letterData = ALPHABET_DATA.find(item => item.letter === letter);
    if (!letterData) return;

    // Đổi Tiêu đề và Mô tả
    document.getElementById('current-letter-title').innerText = `Bài học chữ ${letterData.upper} (${letterData.lower})`;
    document.getElementById('letter-description').innerText = letterData.description;

    // Nạp và phát Video YouTube
    const player = document.getElementById('youtube-player');
    if (letterData.youtubeId) {
        player.src = `https://www.youtube.com/embed/${letterData.youtubeId}?autoplay=1&rel=0`;
    } else {
        player.src = '';
    }
}
