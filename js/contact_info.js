//Trang liên hệ
function innerContact(){
	let s = `
		<div class="contact">
		 	<div class="input-contact">
		 		<h3>Táo khuyết hân hạnh phục vụ</h3>
		 		<input type="text" placeholder="Họ tên">
		 		<input type="text" placeholder="Email">
		 		<textarea name="" placeholder="Nội dung" id="" rows="5"></textarea>
		 		<button>Send</button>
		 	</div>
		 	<div class="contact-content">
		 		<div class="content">
		 			<p>Tổng đài tư vấn, hỗ trợ khách hàng (7h30 đến 22h): 1800.0000 hoặc 028.0000.1234</p>
		 			<p>Tổng đài khiếu nại: 1800.0000</p>
		 			<p>Email: tanvo9927@gamil.com</p>
		 		</div>
		 		<div class="map">
		 			<img src="./assests/img/map.jpg" alt="">
		 		</div>
		 	</div>
		</div>
	`;

	$('.products').innerHTML = s;
  $('.slider').style.display = "none";
  $('.innerLable').style.display = "none";
  $('.page').style.display = "none";
}

//Trang giới thiệu
function innerInfo(){
	let s = `
		<div class="information">
			<div class="about-web">
				<h2>Thông tin cửa hàng Táo Khuyết</h2>
				<p>Cửa hàng chuyên cung cấp đầy đủ mọi sản phẩm đến từ Apple</p>
				<p>Cam kết chất lượng</p>
				<p> - Cam kết máy bán ra đúng như mô tả;</p>
				<p> - Cam kết bảo hành uy tín, nghiêm chỉnh;</p>
				<p> - Cam kết đem lại sự hài lòng tuyệt đối về giá cũng như dịch vụ cho khách hàng;</p>
			</div>
			<div class="support">
				<h2>Chính sách bảo hành</h2>
				<div class="bg-support">
					<p><i class="fab fa-apple" style="transform: translateY(-2px)"></i> Get Support form Táo Khuyết</p>
				</div>
				<div class="care">
					<div class="img-care">
						<img src="./assests/img/applecare-products_2x.png" alt="">
					</div>
					<div class="content-care">
						<p> - Bảo hành 12 tháng, đổi mới ngay trong suốt thời gian bảo hành nếu phát sinh lỗi NSX</p>
						<p> - Bảo hành 12 tháng đối với máy các dòng máy khác.</p>
						<p> - Cam kết với máy mới: Fullbox chưa active, phụ kiện nguyên bản</p>
						<p> - Khuyến mại dán cường lực màn hình với mọi máy bán ra. Ngoài ra tặng ốp chống shock.</p>
					</div>
				</div>
			</div>
		</div>
	`;

	$('.products').innerHTML = s;
  $('.slider').style.display = "none";
  $('.innerLable').style.display = "none";
  $('.page').style.display = "none";
}