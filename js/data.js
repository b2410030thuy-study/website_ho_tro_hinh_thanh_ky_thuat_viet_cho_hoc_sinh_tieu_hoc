// DỮ LIỆU BẢNG CHỮ CÁI VÀ VIDEO YOUTUBE
const ALPHABET_DATA = [
    { id: "a", letter: "a", lower: "a", upper: "A", name: "Chữ a", youtubeId: "drneBN4t2_0", description: "Chữ a gồm 2 nét: Nét cong tròn khép kín và nét móc ngược phải." },
    { id: "aw", letter: "ă", lower: "ă", upper: "Ă", name: "Chữ ă", youtubeId: "bLXsG53AhTs", description: "Chữ ă gồm chữ a và nét cong dưới (dấu á) đặt ở trên đầu." },
    { id: "aa", letter: "â", lower: "â", upper: "Â", name: "Chữ â", youtubeId: "cLR8LSAUvNc", description: "Chữ â gồm chữ a và dấu mũ đặt ở trên đầu." },
    { id: "b", letter: "b", lower: "b", upper: "B", name: "Chữ b", youtubeId: "AYMEFsV8oGU", description: "Chữ b gồm nét khuyết trên nối liền với nét thắt." },
    { id: "c", letter: "c", lower: "c", upper: "C", name: "Chữ c", youtubeId: "qpPFGkoc08c", description: "Chữ c gồm 1 nét cong trái." },
    { id: "d", letter: "d", lower: "d", upper: "D", name: "Chữ d", youtubeId: "G8vQXirNegE", description: "Chữ d gồm nét cong tròn khép kín và nét móc ngược phải cao 4 ô ly." },
    { id: "dd", letter: "đ", lower: "đ", upper: "Đ", name: "Chữ đ", youtubeId: "_fts0DF3gtU", description: "Chữ đ gồm chữ d và 1 nét ngang ngắn cắt qua nét móc ngược." },
    { id: "e", letter: "e", lower: "e", upper: "E", name: "Chữ e", youtubeId: "d-mj2hECWK0", description: "Chữ e gồm 1 nét cong phải nối liền với nét cong trái." },
    { id: "ee", letter: "ê", lower: "ê", upper: "Ê", name: "Chữ ê", youtubeId: "OIC5GXgs4uw", description: "Chữ ê gồm chữ e và dấu mũ đặt cân đối ở trên đầu." },
    { id: "g", letter: "g", lower: "g", upper: "G", name: "Chữ g", youtubeId: "1MMZTptnvsY", description: "Chữ g gồm nét cong tròn khép kín và nét khuyết dưới." },
    { id: "h", letter: "h", lower: "h", upper: "H", name: "Chữ h", youtubeId: "OpG20bE7NZ0", description: "Chữ h gồm nét khuyết trên nối liền với nét móc hai đầu." },
    { id: "i", letter: "i", lower: "i", upper: "I", name: "Chữ i", youtubeId: "CzBUM3_f8fk", description: "Chữ i gồm nét xiên ngắn, nét móc ngược phải và dấu chấm." },
    { id: "k", letter: "k", lower: "k", upper: "K", name: "Chữ k", youtubeId: "ToZWCbg2f0I", description: "Chữ k gồm nét khuyết trên nối liền với nét thắt giữa." },
    { id: "l", letter: "l", lower: "l", upper: "L", name: "Chữ l", youtubeId: "v2pnFK4UU0s", description: "Chữ l gồm 1 nét khuyết trên nối liền nét móc ngược cao 5 ô ly." },
    { id: "m", letter: "m", lower: "m", upper: "M", name: "Chữ m", youtubeId: "vu88TNi_KTU", description: "Chữ m gồm nét móc xuôi trái, nét móc xuôi rộng và nét móc hai đầu." },
    { id: "n", letter: "n", lower: "n", upper: "N", name: "Chữ n", youtubeId: "5eO7cXuRtHA", description: "Chữ n gồm nét móc xuôi trái và nét móc hai đầu." },
    { id: "o", letter: "o", lower: "o", upper: "O", name: "Chữ o", youtubeId: "VmzS2fVnaps", description: "Chữ o gồm 1 nét cong tròn khép kín." },
    { id: "oo", letter: "ô", lower: "ô", upper: "Ô", name: "Chữ ô", youtubeId: "OegGW9Jh74k", description: "Chữ ô gồm chữ o và dấu mũ ở trên đầu." },
    { id: "ow", letter: "ơ", lower: "ơ", upper: "Ơ", name: "Chữ ơ", youtubeId: "RiIuI2oeSbk", description: "Chữ ơ gồm chữ o và nét râu nhỏ góc trên bên phải." },
    { id: "p", letter: "p", lower: "p", upper: "P", name: "Chữ p", youtubeId: "Gx6lrk82KpM", description: "Chữ p gồm nét xiên ngắn, nét thẳng đứng và nét móc hai đầu." },
    { id: "q", letter: "q", lower: "q", upper: "Q", name: "Chữ q", youtubeId: "Dym_rJGrWt4", description: "Chữ q gồm nét cong tròn khép kín và nét thẳng đứng." },
    { id: "r", letter: "r", lower: "r", upper: "R", name: "Chữ r", youtubeId: "5sxO_HuKLBs", description: "Chữ r gồm nét thắt đầu nối với nét thắt ngang và nét móc ngược." },
    { id: "s", letter: "s", lower: "s", upper: "S", name: "Chữ s", youtubeId: "hwVH_zQJAzU", description: "Chữ s gồm nét thắt đầu nối với nét cong phồng bên phải." },
    { id: "t", letter: "t", lower: "t", upper: "T", name: "Chữ t", youtubeId: "GSb75pRz84k", description: "Chữ t gồm nét xiên ngắn, nét móc ngược cao 3 ô ly và nét ngang." },
    { id: "u", letter: "u", lower: "u", upper: "U", name: "Chữ u", youtubeId: "F1qJatFXTG0", description: "Chữ u gồm nét xiên ngắn, nét móc ngược rộng và nét móc hẹp." },
    { id: "uw", letter: "ư", lower: "ư", upper: "Ư", name: "Chữ ư", youtubeId: "JXezsFHBWEg", description: "Chữ ư gồm chữ u và nét râu nhỏ ở góc trên bên phải." },
    { id: "v", letter: "v", lower: "v", upper: "V", name: "Chữ v", youtubeId: "kOa3b-DcESE", description: "Chữ v gồm nét móc hai đầu nối liền nét thắt ở đỉnh." },
    { id: "x", letter: "x", lower: "x", upper: "X", name: "Chữ x", youtubeId: "pZv6sY5ev2c", description: "Chữ x gồm 1 nét cong trái và 1 nét cong phải tựa vào nhau." },
    { id: "y", letter: "y", lower: "y", upper: "Y", name: "Chữ y", youtubeId: "_7Lm6jJR-1s", description: "Chữ y gồm nét xiên ngắn, nét móc ngược rộng và nét khuyết dưới." }
];

// DỮ LIỆU BÀI TẬP BẠN ĐẦU
const INITIAL_HOMEWORK = [
    { id: 1, title: "Luyện tập chữ A, Ă, Â", desc: "Xem lại video và viết mỗi chữ 1 dòng vào vở bài tập." },
    { id: 2, title: "Ôn tập các nét cơ bản chữ B, C", desc: "Hoàn thành bài tập nhận diện nét thắt và nét cong." }
];
