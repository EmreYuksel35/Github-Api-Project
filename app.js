// Elementleri seç

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListeners();
function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}
function getData(e){
    let username = nameInput.value.trim();
    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz.");
    }else{

        github.getGithubData(username)
        .then(Response => {
            if(Response.user.message === "Not Found"){
                // Hata mesajı 
                ui.showError("Kullanıcı Bulunamadı");
            }else{
                ui.addSearchedUserToStorage(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(Response.user);
                ui.showRepoInfo(Response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput();
    e.preventDefault();
}
function clearAllSearched(){
    // Tüm aramaları temizleme
    if (confirm("Emin misiniz ?")){
        //Silme
        Storage.clearAllSearchedUsersFromStorage(); // Storagedan temizleme
        ui.clearAllSearchedFromUI();
        ui.showSuccess("Başarıyla Silindi");
    }
}
function getAllSearched(){
    // Arananları Storagedan al ve UI'ya ekle
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `
            <li class="list-group-item">${user}</li>
        `;
    });
    lastUsers.innerHTML = result;
}