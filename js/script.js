const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const login = $('.login');
const register = $('.register');
const headerRightS = $('.header-right span');
const headerAccount = $('.account');
const iconUser = $('.icon-user');

//login
const userLogin = $('#user-login');
const passLogin = $('#password-login');

//register
const userRegister = $('#user-register');
const warningUserReg = $('#user-register ~ span');
const fullName = $('#full-name');
const address = $('#address');
const phoneNumber = $('#phone-number');
const warningPhone = $('#phone-number ~ span');
const passRegister = $('#password-register');
const warningPassReg = $('#password-register ~ span');
const rePassword = $('#re-password');
const warningRePass = $('#re-password ~ span');

const btnLogin = $('.btn-login');
const btnRegister = $('.btn-register');
const boardRegister = $('.board-register');
const boardLogin = $('.board-login');

//form đăng ký đăng nhập
// localStorage.clear();
function textAnimation(){
  $$('.form-input label').forEach((label)=>{
    label.innerHTML = label.innerText
    .split('')
    .map((letter, idx) => `<span style="transition-delay: ${idx * 20}ms">${(letter == ' ') ? '&#160' : letter}</span>`)
    .join('')
  })
}

let admin = {
  user: "admin",
  fullName: "admin",
  address: "",
  phoneNumber: "",
  pass: "12345678",
  userType: "admin"
};
// localStorage.clear();
let temp = JSON.parse(localStorage.getItem('dataUser'))
let listUser = temp !== null ? temp : [admin];
let data = localStorage.setItem('dataUser', JSON.stringify(listUser));
let formData = {
  user: "",
  fullName: "",
  address: "",
  phoneNumber: "",
  pass: "",
  userType: "consumer"
}
function handleEvent(){
  register.onclick = ()=>{
    boardRegister.classList.remove('active');
  }
  btnRegister.onclick = ()=>{
    boardRegister.classList.add('active');
  }
  login.onclick = ()=>{
    boardLogin.classList.remove('active');
  }
  btnLogin.onclick = ()=>{
    boardLogin.classList.add('active');
  }
}

function changeForm(){
  boardLogin.classList.add('active');
  boardRegister.classList.remove('active');
}

//check đăng ký
function checkRegister(){
  $('#form-register').onsubmit = function(){
    formData.fullName = fullName.value;
    formData.address = address.value;
    if(userRegister.value === ""){
      warningUserReg.innerHTML = "Nhap user";
      userRegister.focus();
      return false;
    }else{
      warningUserReg.innerHTML = "";
      formData.user = userRegister.value;
    }
    if(phoneNumber.value.length < 10 && isNaN(phoneNumber.value)){
      warningPhone.innerHTML = "So dien thoai khong dung";
      phoneNumber.focus();
      return false;
    }else{
      warningPhone.innerHTML = "";
      formData.phoneNumber = phoneNumber.value;
    }
    if(passRegister.value.length < 8){
      warningPassReg.innerHTML = "Mat khau qua ngan";
      passRegister.focus();
      return false;
    }else{
      warningPassReg.innerHTML = "";
      formData.pass = passRegister.value;
    }
    if(passRegister.value != rePassword.value){
      warningPassReg.innerHTML = "Mat khau khong trung khop";
      warningRePass.innerHTML = "Mat khau khong trung khop";
      rePassword.focus();
      return false;
    }else{
      warningPassReg.innerHTML = "";
      warningRePass.innerHTML = "";
    }
    setAccount(formData);
    listUser.push(formData);
    localStorage.setItem('dataUser', JSON.stringify(listUser));
  }
}

//check đăng nhập
function checkLogin(){
  $('#form-login').onsubmit = function(event){
    for(let i of listUser){
      if(userLogin.value === i.user && passLogin.value === i.pass && i.userType === "admin"){
        event.preventDefault()
        window.open('./managerAcc.html', '_black');
        return true;
      }else if(userLogin.value === i.user && passLogin.value === i.pass){
        setAccount(i);
        return true;
      }
    }
    alert('Tai khoan khong ton tai');
    return false;
  }
}

//lấy tài khoản hiện tại
function setAccount(obj){
  let temp = [obj];
  localStorage.setItem('currentUser', JSON.stringify(temp));
  location.href = './index.html/'
}
let currentAccount = JSON.parse(localStorage.getItem('currentUser'));
function renderAccount(){
  if(currentAccount != null){
    headerAccount.style.display = 'none';
    headerRightS.innerHTML = currentAccount[0].fullName;
    iconUser.style.display = 'block';
    headerRightS.addEventListener('click', logOut);
  }
}

//đăng xuất
function logOut(){
  iconUser.style.display = 'none';
  headerRightS.style.display = 'none';
  headerAccount.style.display = 'flex'; 
  localStorage.setItem('currentUser', null);
  headerRightS.removeEventListener('click', logOut);
  location.reload();
}

var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].classList.add('active');
}

//Product
function InitProduct(productId, brand, img, name, price){
  this.productId = productId
  this.brand = brand
  this.img = img
  this.name = name
  this.price = price
}
let productArr = [
  //***************************Phone********************************
  new InitProduct("1011OO", "phone", "./assests/img/phone/iphone-xi-do-600x600.jpg", "Iphone 11 64gb", "18990000"),
  new InitProduct("1111OO", "phone", "./assests/img/phone/iphone-xi-do-600x600.jpg", "Iphone 11 128gb", "20990000"),
  new InitProduct("1211OO", "phone", "./assests/img/phone/iphone-11-den-600x600.jpg", "Iphone 11 256gb", "21490000"),
  new InitProduct("1311PO", "phone", "./assests/img/phone/iphone-11-pro-256gb-black-600x600.jpg", "Iphone 11 pro 256gb", "25700000"),
  new InitProduct("1411PO", "phone", "./assests/img/phone/iphone-11-pro-512gb-white-600x600.jpg", "Iphone 11 pro 64gb", "22700000"),
  new InitProduct("1511PO", "phone", "./assests/img/phone/iphone-11-pro-256gb-black-600x600.jpg", "Iphone 11 pro 128gb", "24700000"),
  new InitProduct("1611PM", "phone", "./assests/img/phone/iphone-11-pro-max-512gb-gold-600x600.jpg", "Iphone 11 pro max 256gb", "28700000"),
  new InitProduct("1711PM", "phone", "./assests/img/phone/iphone-11-pro-512gb-white-600x600.jpg", "Iphone 11 pro max 512gb", "30700000"),
  new InitProduct("1811PM", "phone", "./assests/img/phone/iphone-11-pro-256gb-black-600x600.jpg", "Iphone 11 pro max 256gb", "29700000"),
  new InitProduct("1912OO", "phone", "./assests/img/phone/iphone-12-do-new-2-600x600.jpg", "Iphone 12 64gb", "21000000"),
  new InitProduct("2012OO", "phone", "./assests/img/phone/iphone-12-do-new-2-600x600.jpg", "Iphone 12 128gb", "22500000"),
  new InitProduct("2112MO", "phone", "./assests/img/phone/iphone-12-mini-den-15-600x600.jpg", "Iphone 12 mini 128gb", "19000000"),
  new InitProduct("2212MO", "phone", "./assests/img/phone/iphone-12-mini-trang-600x600.jpg", "Iphone 12 mini 256gb", "21000000"),
  new InitProduct("2312PM", "phone", "./assests/img/phone/iphone-12-pro-max-vang-new-600x600-600x600.jpg", "Iphone 12 pro max 128gb", "29000000"),
  new InitProduct("2412PM", "phone", "./assests/img/phone/iphone-12-pro-max-xanh-duong-new-600x600-600x600.jpg", "Iphone 12 pro max 256gb", "31000000"),
  new InitProduct("2512PM", "phone", "./assests/img/phone/iphone-12-pro-xam-new-600x600-600x600.jpg", "Iphone 12 pro max 256gb", "31000000"),
  new InitProduct("2612PO", "phone", "./assests/img/phone/iphone-12-pro-xam-new-600x600-600x600.jpg", "Iphone 12 pro 128gb", "26000000"),
  new InitProduct("2713OO", "phone", "./assests/img/phone/iphone-13-midnight-2-600x600.jpg", "Iphone 13 256gb", "24000000"),
  new InitProduct("2813MO", "phone", "./assests/img/phone/iphone-13-mini-blue-2-600x600.jpg", "Iphone 13 128gb", "22000000"),
  new InitProduct("2913MO", "phone", "./assests/img/phone/iphone-13-mini-red-1-600x600.jpg", "Iphone 13 64gb", "22990000"),
  new InitProduct("3013PO", "phone", "./assests/img/phone/iphone-13-pro-gold-1-600x600.jpg", "Iphone 13 pro 64", "30000000"),
  new InitProduct("3113PM", "phone", "./assests/img/phone/iphone-12-pro-xam-new-600x600-600x600.jpg", "Iphone 13 pro 128gb", "34000000"),
  new InitProduct("3213PO", "phone", "./assests/img/phone/iphone-13-pro-sierra-blue-600x600.jpg", "Iphone 13 pro 256gb", "38000000"),
  new InitProduct("3313PO", "phone", "./assests/img/phone/iphone-13-pro-gold-1-600x600.jpg", "Iphone 13 pro 512gb", "40000000"),
  new InitProduct("3413PM", "phone", "./assests/img/phone/iphone-12-pro-xam-new-600x600-600x600.jpg", "Iphone 13 pro 128gb", "34000000"),
  new InitProduct("3513PO", "phone", "./assests/img/phone/iphone-13-pro-sierra-blue-600x600.jpg", "Iphone 13 pro 256gb", "30000000"),
  //***************************ipad********************************
  new InitProduct("3601IP", "tablet", "./assests/img/tablet/ipad-4-cellular-den-new-600x600-600x600.jpg", "ipad 4 cellular den", "10000000"),
  new InitProduct("3702IP", "tablet", "./assests/img/tablet/ipad-4-cellular-hong-new-600x600-600x600.jpg", "ipad 4 cellular hong", "9400000"),
  new InitProduct("3803IP", "tablet", "./assests/img/tablet/ipad-air-4-wifi-64gb-2020-xanhduong-600x600-600x600.jpg", "ipad air 4 wifi 64gb", "21490000"),
  new InitProduct("3904IP", "tablet", "./assests/img/tablet/ipad-gen-9-wifi-grey-1-600x600.jpg", "ipad gen 9 wifi grey", "10990000"),
  new InitProduct("4005IP", "tablet", "./assests/img/tablet/ipad-mini-6-wifi-cellular-starlight-1-600x600.jpg", "ipad mini 6 wifi cellular starlight", "14990000"),
  new InitProduct("4106IP", "tablet", "./assests/img/tablet/ipad-mini-79-inch-wifi-cellular-64gb-2019-gold-600x600-1-600x600.jpg", "ipad mini", "15490000"),
  new InitProduct("4207IP", "tablet", "./assests/img/tablet/ipad-pro-11-inch-wifi-cellular-128gb-2020-xam-600x600-1-600x600.jpg", "ipad pro 11 inch wifi cellular 128gb", "25450000"),
  new InitProduct("4308IP", "tablet", "./assests/img/tablet/ipad-pro-12-9-inch-wifi-128gb-2020-bac-600x600-1-600x600.jpg", "ipad pro 12 9 inch wifi 128gb", "26790000"),
  new InitProduct("4409IP", "tablet", "./assests/img/tablet/ipad-pro-2021-129-inch-gray-thumb-600x600.jpg", "ipad pro 2021 12 9 inch gray", "37490000"),
  new InitProduct("4510IP", "tablet", "./assests/img/tablet/ipad-pro-2021-129-inch-silver-600x600.jpg", "ipad pro 2021 12 9 inch silver", "41990000"),
  //***************************Macbook********************************   
  new InitProduct("4600MB", "computer", "./assests/img/computer/Macbook Pro 13 2020 M1 - Silver.jpg", "Macbook Pro 13 2020 M1", "36000000"),
  new InitProduct("4701MB", "computer", "./assests/img/computer/MacBook Pro 16 2021 M1 Pro -Silver.png", "Macbook Pro 16 2021 M1 Pro", "70000000"),
  new InitProduct("4802MB", "computer", "./assests/img/computer/MacBook Pro 14 2021 -Space Grey.png", "Macbook Pro 14 2021", "52000000"),
  new InitProduct("4903MB", "computer", "./assests/img/computer/MacBook Pro 13 2020 M1 -Grey.jpg", "Macbook 13 2020 M1", "36000000"),
  new InitProduct("5004MB", "computer", "./assests/img/computer/Macbook Air 2020 M1 - Grey.jpg", "Macbook Air 2020 M1", "35000000"),
  new InitProduct("5105MB", "computer", "./assests/img/computer/Macbook Air 2020 - Silver.jpg", "Macbook Air 2020", "33000000"),
  new InitProduct("5206MB", "computer", "./assests/img/computer/Macbook Air 2020 - Grey.jpg", "Macbook Air 2020 Gray", "33000000"),
  new InitProduct("5307MB", "computer", "./assests/img/computer/Macbook Air 2020 - Gold.jpg", "Macbook Air 2020 Gold", "33000000"),
  new InitProduct("5401IM", "computer", "./assests/img/computer/iMac 24 2021 M1.jpg", "Imac", "44450000"),
  new InitProduct("5502IM", "computer", "./assests/img/computer/iMac 24 2021 M1-Xanh Nhạt.jpg", "Imac", "44450000"),
  new InitProduct("5603IM", "computer", "./assests/img/computer/iMac 24 2021 M1-Xanh Lục Bảo.jpg", "Imac", "44450000"),
  new InitProduct("5704IM", "computer", "./assests/img/computer/iMac 24 2021 M1-Tim.jpg", "Imac", "44450000"),
  new InitProduct("5805IM", "computer", "./assests/img/computer/iMac 24 2021 M1-Rose.jpg", "Imac", "44450000"),
  //**************************Imac******************************** 
  new InitProduct("5901LK", "LinhKien", "./assests/img/LinhKien/chuot-bluetooth-apple-mk2e3-trang-avatar-600x600.jpg", "Mouse", "2.500000"),
  new InitProduct("6204LK", "LinhKien", "./assests/img/LinhKien/tai-nghe-earpods-apple-md827fea-avatar-1-600x600.jpg", "Earphone", "700000"),
  new InitProduct("6305LK", "LinhKien", "./assests/img/LinhKien/bluetooth-airpods-2-apple-mv7n2-imei-ava-600x600.jpg", "AirPods 2", "3000000"),
  new InitProduct("6406LK", "LinhKien", "./assests/img/LinhKien/tai-nghe-bluetooth-airpods-pro-apple-mwp22-thumb-600x600.jpg", "AirPods Pro", "5500000"),
  new InitProduct("6507LK", "LinhKien", "./assests/img/LinhKien/bluetooth-airpods-max-apple-ava-600x600.jpg","AirPods Max", "12000000")
]
localStorage.setItem("listProduct", JSON.stringify(productArr));
function handleString(string){
  if(string.slice(2,) === "PM"){
    return "PM";
  }else if(string.slice(2,) === "PO"){
    return "PO";
  }else if(string.slice(2,) === "OO"){
    return "OO";
  }else if(string.slice(2,) === "MO"){
    return "MO";
  }else {
    return -1;
  }
}
let listTemp;
function innerProducts(brand, key = "NO"){
  let list = [];
  let code = handleString(key);
  JSON.parse(localStorage.getItem("listProduct")).forEach(function(value){
    if(value.brand === brand && key === "NO"){
      list.push(value);
    }else if(value.brand === brand){
      if(key.slice(0, 2) == value.productId.slice(2, 4)){
        if(code == -1){
          list.push(value);
        }else if(code === value.productId.slice(4, )){
          list.push(value);
        }
      }
    }
  });
  listTemp = list;
  dividePage(list);
  showContent(list);
  $('.slider').style.display = "block";
  $('.innerLable').style.display = "block";
  $('.page').style.display = "block";
}

function dividePage(arr){
  let pages = Math.ceil(arr.length / 8);
  let s = "";
  if(pages > 1){
    for(let i = 1; i <= pages;i++){
      s += `<li onclick="innerPage('${i}')">${i}</li>`;
      $('.page').innerHTML = `<ul>${s}</ul>`;
    }
  }else{
    $('.page').innerHTML = "";
  }
}
function innerPage(currentPage){
  let count = 0;
  let temp = [];
  let page = (currentPage - 1) * 8;
  for(let i = page;count < 8 && count < listTemp.length - page; i++){
    temp.push(listTemp[i]);
    count++;
  }
  showContent(temp);
}
function showContent(arr){
  let s = "";
  let count = 0;
  let header;
  if(arr[0].brand == "phone"){
    header = `
      <div class="lable">
        <h1>Iphone</h1>
      </div>
    `;
  }else if(arr[0].brand == "tablet"){
    header = `
      <div class="lable">
        <h1>Ipad</h1>
      </div>
    `;
  }else if(arr[0].brand == "computer"){
    header = `
      <div class="lable">
        <h1>Macbook</h1>
      </div>
    `;
  }else if(arr[0].brand == "LinhKien"){
    header = `
      <div class="lable">
        <h1>Phụ kiện</h1>
      </div>
    `;
  }
  for(let i = 0;count < 8 && count < arr.length;i++){
    s += `<div class="product-item"  onclick="innerDetail(this)">
            <div class="product-top">
                <img  class="product-thumb" src="${arr[i].img}" alt="">
                <a href="" class="product-name">${arr[i].name}</a>
            </div>
            <div class="product-info">
              <div class="product-price">${addDot(arr[i].price.split(""))} VND</div>
              <a href="#" onclick="confirmation(this)" data-set="${arr[i].productId}" class="buy-now">Mua ngay</a>
            </div>
          </div>
          `;
    count++;
  }
  $('.innerLable').innerHTML = header;
  $('.products').innerHTML = s;
  $('.products').classList.add('list');
}

function addDot(number){
  let j = 1;
  let s = "";
  let temp = "";
  for(let i = number.length-1;i >= 0;i--){
    if(j == 9){
      s+= number[i];
    }else if(j % 3 == 0){
      s += number[i] + '.';
    }else {
      s += number[i];
    }
    j++;
  }
  return s.split("").reverse().join("");
}
let flag = 0;
function confirmation(obj){ 
  flag = 1;
  if(currentAccount != null){
    let choice;
    let list = JSON.parse(localStorage.getItem('listProduct'));
    let temp = obj.getAttribute("data-set");
    list.forEach(function(value){
      if(temp === value.productId){
        choice = value;
      }
    })
    currentAccount.push(choice)
    localStorage.setItem('currentUser', JSON.stringify(currentAccount));
    innerChoice();
  }else {
    boardLogin.classList.remove('active');
  }
}
function saveProduct(obj){
  let choice;
  let list = JSON.parse(localStorage.getItem('listProduct'));
  let temp = obj.getAttribute("data-set");
  list.forEach(function(value){
    if(temp === value.productId){
      choice = value;
    }
  })
  currentAccount.push(choice)
  localStorage.setItem('currentUser', JSON.stringify(currentAccount));
}
function requireLogin(){
  let user = JSON.parse(localStorage.getItem('currentUser'))
  if(user !== null){
    innerChoice();
    // total();
  }else {
    boardLogin.classList.remove('active');
  }
}
function searchBox(){
  let tempSearch;
  let tempString;
  let tempArr = [];
  let i = 0, j = 0;
  $('#search').onchange = function(){
    tempSearch = this.value;
    // for(i = 0;i < productArr.length;i++){
    //   tempString = productArr[i].name.split(" ");
    //   for(j = 0;j < tempString.length;j++){
    //     if(tempSearch == tempString[j].toLowerCase()){
    //       tempArr.push(productArr[i]);
    //     }
    //   }
    // }
  }
  $('.icon-search').onclick = function(){
    tempSearch = tempSearch.split(" ");
    console.log(tempSearch);
    for(i = 0;i < productArr.length;i++){
      tempString = productArr[i].name.split(" ");
      for(j = 0;j < tempString.length;j++){
        tempSearch.forEach((value)=>{
          if(value == tempString[j].toLowerCase()){
            tempArr.push(productArr[i]);
          }
        });
      }
    }
    console.log(tempArr);
    listTemp = tempArr;
      
    dividePage(tempArr);
    showContent(tempArr);
    tempArr = [];
  }
}

function innerDetail(obj){
  if(flag == 0){
    let listTemp = [];
    let item;
    let code = obj.children[1].children[1].getAttribute("data-set");
    productArr.forEach((value)=>{
      if(code == value.productId){
        item = value;
      }
    })
    let string = `
    <section class="product-detail">
      <div class="product-content row">
        <div class="product-content-left row">
          <div class="product-content-left-big-img">
            <img src="${item.img}" alt="" />
          </div>
  
          <div class="product-content-left-small-img">
            <img src="./assests/img/phone/apple-iphone-13-pro-max.jpg" alt="" />
            <img src="./assests/img/phone/iphone-13-pro-max-silver.jpg" alt="" />
            <img src="./assests/img/phone/iphone-13-pro-max-gold.jpg" alt="" />
            <img src="./assests/img/phone/iphone-13-pro-max-graphite.jpg" alt="" />
          </div>
        </div>
        <div class="product-content-right">
          <div class="product-content-right-product-name">
            <h1>${item.name.toUpperCase()}</h1>
          </div>
  
          <div class="product-content-right-product-price">
            <p>${addDot(item.price.split(""))}<sup>đ</sup></p>
          </div>
  
          <div class="product-content-right-product-color">
            <span class="color">Màu sắc:</span><span>Xanh</span>
          </div>
          <div class="quantity">
            <p style="font-weight: bold">Số lượng:</p>
            <input type="number" min="0" value="1" />
          </div>
          <div class="product-content-right-product-button">
            <button onclick="saveProduct(this)" data-set="${item.productId}">
              <i class="fas fa-shopping-cart"></i>Thêm vào giỏ hàng
            </button>
            <button onclick="confirmation(this)" data-set="${item.productId}">Mua ngay</button>
          </div>
  
          <div class="product-content-right-bottom">
            <div class="product-content-right-bottom-top">&#8744;</div>
  
            <div class="product-content-right-bottom-content-big">
              <div class="product-content-right-bottom-content-title">
                <div
                  class="
                    product-content-right-bottom-content-title-item
                    chitiet
                  "
                >
                  <p>Chi tiết sản phẩm</p>
                </div>
                <div
                  class="
                    product-content-right-bottom-content-title-item
                    muahang
                  "
                >
                  <p>Chính sách thanh toán</p>
                </div>
              </div>
              <div class="product-content-right-bottom-content">
                <div class="product-content-right-bottom-content-chitiet">
                  <span class="detail">Màn hình:</span><span> OLED</span
                  ><br /><br />
                  <span Class="detail">Hệ điều hành:</span><span> IOS</span
                  ><br /><br />
                  <span Class="detail">Chip:</span><span> Apple </span
                  ><br /><br />
                  <span Class="detail">Pin:</span><span> Ion</span>
                </div>
                <div class="product-content-right-bottom-content-muahang">
                  <span class="detail">1. Thanh toán khi nhận hàng (COD)</span
                  ><br /><br /><span>
                    Quý khách có thể hoàn thành đặt mua hàng trên website
                    https://taoviet.vn , Với phương thức thanh toán này, quý
                    khách trả tiền mặt cho nhân viên giao hàng COD ngay khi
                    nhận được đơn hàng của mình. Chúng tôi chấp nhận hình thức
                    thanh toán khi nhận hàng (COD) cho tất cả các đơn hàng
                    trên toàn quốc.</span
                  ><br /><br />
  
                  <span class="detail"
                    >2. Thanh toán bằng tiền mặt tại cửa hàng</span
                  ><br /><br /><span
                    >Quý khách hàng có thể thanh toán bằng tiền mặt tại hệ
                    thống cửa hàng của Táo Việt hoặc Thanh toán cho nhân viên
                    giao nhận trước khi nhận hàng (đối với trường hợp giao
                    hàng tận nơi trong nội thành TpHCM).</span
                  ><br /><br />
  
                  <span class="detail">3. Thanh Toán bằng thẻ ngân hàng</span
                  ><br /><br /><span
                    >Áp dụng các thẻ ngân hàng nội địa, thẻ quốc tế hoặc các
                    loại thẻ tín dụng (Visa/ Mastercard) ...</span
                  ><br /><br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  `;
    $('.products').innerHTML = string;
    $('.slider').style.display = "none";
    $('.innerLable').style.display = "none";
    $('.page').style.display = "none";
    handleDetail();
  }
  flag = 0;
}
function handleDetail(){
	const bigImg = document.querySelector(".product-content-left-big-img img")
	const smallImg = document.querySelectorAll(".product-content-left-small-img img")
	smallImg.forEach(function (imgItem, X){
		imgItem.addEventListener("click", function () {
			bigImg.src = imgItem.src
		})
	})
	
	const chitiet = document.querySelector(".chitiet")
	const muahang = document.querySelector(".muahang")
	if (chitiet) {
		chitiet.addEventListener("click", function () {
			document.querySelector(".product-content-right-bottom-content-chitiet").style.display = "block"
			document.querySelector(".product-content-right-bottom-content-muahang").style.display = "none"
		})
	}
	if (muahang) {
		muahang.addEventListener("click", function () {
			document.querySelector(".product-content-right-bottom-content-chitiet").style.display = "none"
			document.querySelector(".product-content-right-bottom-content-muahang").style.display = "block"
		})
	}
	
	const butTon = document.querySelector(".product-content-right-bottom-top")
	if (butTon) {
		butTon.addEventListener("click", function () {
			document.querySelector(".product-content-right-bottom-content-big").classList.toggle("activeB")
		})
	}
}



textAnimation();
handleEvent();
checkRegister();
checkLogin();
renderAccount();
searchBox();