let currentAuthMode = 'login';
let selectedRole = 'HS';
let currentUser = null;
let currentSelectedLetter = 'a';
let currentPage = 'home';

const QUIZ_DATA = [
    {
        question: "1. Trong các hình dưới đây, đâu là chữ 'A' viết thường?",
        options: ["a", "b", "c", "d"],
        correct: "a"
    },
    {
        question: "2. Chữ cái nào bắt đầu cho từ 'Bé'?",
        options: ["m", "b", "h", "k"],
        correct: "b"
    },
    {
        question: "3. Từ 'Con Cò' bắt đầu bằng chữ cái nào?",
        options: ["c", "o", "d", "e"],
        correct: "c"
    }
];

let currentQuizIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    const savedUser = localStorage.getItem('app_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainScreen();
    } else {
        showAuthScreen();
    }
    renderAlphabetSidebar();
}

function switchAuthTab(mode) {
    currentAuthMode = mode;
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const fullnameGroup = document.getElementById('fullname-group');
    const btnSubmit = document.getElementById('btn-submit');
    const errorBanner = document.getElementById('auth-error');

    errorBanner.classList.add('hidden');

    if (mode === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        fullnameGroup.classList.add('hidden');
        btnSubmit.innerHTML = '🚀 Đăng Nhập Ngay';
    } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        fullnameGroup.classList.remove('hidden');
        btnSubmit.innerHTML = '✨ Tạo Tài Khoản';
    }
}

function selectRole(role) {
    selectedRole = role;
    const btnHS = document.getElementById('role-hs');
    const btnGV = document.getElementById('role-gv');

    if (role === 'HS') {
        btnHS.classList.add('active');
        btnGV.classList.remove('active');
    } else {
        btnGV.classList.add('active');
        btnHS.classList.remove('active');
    }
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const errorBanner = document.getElementById('auth-error');
    errorBanner.classList.add('hidden');

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const fullnameInput = document.getElementById('reg-fullname').value.trim();

    if (!usernameInput || !passwordInput) {
        showAuthError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!');
        return;
    }

    let localUsers = JSON.parse(localStorage.getItem('app_users_data')) || USERS;

    if (currentAuthMode === 'login') {
        const userList = localUsers[selectedRole] || [];
        const foundUser = userList.find(u => u.username === usernameInput && u.password === passwordInput);

        if (foundUser) {
            currentUser = { ...foundUser, role: selectedRole };
            localStorage.setItem('app_current_user', JSON.stringify(currentUser));
            showMainScreen();
        } else {
            showAuthError('Tên đăng nhập hoặc mật khẩu không chính xác!');
        }
    } else {
        if (!fullnameInput) {
            showAuthError('Vui lòng nhập Họ và Tên!');
            return;
        }

        if (!localUsers[selectedRole]) {
            localUsers[selectedRole] = [];
        }

        const exists = localUsers[selectedRole].some(u => u.username === usernameInput);
        if (exists) {
            showAuthError('Tên đăng nhập này đã được sử dụng!');
            return;
        }

        const newUser = {
            username: usernameInput,
            password: passwordInput,
            name: fullnameInput
        };

        localUsers[selectedRole].push(newUser);
        localStorage.setItem('app_users_data', JSON.stringify(localUsers));

        currentUser = { ...newUser, role: selectedRole };
        localStorage.setItem('app_current_user', JSON.stringify(currentUser));
        showMainScreen();
    }
}

function showAuthError(msg) {
    const errorBanner = document.getElementById('auth-error');
    errorBanner.innerText = msg;
    errorBanner.classList.remove('hidden');
}

function showMainScreen() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');

    const avatar = currentUser.role === 'GV' ? '👩‍🏫' : '👶';
    const roleText = currentUser.role === 'GV' ? 'Giáo Viên' : 'Học Sinh';

    document.getElementById('user-avatar').innerText = avatar;
    document.getElementById('user-role-badge').innerText = roleText;
    document.getElementById('user-display-name').innerText = currentUser.name;
    document.getElementById('home-user-name').innerText = currentUser.name;

    switchPage('home');
}

function showAuthScreen() {
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

function handleLogout() {
    localStorage.removeItem('app_current_user');
    currentUser = null;
    showAuthScreen();
}

function switchPage(page) {
    currentPage = page;

    document.getElementById('page-home').classList.add('hidden');
    document.getElementById('page-lesson').classList.add('hidden');
    document.getElementById('page-exercise').classList.add('hidden');

    document.getElementById('nav-home').classList.remove('active');
    document.getElementById('nav-lesson').classList.remove('active');
    document.getElementById('nav-exercise').classList.remove('active');

    if (page === 'home') {
        document.getElementById('page-home').classList.remove('hidden');
        document.getElementById('nav-home').classList.add('active');
    } else if (page === 'lesson') {
        document.getElementById('page-lesson').classList.remove('hidden');
        document.getElementById('nav-lesson').classList.add('active');
        selectLetter(currentSelectedLetter);
    } else if (page === 'exercise') {
        document.getElementById('page-exercise').classList.remove('hidden');
        document.getElementById('nav-exercise').classList.add('active');
        loadQuiz();
    }
}

function renderAlphabetSidebar() {
    const container = document.getElementById('alphabet-container');
    if (!container) return;
    container.innerHTML = '';

    ALPHABET_DATA.forEach(item => {
        const btn = document.createElement('button');
        btn.className = `letter-btn ${item.letter === currentSelectedLetter ? 'active' : ''}`;
        btn.id = `btn-letter-${item.letter}`;
        btn.innerText = item.letter;
        btn.onclick = () => selectLetter(item.letter);
        container.appendChild(btn);
    });
}

function selectLetter(letter) {
    currentSelectedLetter = letter;

    document.querySelectorAll('.letter-btn').forEach(btn => btn.classList.remove('active'));
    const selectedBtn = document.getElementById(`btn-letter-${letter}`);
    if (selectedBtn) selectedBtn.classList.add('active');

    const letterData = ALPHABET_DATA.find(item => item.letter === letter);
    if (!letterData) return;

    document.getElementById('current-letter-title').innerText = `Bài học chữ ${letter.toUpperCase()} (${letter})`;
    document.getElementById('letter-description').innerText = letterData.description;

    const player = document.getElementById('youtube-player');
    player.src = `https://www.youtube.com/embed/${letterData.youtubeId}?rel=0&autoplay=0`;
}

function speakCurrentLetter() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`Chữ ${currentSelectedLetter}`);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Trình duyệt không hỗ trợ đọc âm thanh!');
    }
}

function loadQuiz() {
    const quiz = QUIZ_DATA[currentQuizIndex];
    document.getElementById('quiz-progress').innerText = `Câu ${currentQuizIndex + 1}/${QUIZ_DATA.length}`;
    document.getElementById('quiz-question').innerText = quiz.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.add('hidden');

    quiz.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.innerText = opt;
        btn.onclick = () => checkQuizAnswer(opt);
        optionsContainer.appendChild(btn);
    });
}

function checkQuizAnswer(selectedOption) {
    const quiz = QUIZ_DATA[currentQuizIndex];
    const feedback = document.getElementById('quiz-feedback');
    feedback.classList.remove('hidden');

    if (selectedOption === quiz.correct) {
        feedback.className = 'quiz-feedback success';
        feedback.innerText = '🎉 Chính xác rồi! Bé giỏi quá! ⭐';
        setTimeout(() => {
            currentQuizIndex = (currentQuizIndex + 1) % QUIZ_DATA.length;
            loadQuiz();
        }, 1500);
    } else {
        feedback.className = 'quiz-feedback error';
        feedback.innerText = '❌ Chưa đúng rồi, bé thử lại nhé!';
    }
}

function openEditNameModal() {
    document.getElementById('new-display-name').value = currentUser.name;
    document.getElementById('edit-name-modal').classList.remove('hidden');
}

function closeEditNameModal() {
    document.getElementById('edit-name-modal').classList.add('hidden');
}

function saveNewName() {
    const newName = document.getElementById('new-display-name').value.trim();
    if (!newName) return;

    currentUser.name = newName;
    document.getElementById('user-display-name').innerText = newName;
    document.getElementById('home-user-name').innerText = newName;

    localStorage.setItem('app_current_user', JSON.stringify(currentUser));

    let localUsers = JSON.parse(localStorage.getItem('app_users_data')) || USERS;
    if (localUsers[currentUser.role]) {
        const uObj = localUsers[currentUser.role].find(u => u.username === currentUser.username);
        if (uObj) uObj.name = newName;
        localStorage.setItem('app_users_data', JSON.stringify(localUsers));
    }

    closeEditNameModal();
}
