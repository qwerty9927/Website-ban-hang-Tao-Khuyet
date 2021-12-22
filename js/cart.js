let listProduct = [];
function innerChoice(){
  let UserChoose = JSON.parse(localStorage.getItem('currentUser'));
  listProduct = UserChoose;
  let s = "";
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
        <td><input type="number" value="1" min="1" onchange="tempValue(this)"></td>
        <td><p>${addDot(UserChoose[i].price.split(""))} <sub> đ</sub></p></td>
        <td class="trash"><button onclick="deleteChoice(this)" data-set = ${i}><i class="fas fa-trash-alt"></i></button></td>
      </tr>
    `;
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

let quantity;
function total(){
  let totalValue = 0;
  quantity = listProduct.length - 1;
  for(let i = 1;i < listProduct.length;i++){
    totalValue += parseInt(listProduct[i].price);
  }
  $$('.tt').forEach(function(value){
    value.innerHTML = `${addDot(totalValue.toString().split(""))}`;
  })
  $('.sl').innerHTML = quantity;
}

function goToHome(){
  location.href = './index.html';
}

function pay(){
  let temp = JSON.parse(localStorage.getItem('productSold')) || [];
  for(let i = 1;i < listProduct.length;i++){
    temp.push(listProduct[i]);
  }
  localStorage.setItem('productSold', JSON.stringify(temp));
  // let user = JSON.parse(localStorage.getItem('currentUser'));
  localStorage.setItem('currentUser', JSON.stringify([listProduct[0]]));

  $('.cart-box table tr:not(.none-change)').innerHTML = "";
  $$('.tt').forEach(function(value){
    value.innerHTML = 0;
  })
  $('.sl').innerHTML = 0;
}