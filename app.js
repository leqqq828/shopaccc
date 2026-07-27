// Khởi tạo dữ liệu giả lập (Lưu trong bộ nhớ trình duyệt localStorage)
if (!localStorage.getItem('my_balance')) localStorage.setItem('my_balance', '100000'); // Cho sẵn 100k
if (!localStorage.getItem('my_inventory')) localStorage.setItem('my_inventory', JSON.stringify([])); // Tủ đồ rỗng

// Danh sách Kho Nick Game
const shopAccounts = [
    { id: 101, title: 'Acc Liên Quân VIP', price: 50000, user: 'lq_pro_01', pass: 'PassLienQuan123', sold: false },
    { id: 102, title: 'Acc Free Fire M1014', price: 30000, user: 'ff_quay_02', pass: 'PassFreeFire456', sold: false }
];

// ==========================================
// 1. HÀM MUA ACC (Trừ tiền + Nhét pass vào Tủ Đồ)
// ==========================================
function buyAccount(accountId) {
    let currentBalance = Number(localStorage.getItem('my_balance'));
    
    // Tìm nick trong kho
    let acc = shopAccounts.find(item => item.id === accountId);

    if (!acc) return alert('Acc không tồn tại!');
    if (acc.sold) return alert('Acc này đã có người mua rồi!');
    if (currentBalance < acc.price) return alert('Không đủ tiền! Vui lòng nạp thêm.');

    // BƯỚC 1: Trừ tiền khách
    currentBalance -= acc.price;
    localStorage.setItem('my_balance', currentBalance);

    // BƯỚC 2: Đánh dấu nick đã bán
    acc.sold = true;

    // BƯỚC 3: LƯU VÀO TỦ ĐỒ (Để khách xem lại pass bất cứ lúc nào)
    let myInventory = JSON.parse(localStorage.getItem('my_inventory'));
    myInventory.push({
        id: acc.id,
        title: acc.title,
        username: acc.user,
        password: acc.pass,
        buyAt: new Date().toLocaleString('vi-VN')
    });
    localStorage.setItem('my_inventory', JSON.stringify(myInventory));

    alert(`🎉 Mua thành công!\nTài khoản: ${acc.user}\nMật khẩu: ${acc.pass}`);
    renderInventory(); // Cập nhật lại Tủ Đồ trên giao diện
}

// ==========================================
// 2. HÀM XEM LẠI TỦ ĐỒ (Hiển thị nick đã mua)
// ==========================================
function renderInventory() {
    let myInventory = JSON.parse(localStorage.getItem('my_inventory'));
    
    console.log("--- DANH SÁCH ACC ĐÃ MUA TRONG TỦ ĐỒ ---");
    if (myInventory.length === 0) {
        console.log("Chưa mua acc nào!");
        return;
    }

    myInventory.forEach((item, index) => {
        console.log(`${index + 1}. ${item.title} | Tài khoản: ${item.username} | Mật khẩu: ${item.password} | Ngày mua: ${item.buyAt}`);
    });
}
