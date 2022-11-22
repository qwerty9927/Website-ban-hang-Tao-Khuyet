const $ = document.querySelector.bind(document);
const table = $('#table');
const form = $('.form');
//card-info
const countData = {
  dataProduct: function(){
    return JSON.parse(localStorage.getItem('listProduct')) || []
  },
  dataUser: function(){
    return JSON.parse(localStorage.getItem('dataUser')) || []
  },
  countUser: function(){
    let count = 0;
    for(let i of this.dataUser()){
      count ++;
    }
    return count;
  },
  countProduct: function(){
    let count = 0;
    for(let i of this.dataProduct()){
      count ++;
    }
    return count;
  },
  rederQuatity: function(){
    $('.consumer .inner span').innerHTML = this.countUser();
    $('.products .inner span').innerHTML = this.countProduct();
  },
}
countData.rederQuatity();

//add-update-delete-user
let arr = JSON.parse(localStorage.getItem('dataUser')) || [];
let formData = {
  user: "",
  fullName: "",
  address: "",
  phoneNumber: "",
  pass: "",
  userType: ""
}
let inputUser = `
        <form id="">
          <div class="board active">
            <div class="left-board">
              <label class="title">Register</label>
              <div class="form-input">
                <label class="space-tb">User</label>
                <input type="text" id="user">
              </div>
              <div class="form-input">
                <label class="space-tb">FullName</label>
                <input type="text" id="full-name">
              </div>
              <div class="form-input">
                <label class="space-tb">Address</label>
                <input type="text" id="address" required>
                <span></span>
              </div>
              <div class="form-input">
                <label class="space-tb">Phone number</label>
                <input type="text" id="phone-number" required>
                <span></span>
              </div>
              <div class="form-input">
                <label class="space-tb">Password</label>
                <input type="password" id="password" required>
              </div>
              <div class="form-input">
                <label class="space-tb">UserType</label>
                <input type="text" id="userType">
              </div>
              <div class="bot-board">
                <input type="submit" value="Add">
              </div>
              <div class="btn-close btn">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>
        </form>
`;
function deleteAcc(obj){
  if(confirm('Bạn có muốn xóa tài khoản này?')){
    for(let i = parseInt(obj.getAttribute("data-set"));i < arr.length;i++){
      arr[i] = arr[i + 1];
    }
    arr.pop();
    localStorage.setItem('dataUser', JSON.stringify(arr));
    innerUser();
    countData.countUser();
    countData.rederQuatity();
  }
}

function updateAcc(obj){
  const btnSubmit = $('.bot-board input');
  const board = $('.board');
  let user = $('#user');
  let fullName = $('#full-name');
  let address = $('#address');
  let phoneNumber = $('#phone-number');
  let pass = $('#password');
  let userType = $('#userType');
  let n = obj.getAttribute("data-set");
  board.classList.remove('active');
  $('.title').innerHTML = "Update";
  btnSubmit.value = "Update";
  user.value = arr[n].user;
  fullName.value = arr[n].fullName;
  address.value = arr[n].address;
  phoneNumber.value = arr[n].phoneNumber;
  pass.value = arr[n].pass;
  userType.value = arr[n].userType;
  btnSubmit.onclick = ()=>{
    formData.user = user.value,
    formData.fullName = fullName.value,
    formData.address = address.value,
    formData.phoneNumber = phoneNumber.value,
    formData.pass = pass.value,
    formData.userType = userType.value
    arr[n] = formData;
    localStorage.setItem('dataUser', JSON.stringify(arr));
    board.classList.add('active');
    innerUser();
  }
}

function addAcc(){
  const btnSubmit = $('.bot-board input');
  const board = $('.board');
  let user = $('#user');
  let fullName = $('#full-name');
  let address = $('#address');
  let phoneNumber = $('#phone-number');
  let pass = $('#password');
  let userType = $('#userType');
  board.classList.remove('active');
  $('.title').innerHTML = "Add";
  btnSubmit.value = "Add";
  btnSubmit.onclick = ()=>{
    formData.user = user.value;
    formData.fullName = fullName.value;
    formData.address = address.value;
    formData.phoneNumber = phoneNumber.value;
    formData.pass = pass.value;
    formData.userType = userType.value == "" ? "consumer": userType.value;
    arr.push(formData);
    localStorage.setItem('dataUser', JSON.stringify(arr));
    board.classList.add('active');
    innerUser();
    countData.countUser();
    countData.rederQuatity();
  }
}

function innerUser(){
  $('.form').innerHTML = inputUser;
  $('.button').innerHTML = `<button onclick="addAcc()">Add</button>`;
  dividePageUser(arr);
  showContentUser(arr, 0);
  handleEvent();
}

function dividePageUser(arr){
  let pages = Math.ceil(arr.length / 6);
  let s = "";
  if(pages > 1){
    for(let i = 1; i <= pages;i++){
      s += `<li onclick="innerPageUser('${i}')">${i}</li>`;
      $('.page').innerHTML = `<ul>${s}</ul>`;
    }
  }else {
    $('.page').innerHTML = "";
  }
}

function innerPageUser(currentPage){
  let count = 0;
  let temp = [];
  let quantity = (JSON.parse(currentPage) - 1) * 6;
  for(let i = quantity;count < 6 && count < arr.length - quantity; i++){
    temp.push(arr[i]);
    count++;
  }
  showContentUser(temp, quantity);
}

function  showContentUser(arr, quantity){
  let s = "";
  let count = 0;
  let listData = 
    `<tr>
      <th style="width: 5%">Stt</th>
      <th style="width: 10%">User</th>
      <th style="width: 20%">Name</th>
      <th style="width: 20%">Address</th>
      <th style="width: 10%">Phone Number</th>
      <th style="width: 15%">Password</th>
      <th style="width: 10%">Usertype</th>
      <th style="width: 5%">Remove</th>
      <th style="width: 5%">Update</th>
    </tr>`;
  
  for(let i = 0;count < 6 && count < arr.length;i++){
    s += `<tr>
            <td>${quantity+i+1}</td>
            <td>${arr[i].user}</td>
            <td>${arr[i].fullName}</td>
            <td>${arr[i].address}</td>
            <td>${arr[i].phoneNumber}</td>
            <td>${arr[i].pass}</td>
            <td>${arr[i].userType}</td>
            <td class="edit"><button onclick="updateAcc(this)" data-set = ${quantity+i}><i class="fas fa-edit"></i></button></td>
            <td class="trash"><button onclick="deleteAcc(this)" data-set = ${quantity+i}><i class="fas fa-trash-alt"></i></button></td>
          </tr>
          `;
    count++;
  }
  listData += s;
  table.innerHTML = `<table>${listData}</table>`;
}

//add-update-delete-product
let arrProduct = JSON.parse(localStorage.getItem('listProduct')) || [];
let formProduct = {
  productId: "",
  brand: "",
  img: "",
  name: "",
  price: ""
}
{/*  */}

let inputProduct = `
            <div class="board active">
              <div class="left-board">
                <label class="title">Product</label>
                <div class="form-input">
                  <label class="space-tb">Loại sản phẩm</label>
                  <select id="brand">
                    <option value="">Select</option>
                    <option value="phone">Phone</option>
                    <option value="tablet">Tablet</option>
                    <option value="computer">Computer</option>
                    <option value="LinhKien">Phụ kiện</option>
                  </select>
                </div>
                <div class="form-input option-phone" style="display: none">
                  <label class="space-tb">Loại</label>
                  <select id="brand-option">
                    <option value="">Select</option>
                    <option value="11OO">Iphone 11</option>
                    <option value="11PO">Iphone 11 pro</option>
                    <option value="11PM">Iphone 11 pro max</option>
                    <option value="12OO">Iphone 12</option>
                    <option value="12PO">Iphone 12 pro</option>
                    <option value="12PM">Iphone 12 pro max</option>
                    <option value="13OO">Iphone 13</option>
                    <option value="13PO">Iphone 13 pro</option>
                    <option value="13PM">Iphone 13 pro max</option>
                  </select>
                </div>
                <div class="form-input">
                  <label class="space-tb">Tên sản phẩm</label>
                  <input type="text" id="name" required>
                  <span></span>
                </div>
                <div class="form-input">
                  <label class="space-tb">Giá sản phẩm</label>
                  <input type="text" id="price" required>
                  <span></span>
                </div>
                <div class="form-input">
                  <label class="space-tb">Hình ảnh</label>
                  <input style="border: none" type="file" id="image" accept="image/png, image/jpeg">
                </div>
                <div class="bot-board">
                  <input type="submit" value="Add">
                </div>
                <div class="btn-close btn">
                  <i class="fas fa-times"></i>
                </div>
              </div>
            </div>
`;

window.onload= (e) => {
 
}

function deleteProduct(obj){
  if(confirm('Bạn có muốn xóa sản phẩm này?')){
    for(let i = parseInt(obj.getAttribute("data-set"));i < arrProduct.length;i++){
      arrProduct[i] = arrProduct[i + 1];
    }
    arrProduct.pop();
    localStorage.setItem('listProduct', JSON.stringify(arrProduct));
    innerProducts();
    countData.countUser();
    countData.rederQuatity();
  }
}


const validateUpdate = (tmpName,tmpPrice) =>{
  const regrex = new RegExp('^[0-9]{1,9}$');
    if(tmpName.value == ""){
      alert("Vui lòng nhập tên sp ")
      tmpName.focus();
      return false;
    }  
    if(tmpPrice.value == ""){
      alert("Vui lòng nhập giá sp ")
      tmpPrice.focus();
      return false;
    }  
  
    if(regrex.test(tmpPrice.value)==false){
      alert("Giá sản phẩm ko hợp lệ");
      tmpPrice.focus();
      return false;
    }
  return true
}

function updateProduct(obj){
  const btnSubmit = $('.bot-board input');
  const board = $('.board');
  let brand = $('#brand');
  let name = $('#name');
  let image = $('#image');
  let price = $('#price');
  let n = parseInt(obj.getAttribute("data-set"))
  board.classList.remove('active');
  $('.title').innerHTML = "Update";
  btnSubmit.value = "Update";
  name.value = arrProduct[n].name;
  price.value = arrProduct[n].price;
  brand.closest('.form-input').style.display = "none"
  btnSubmit.onclick = ()=>{
    if(validateUpdate(name,price)){
      formProduct.productId = arrProduct[n].productId
      formProduct.brand = arrProduct[n].brand
      formProduct.name = name.value;
      formProduct.img = image.value.replace("C:\\fakepath\\", `./assests/img/${formProduct.brand}/`) || arrProduct[n].img;
      formProduct.price = price.value;
      arrProduct[n] = {...formProduct};
      localStorage.setItem('listProduct', JSON.stringify(arrProduct));
      board.classList.add('active');
      innerProducts();
      return true;
    }
    else
      return false;
  }
}


const validate = (tmpBrandOption,tmpBrand,tmpName,tmpPrice) =>{
  const regrex = new RegExp('^[0-9]{1,9}$');
    
    if(tmpBrand.value== ""){
      alert("Vui lòng chọn loại sp ")
      tmpBrand.focus();
      return false;
    }
    if(tmpBrandOption.value== "" && tmpBrand.value == "phone"){
      alert("Vui lòng chọn loại ")
      tmpBrand.focus();
      return false;
    }
    if(tmpName.value == ""){
      alert("Vui lòng nhập tên sp ")
      tmpName.focus();
      return false;
    }  
    if(tmpPrice.value == ""){
      alert("Vui lòng nhập giá sp ")
      tmpPrice.focus();
      return false;
    }  
    if(regrex.test(tmpPrice.value)==false){
      alert("Giá sản phẩm ko hợp lệ");
      tmpPrice.focus();
      return false;
    }
    return true;
}

function addProduct(){
  let Product = {
    productId: "",
    brand: "",
    img: "",
    name: "",
    price: ""
  }
  const btnSubmit = $('.bot-board input');
  const board = $('.board');
  let brand = $('#brand');
  let brandOption = $('#brand-option');
  let name = $('#name');
  let image = $('#image');
  let price = $('#price');
  name.value = ""
  image.value = ""
  price.value = ""
  board.classList.remove('active');
  $('.title').innerHTML = "Add";
  btnSubmit.value = "Add";
  brand.closest('.form-input').style.display = "flex"
  brand.onchange = ()=>{
    const data = countData.dataProduct()
    const numbericalOrder = parseInt(data[data.length - 1].productId.slice(0, -4)) + 1
    if(brand.value === "phone"){
      document.querySelector('.option-phone').style.display = "flex"
      brandOption.onchange = (e) => {
        Product.productId = numbericalOrder + e.target.value
        console.log(Product)
      }
    } else {
      document.querySelector('.option-phone').style.display = "none"
    }
    switch(brand.value){
      case "tablet":
        Product.productId = numbericalOrder + "00IP"
        break
      case "computer":
        Product.productId = numbericalOrder + "00MB"
        break
      case "LinhKien":
        Product.productId = numbericalOrder + "00LK"
        break
    }
    Product.brand = brand.value;
    console.log(Product)
  }
  btnSubmit.onclick = ()=>{
    if(validate(brandOption,brand,name,price)){
      // Product.productId = productId.value;    
      Product.name = name.value;
      Product.img = image.value.replace("C:\\fakepath\\", `./assests/img/${Product.brand}/`);
      Product.price = price.value;
      arrProduct.push(Product);
      localStorage.setItem('listProduct', JSON.stringify(arrProduct));
      board.classList.add('active');
      innerProducts();
      countData.countUser();
      countData.rederQuatity();
      return true;
    }
    else
    return false;
  }
}

function innerProducts(){
  $('.form').innerHTML = inputProduct;
  $('.button').innerHTML = `<button onclick="addProduct()">Add</button>`;
  dividePageProduct(arrProduct);
  showContentProduct(arrProduct,0);
  handleEvent();
}
function dividePageProduct(arr){
  let pages = Math.ceil(arr.length / 6);
  let s = "";
  if(pages > 1){
    for(let i = 1; i <= pages;i++){
      s += `<li onclick="innerPageProduct('${i}')">${i}</li>`;
      $('.page').innerHTML = `<ul>${s}</ul>`;
    }
  }else {
    $('.page').innerHTML = "";
  }
}
function innerPageProduct(currentPage){
  let count = 0;
  let temp = [];
  let quantity = (JSON.parse(currentPage) - 1) * 6;
  for(let i = quantity;count < 6 && count < arrProduct.length - quantity; i++){
    temp.push(arrProduct[i]);
    count++;
  }
  showContentProduct(temp,quantity);
}
function showContentProduct(arr, quantity){
  let s = "";
  let count = 0;
  let listData = 
  `<tr>
    <th style="width: 5%">Stt</th>
    <th style="width: 10%">ProductId</th>
    <th style="width: 10%">Brand</th>
    <th style="width: 35%">Name</th>
    <th style="width: 15%">Image</th>
    <th style="width: 15%">Price</th>
    <th style="width: 5%">Update</th>
    <th style="width: 5%">Remove</th>
  </tr>`;
  
  for(let i = 0;count < 6 && count < arr.length;i++){
    s += `<tr>
            <td>${quantity+i+1}</td>
            <td>${arr[i].productId}</td>
            <td>${arr[i].brand}</td>
            <td>${arr[i].name}</td>
            <td><img src="${arr[i].img}"></td>
            <td>${arr[i].price}</td>
            <td class="edit"><button onclick="updateProduct(this)" data-set = ${quantity+i}><i class="fas fa-edit"></i></button></td>
            <td class="trash"><button onclick="deleteProduct(this)" data-set = ${quantity+i}><i class="fas fa-trash-alt"></i></button></td>
          </tr>
          `;
    count++;
  }
  listData += s;
  table.innerHTML = `<table>${listData}</table>`;
}

function handleEvent(){
  const board = $('.board'); 
  $('.btn').onclick = ()=>{
    board.classList.remove('active');
  }
  $('.btn').onclick = ()=>{
    board.classList.add('active');
  }
}

function innerRevenue(){
  let string = `
      <select name="" id="choice">
        <option value="">Select</option>
        <option value="iphone">Iphone</option>
        <option value="ipad">Ipad</option>
        <option value="computer">Computer</option>
        <option value="Linhkien">Phụ kiện</option>
      </select>
  `;
  
  $('.button').innerHTML = string;
}