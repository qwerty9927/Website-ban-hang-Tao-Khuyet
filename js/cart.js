let listProduct = [];
let quantity;
function innerChoice(){
  let UserChoose = JSON.parse(localStorage.getItem('currentUser'));
  listProduct = UserChoose;
  let s = "";
  quantity = 0;
  let block = `
    <div class="cart-box">
      <div class="cart-content-top">
        <table>
        
        </table>
      </div>
      <div class="cart-content-bottom">
				<table>
					<tr>
							<th colspan="2">TỔNG TIỀN GIỎ HÀNG</th>
					</tr>
					<tr>
							<td>Tổng sản phẩm</td>
							<td class="sl"></td>
					</tr>
					<tr>
							<td>Tổng tiền hàng</td>
							<td><span class="tt"></span><sub> đ</sub></td>
					</tr>
					<tr>
          
							<td>Tạm tính</td>
							<td style="color: red;"><span class="tt"></span><sub> đ</sub></td>
					</tr>
				</table>
				<div class="cart-content-bottom-text">
					<p>Bạn sẽ được free ship khi đơn hàng của bạn có tổng giá trị trên 5.000.000đ</p>
					<p style="color: red; font-weight: bold">Bạn được free ship</p>
				</div>
				<div class="cart-content-bottom-button">
					<button id="home-page" onclick="goToHome()">Tiếp tục mua sắm</button>
					<button id="pay" onclick="pay()">Thanh toán</button>
				</div>
			</div>
    </div>
  `;
  let header = `
    <tr class="none-change">
      <th>Sản phẩm</th>
      <th>Tên sản phẩm</th>
      <th>Số lượng</th>
      <th>Thành tiền</th>
      <th>Xóa</th>
    </tr>
  `;
  for(let i = 1;i < UserChoose.length;i++){
    s += `
      <tr class="product">
        <td><img src="${UserChoose[i].img}" alt=""></td>
        <td><p>${UserChoose[i].name}</p></td>
        <td>
          <button onclick="innerValue2('+', ${i})">+</button>
          <input class="number-box2" type="text" value="${UserChoose[i].sl}">
          <button onclick="innerValue2('-', ${i})">-</button>
        </td>
        <td><p>${addDot(UserChoose[i].price.split(""))} <sub> đ</sub></p></td>
        <td class="trash"><button onclick="deleteChoice(this)" data-set = ${i}><i class="fas fa-trash-alt"></i></button></td>
      </tr>
    `;
    quantity += parseInt(UserChoose[i].sl);
  }
  header += s;
  $('.products').innerHTML = block;
  $('.slider').style.display = "none";
  $('.innerLable').style.display = "none";
  $('.page').style.display = "none";
  $('.cart-box table').innerHTML = header;
  total();
}

function deleteChoice(obj){
  if(confirm('Bạn có muốn xóa sản phẩm này?')){
    for(let i = parseInt(obj.getAttribute("data-set"));i < listProduct.length;i++){
      listProduct[i] = listProduct[i + 1];
    }
    listProduct.pop();
    localStorage.setItem('currentUser', JSON.stringify(listProduct));
    innerChoice();
    
  }
}

function innerValue2(char, i){
  let number2 = parseInt(listProduct[i].sl);
  if(char === '+'){
    number2++;
    quantity++;
  } else {
    number2--;
    if(number2 > 0){
      quantity--;
      console.log(quantity);
    }
  }
  if(number2 <= 0){
    number2 = 1;
  }
  listProduct[i].sl = number2;
  $$('.number-box2').forEach((element, index) => {
    if(index == i-1){
      element.value = number2;
    }
  })
  total();
}

let totalValue;
function total(){
  totalValue = 0;
  for(let i = 1;i < listProduct.length;i++){
    totalValue += parseInt(listProduct[i].price) * parseInt(listProduct[i].sl);
  }
  $$('.tt').forEach(function(value){
    value.innerHTML = `${addDot(totalValue.toString().split(""))}`;
  })
  $('.sl').innerHTML = quantity;
  localStorage.setItem('currentUser', JSON.stringify(listProduct));
}

function goToHome(){
  location.href = './index.html';
}

function pay(){
  let temp = JSON.parse(localStorage.getItem('productSold')) || [];
  let temp2 = JSON.parse(localStorage.getItem('currentUser'));
  let [a] = temp2;
  let list = [a.id];
  for(let i = 1;i < listProduct.length;i++){
    list.push(listProduct[i]);
  }
  list.push(totalValue);
  temp.push(list);
  localStorage.setItem('productSold', JSON.stringify(temp));
  // let user = JSON.parse(localStorage.getItem('currentUser'));
  localStorage.setItem('currentUser', JSON.stringify([listProduct[0]]));

  // $('.cart-box table tr:not(.none-change)').innerHTML = "";
  $$('.cart-box table .product').forEach(value => {
    value.innerHTML = "";
  });
  $$('.tt').forEach(function(value){
    value.innerHTML = 0;
  })
  $('.sl').innerHTML = 0;
}

function previewCart(){
  let temp = JSON.parse(localStorage.getItem('productSold')) || [];
  let temp2 = JSON.parse(localStorage.getItem('currentUser'));
  let [a] = temp2;
  let s = "";
  let block = `
    <div class="cart-box">
      <div class="cart-content-top">
        <table>
        
        </table>
      </div>
    </div>  
  `;
  let header = `
    <tr class="none-change">
      <th>Sản phẩm</th>
      <th>Tên sản phẩm</th>
      <th>Số lượng</th>
      <th>Thành tiền</th>
      <th>Trạng thái</th>
    </tr>
  `;
  for(let i = 0;i < temp.length;i++){
    if(temp[i][0] == a.id){
      for(let j = 1;j < temp[i].length - 1;j++){
        console.log(temp[i][temp[i].length-1]);
        
        s += `
          <tr class="product">
            <td><img src="${temp[i][j].img}" alt=""></td>
            <td><p>${temp[i][j].name}</p></td>
            <td>${temp[i][j].sl}</td>
            <td><p>${addDot(temp[i][temp[i].length-1].toString().split(""))} <sub> đ</sub></p></td>
            <td class="status">Chờ xử lý</td>
          </tr>
        `;
      }
    }
  }
  console.log(s);
  // header += s;
  // $('.products').innerHTML = block;
  // $('.slider').style.display = "none";
  // $('.innerLable').style.display = "none";
  // $('.page').style.display = "none";
  // $('.cart-box table').innerHTML = header;
}