// Variable state
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let currentRole = "HS"; // "HS" hoặc "GV"
let authTab = "login";  // "login" hoặc "register"
let currentLetterId = "a";

// Icon minh họa đáng yêu cho 29 chữ cái
const LETTER_ICONS = {
    "a": "🍎", "aw": "🍇", "aa": "🍋", "b": "🐮", "c": "🐶", "d": "🐬", "dd": "🐥",
    "e": "🐘", "ee": "🐸", "g": "🐔", "h": "🐯", "i": "🍦", "k": "🍬", "l": "🍃",
    "m": "🐱", "n": "🐝", "o": "🎈", "oo": "☂️", "ow": "🍓", "p": "🐼", "q": "🎁",
    "r": "🤖", "s": "🦁", "t": "🚀", "u": "⛵", "uw": "🦒", "v": "🎻", "x": "🚗", "y": "🍭"
};

// Khởi chạy ứng dụng khi tải trang
window.addEventListener("DOMContentLoaded", () => {
    checkAuthState();
});

// Kiểm tra trạng thái đăng nhập
function checkAuthState() {
    const authScreen = document.getElementById("auth-screen");
    const appScreen = document.getElementById("app-screen");

    if (currentUser) {
        authScreen.classList.add("hidden");
        appScreen.classList.remove("hidden");
        updateUserInfoUI();
        renderNav();
        renderContent("study"); // Mặc định vào màn hình học
    } else {
        authScreen.classList.remove("hidden");
        appScreen.classList.add("hidden");
    }
}

// Chuyển đổi Vai trò (Học Sinh / Giáo Viên) ở màn hình đăng nhập
function setRole(role) {
    currentRole = role;
    document.getElementById("role-hs").classList.toggle("active", role === "HS");
    document.getElementById("role-gv").classList.toggle("active", role === "GV");
}

// Chuyển đổi Tab Đăng nhập / Đăng ký
function switchAuthTab(tab) {
    authTab = tab;
    document.getElementById("tab-login").classList.toggle("active", tab === "login");
    document.getElementById("tab-register").classList.toggle("active", tab === "register");
    
    const regGroup = document.getElementById("register-fullname-group");
    const btnSubmit = document.getElementById("btn-auth-submit");

    if (tab === "register") {
        regGroup.classList.remove("hidden");
        btnSubmit.innerText = "✨ Đăng Ký Tài Khoản";
    } else {
        regGroup.classList.add("hidden");
        btnSubmit.innerText = "🚀 BẮT ĐẦU VUI HỌC";
    }
}

// Xử lý Đăng nhập / Đăng ký
function handleAuth(event) {
    event.preventDefault();
    const username = document.getElementById("auth-username").value.trim();
    const password = document.getElementById("auth-password").value.trim();
    const fullname = document.getElementById("auth-fullname").value.trim();

    if (!username || !password) return alert("Vui lòng điền đầy đủ thông tin!");

    if (authTab === "register") {
        currentUser = {
            username: username,
            fullname: fullname || username,
            role: currentRole,
            avatar: currentRole === "GV" ? "👩‍🏫" : "🐱"
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        alert("Đăng ký thành công! Mời bé/cô vào học.");
    } else {
        currentUser = {
            username: username,
            fullname: username,
            role: currentRole,
            avatar: currentRole === "GV" ? "👩‍🏫" : "🐱"
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    checkAuthState();
}

// Đăng xuất
function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    checkAuthState();
}

// Cập nhật giao diện thông tin người dùng
function updateUserInfoUI() {
    if (!currentUser) return;
    document.getElementById("user-name-display").innerText = currentUser.fullname;
    document.getElementById("user-avatar-display").innerText = currentUser.avatar || "🐱";
    document.getElementById("user-role-tag").innerText = currentUser.role === "GV" ? "👩‍🏫 Giáo viên" : "👶 Học sinh";
}

// Điều hướng Menu theo vai trò
function renderNav() {
    const navContainer = document.getElementById("main-nav-container");
    if (currentUser.role === "HS") {
        navContainer.innerHTML = `
            <button class="nav-btn active" onclick="switchTab(this, 'study')">📚 Bài Học</button>
            <button class="nav-btn" onclick="switchTab(this, 'homework')">📝 Bài Tập</button>
        `;
    } else {
        navContainer.innerHTML = `
            <button class="nav-btn active" onclick="switchTab(this, 'study')">📚 Bài Học</button>
            <button class="nav-btn" onclick="switchTab(this, 'manage')">👩‍🏫 Quản Lý Bài Tập</button>
        `;
    }
}

function switchTab(btn, tabName) {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderContent(tabName);
}

// Hiển thị nội dung theo Tab
function renderContent(tabName) {
    const contentArea = document.getElementById("content-area");

    if (tabName === "study") {
        contentArea.innerHTML = `
            <div class="workspace-grid">
                <aside class="alphabet-sidebar">
                    <div class="sidebar-header">
                        <h3>🔤 Bảng Chữ Cái (29 Chữ)</h3>
                    </div>
                    <div class="alphabet-grid" id="alphabet-grid"></div>
                </aside>
                <section class="lesson-card" id="lesson-detail-area"></section>
            </div>
        `;
        renderAlphabetSidebar();
        renderLessonDetail();
    } else if (tabName === "homework") {
        contentArea.innerHTML = `
            <div class="lesson-card">
                <h2>📝 Bài Tập Về Nhà Của Bé</h2>
                <p style="margin-top:10px; font-weight:700;">Hãy hoàn thành các bài tập dưới đây nhé!</p>
                <div style="margin-top:15px; background:#FEF3C7; padding:15px; border-radius:15px; border:2px dashed #F59E0B;">
                    📌 <strong>Bài 1:</strong> Xem video và luyện viết chữ <strong>A, Ă, Â</strong> mỗi chữ 1 dòng vào vở ô ly.
                </div>
            </div>
        `;
    } else if (tabName === "manage") {
        contentArea.innerHTML = `
            <div class="lesson-card">
                <h2>👩‍🏫 Bảng Quản Lý Dành Cho Giáo Viên</h2>
                <p style="margin-top:10px; font-weight:700;">Cô có thể giao thêm bài tập viết chữ cho các bé tại đây.</p>
            </div>
        `;
    }
}

// Hiển thị Bảng 29 chữ cái bên trái (Có icon minh họa)
function renderAlphabetSidebar() {
    const grid = document.getElementById("alphabet-grid");
    if (!grid) return;

    grid.innerHTML = ALPHABET_DATA.map(item => {
        const icon = LETTER_ICONS[item.id] || "✏️";
        const isActive = item.id === currentLetterId ? "active" : "";
        return `
            <button class="letter-btn ${isActive}" onclick="selectLetter('${item.id}')">
                <span class="char">${item.upper} ${item.lower}</span>
                <span class="sub-icon">${icon}</span>
            </button>
        `;
    }).join("");
}

// Chọn chữ cái để xem bài học
function selectLetter(letterId) {
    currentLetterId = letterId;
    renderAlphabetSidebar();
    renderLessonDetail();
}

// Hiển thị chi tiết bài học chữ cái + Khung TV Video
function renderLessonDetail() {
    const detailArea = document.getElementById("lesson-detail-area");
    if (!detailArea) return;

    const lesson = ALPHABET_DATA.find(item => item.id === currentLetterId) || ALPHABET_DATA[0];
    const icon = LETTER_ICONS[lesson.id] || "✏️";

    detailArea.innerHTML = `
        <h2 style="font-size:26px; color:#FF477E; font-weight:900;">
            ${icon} Bài Học: ${lesson.name} (${lesson.upper} - ${lesson.lower})
        </h2>

        <!-- KHUNG MÀN HÌNH TV HOẠT HÌNH -->
        <div class="tv-container">
            <div class="video-frame-container">
                <iframe src="https://www.youtube.com/embed/${lesson.youtubeId}" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>

        <!-- BẢNG HƯỚNG DẪN VIẾT NÉT -->
        <div class="lesson-guide">
            <div class="guide-title">
                <span>✏️</span> Hướng dẫn cách viết chữ ${lesson.lower}:
            </div>
            <div class="guide-text">${lesson.description}</div>
        </div>
    `;
}

// Modal Cập nhật tài khoản
function openEditProfileModal() {
    if (!currentUser) return;
    document.getElementById("edit-name-input").value = currentUser.fullname;
    document.getElementById("edit-avatar-select").value = currentUser.avatar || "🐱";
    document.getElementById("profile-modal").classList.remove("hidden");
}

function closeEditProfileModal() {
    document.getElementById("profile-modal").classList.add("hidden");
}

function saveProfile() {
    const newName = document.getElementById("edit-name-input").value.trim();
    const newAvatar = document.getElementById("edit-avatar-select").value;

    if (newName) {
        currentUser.fullname = newName;
        currentUser.avatar = newAvatar;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        updateUserInfoUI();
        closeEditProfileModal();
    }
}
