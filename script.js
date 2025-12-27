let currentUser = null;
const adminPassword = "admin123"; // Admin şifresi

// Giriş işlemi
function login() {
    const username = document.getElementById('username').value.trim();
    const userClass = document.getElementById('class').value.trim();
    const password = document.getElementById('password').value;
    const error = document.getElementById('loginError');
    error.style.color = "red";

    if(username === "" || userClass === "") {
        error.innerText = "Ad ve sınıf zorunlu!";
        return;
    }

    if(password === adminPassword) {
        currentUser = { name: username, class: userClass, role: "admin" };
        document.getElementById('duyuruInput').style.display = "block";
    } else {
        currentUser = { name: username, class: userClass, role: "user" };
        document.getElementById('yorumInput').style.display = "block";
    }

    document.getElementById('loginDiv').style.display = "none";
    document.getElementById('mainDiv').style.display = "block";

    loadDuyurular();
    loadYorumlar();
}

// Duyuru ekleme
function addDuyuru() {
    const text = document.getElementById('duyuruText').value.trim();
    if(text === "") return;

    let duyurular = JSON.parse(localStorage.getItem('duyurular') || "[]");
    duyurular.push({ text: text, user: currentUser.name, date: new Date().toLocaleString() });
    localStorage.setItem('duyurular', JSON.stringify(duyurular));

    document.getElementById('duyuruText').value = "";
    loadDuyurular();
}

// Duyuruları yükleme
function loadDuyurular() {
    const duyuruList = document.getElementById('duyuruList');
    duyuruList.innerHTML = "";
    let duyurular = JSON.parse(localStorage.getItem('duyurular') || "[]");

    duyurular.forEach((duyuru, index) => {
        const div = document.createElement('div');
        div.className = "duyuruItem";
        div.innerHTML = `<strong>${duyuru.user}</strong> (${duyuru.date}): ${duyuru.text}`;

        if(currentUser.role === "admin") {
            const delBtn = document.createElement('button');
            delBtn.innerText = "Sil";
            delBtn.onclick = () => deleteDuyuru(index);
            div.appendChild(delBtn);
        }

        duyuruList.appendChild(div);
    });
}

// Duyuru silme
function deleteDuyuru(index) {
    let duyurular = JSON.parse(localStorage.getItem('duyurular') || "[]");
    duyurular.splice(index, 1);
    localStorage.setItem('duyurular', JSON.stringify(duyurular));
    loadDuyurular();
}

// Yorum ekleme
function addYorum() {
    const text = document.getElementById('yorumText').value.trim();
    if(text === "") return;

    let yorumlar = JSON.parse(localStorage.getItem('yorumlar') || "[]");
    yorumlar.push({ text: text, user: currentUser.name, date: new Date().toLocaleString() });
    localStorage.setItem('yorumlar', JSON.stringify(yorumlar));

    document.getElementById('yorumText').value = "";
    loadYorumlar();
}

// Yorumları yükleme
function loadYorumlar() {
    const yorumList = document.getElementById('yorumList');
    yorumList.innerHTML = "";
    let yorumlar = JSON.parse(localStorage.getItem('yorumlar') || "[]");

    yorumlar.forEach((yorum, index) => {
        const div = document.createElement('div');
        div.className = "duyuruItem";
        div.innerHTML = `<strong>${yorum.user}</strong> (${yorum.date}): ${yorum.text}`;

        if(currentUser.role === "admin") {
            const delBtn = document.createElement('button');
            delBtn.innerText = "Sil";
            delBtn.onclick = () => deleteYorum(index);
            div.appendChild(delBtn);
        }

        yorumList.appendChild(div);
    });
}

// Yorum silme
function deleteYorum(index) {
    let yorumlar = JSON.parse(localStorage.getItem('yorumlar') || "[]");
    yorumlar.splice(index, 1);
    localStorage.setItem('yorumlar', JSON.stringify(yorumlar));
    loadYorumlar();
}

// Wallpaper ayarlama
function setWallpaper() {
    const file = document.getElementById('wallpaperInput').files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        localStorage.setItem('wallpaper', e.target.result);
    }
    reader.readAsDataURL(file);
}

// Sayfa yüklendiğinde wallpaper uygula
window.onload = function() {
    const wp = localStorage.getItem('wallpaper');
    if(wp) document.body.style.backgroundImage = `url(${wp})`;
}
