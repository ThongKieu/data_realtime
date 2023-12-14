  <div class="containerContact">
    <div class="gridContactLeft">
      <h3>Tư Vấn - Báo Giá - Đặt Lịch Ngay</h3>
      <form action="" id="orderForm" method="post">
        <div class="contactWork">
          <div class="workCont">
            <label class="yccv">Yêu cầu công việc<span class="required "
                style="float: none !important;">(*)</span></label>
            <br>
            <input class="inputText" type="text" name="cvCont" id="cvCont" required
              placeholder='Ví dụ: Vệ sinh máy lạnh, sửa máy giặt,...'>
          </div>
          <div class="namePro">
            <label class="ten">Họ Và Tên</label>
            <input class="inputText" type="text" name="tenCont" id="tenCont" placeholder='Nguyễn Văn A'>
          </div>
        </div>
        <div class="contactWork">
          <div class="workCont">
            <label>Số điện thoại<span class="required " style="float: none !important;">(*)</span></label>
            <input class="inputTel" type="tel" name="sdtCont" id="sdtCont" maxlength="11"
              onkeypress="return onlyNumberKey(event)" placeholder="VD: 0915 269 839" required>
          </div>
          <div class="namePro">
            <label>Ngày làm<span class="required " style="float: none !important;">(*)</span></label>
            <input type="date" class="inputDate" name="dateCont" id="dateCont" placeholder="dd-mm-yyyy"
              required>
          </div>

        </div>
        <div class="contactWork">
          <div class="workCont">
            <label class="spanDiaChi">Địa Chỉ<span class="required " style="float: none !important;">(*)</span></label>
            <input type="text" class="inputText" name="diaChiCont" placeholder="Số nhà, tên đường" id="diaChiCont"
              required>
          </div>
          <div class="namePro">
            <label>Quận, Huyện<span class="required " style="float: none !important;">(*)</span></label> <br>
            <select id="qCont" required>
              <option value="">Chọn</option>
              <option value="Quận 1"> Quận 1</option>
              <option value="Quận 3"> Quận 3</option>
              <option value="Quận 4"> Quận 4</option>
              <option value="Quận 5"> Quận 5</option>
              <option value="Quận 6"> Quận 6</option>
              <option value="Quận 7"> Quận 7</option>
              <option value="Quận 8"> Quận 8</option>
              <option value="Quận 10"> Quận 10</option>
              <option value="Quận 11"> Quận 11</option>
              <option value="Quận 12"> Quận 12</option>
              <option value="TP Thủ Đức">Thành phố Thủ Đức</option>
              <option value="Bình Tân">Quận Bình Tân</option>
              <option value="Bình Thạnh">Quận Bình Thạnh</option>
              <option value="Gò Vấp"> Quận Gò Vấp</option>
              <option value="Phú Nhuận">Quận Phú Nhuận</option>
              <option value="Tân Bình">Quận Tân Bình</option>
              <option value="Tân Phú">Quận Tân Phú</option>
              <option value="Bình Chánh">Huyện Bình Chánh</option>
              <option value="Cần Giờ">Huyện Cần Giờ</option>
              <option value="Củ Chi"> Huyện Củ Chi</option>
              <option value="Hooc Môn">Huyện Hóc Môn</option>
              <option value="Nhà Bè"> Huyện Nhà Bè</option>
              <option value="Dĩ An"> Dĩ An - Bình Dương</option>
              <option value="Thuận An">Thuận An - Bình Dương</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>
        <div class="noteOrder">
          <label>Ghi Chú<span class="required " style="float: none !important;"></span></label>
          <input type="text" class="inputText" name="ghiChuCont " id="ghiChuCont" placeholder="VD: Mang thang cao,...">
        </div>
        <div class="buttonSubmit" style="text-align: center; ">
          <button class="buttonItem" style="width: 50%;" type="submit">Đặt Lịch</button>
        </div>
        <div class="notice" style=" padding: 0 10px;"><span class="noticeRed">(**)</span><span><b>Thợ Việt sẽ liên hệ
              lại Khách Hàng ngay từ 07h đến 17h. Nếu Khách Hàng đặt lịch ngoài giờ làm việc, Thợ Việt sẽ liên hệ xác
              nhận vào sáng mai hoặc vào ngày Khách Hàng yêu cầu thực hiện.</b></span></div>
      </form>
    </div>
    <div class="gridContactRight" style="word-wrap: break-word;">
      <div class="contentContactRight">
        <h3 style="text-align: center; background-color:#3d89f8; color: white ">THỢ VIỆT ĐÃ TIẾP NHẬN VÀ XỬ LÝ</h3>
        <div
          style="color:black; margin: auto; margin-top: 5px; width: fit-content; height: 620px; border-radius: 15px;  justify-content: space-between; overflow: hidden; z-index: 1; background-color: white">
           <marquee direction="up" height="100%" data-speed="100" scrollamount="10" hspace="15px" vspace="0%" class="card1" id='output1'></marquee>
        </div>
      </div>
    </div>
  </div>

  <!-- comment  -->
  <section class="formCmtNew" style="width: 100%; margin: auto; background-color: white; padding: 15px;">
    <form id="formCmtTV" action="" method="GET" enctype="multipart/form-data">
      <h4 class="headCmtFormNew">Bình Luận</h4>
      <hr style="margin-bottom:25px;">
      <div id="infoCmtNew">
        <div class="gridCmtNew">
          <div class="grid-item-cmtNew">
            <input type="text" name="name" id="fullName" class="form-controlFixNew" placeholder=" "
              style="background-color: white;"  required>
            <label class="labelFieldNew" for="name">Tên (<span class="noticeRed">*</span>)</label>
          </div>
          <div class="grid-item-cmtNew">
            <input type="number" name="sdt" id="sdt" class="form-controlFixNew" placeholder=" "
              style="background-color: white;" maxlength="11" onkeypress="return onlyNumberKey(event)" required>
            <label class="labelFieldNew" for="name">Số điện thoại (<span class="noticeRed">*</span>)</label>
          </div>
        </div>
        <div class="textarea-cmtNew">
          <textarea name="msg" id="textAreaCmt" msg cols="30" rows="1" class="form-controlFixTextareaNew resize-ta"
            style="background-color: white; overflow: hidden;" placeholder=" " required></textarea>
          <label class="labelFieldTextareaNew" for="message">Nội dung (<span class="noticeRed">*</span>)</label>
        </div>
        <div class="imgUploadNew">
          <div class="imgUpLeftNew">
            <label for="image_uploads">Tải ảnh lên</label>
            <input style="display: none;" type="file" class="file-inputNew" id="image_uploads" name="image_uploads"
              accept=".jpg, .jpeg, .png" multiple style="opacity:0" />
          </div>
 <div class="imgUpRightNew">
            <div class="previewNew"></div>
          </div> 
        </div>
        <div class="formBtnCmtNew">
          <button type="submit" id="postcmt" class="formBtn-CmtNew" style="font-size: 13px; padding: 0px 10px;">Bình
            Luận</button>
        </div>
      </div>
    </form>
    
  </section>
 <script src="https://code.jquery.com/jquery-2.2.4.min.js"
        integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"
    integrity="sha512-AA1Bzp5Q0K1KanKKmvN/4d3IRKVlv9PYgwFPvm32nPO6QS8yH1HO7LbgB1pgiOxPtfeg5zEn2ba64MUcqJx6CA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script>
    config = {
      enableTime: false,
      dateFormat: "d-m-Y",
      minDate: "today"
    }
    flatpickr("input[type = datetime-local]", config);
    function onlyNumberKey(evt) {
      // Only ASCII character in that range allowed
      var ASCIICode = (evt.which) ? evt.which : evt.keyCode
      if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
      return true;
    }
    const form = document.getElementById('orderForm');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const data1 = {
        yccvCont: document.getElementById('cvCont').value,
        tenCont: document.getElementById('tenCont').value,
        sdtCont: document.getElementById('sdtCont').value,
        quanCont: document.getElementById('qCont').value,
        diaChiCont: document.getElementById('diaChiCont').value,
        dateCont: document.getElementById('dateCont').value,
        ghiChuCont: document.getElementById('ghiChuCont').value,
        from_cus: 1,
        cus_from_page: "(thoviet.com.vn)"
      }

      try {
        const res = await fetch('https://data.thoviet.com/api/addWorkWeb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(data1),
        })

        if (res.status !== 200) {
          const err = new Error("Error")
          throw err;
        }
        swal({
          title: "Đặt lịch thành công",
          icon: "success",
          closeOnClickOutside: false,
          buttons: {
            confirm: true,
          },
        }).then(() => { window.location.reload() })
      } catch (error) {
        console.log(error);
      }
    });
    const ul2 = document.getElementById('output1');
    const list = document.createDocumentFragment();
   
    const url = 'https://data.thoviet.com/api/list_work_show';
    function load() {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
        }
      }).then((response) => {
        return response.json();
      }).then((data) => {
        let authors = data;
        authors.map(function (author) {
          const divItem = document.createElement('div');
          divItem.innerHTML = `
						<span ><b style="color:#0619f9;">${author.work_content}</b><br>${author.work_name_cus} - ${author.work_distric} <br><b>${author.work_phone} </b></span>
						<hr>
                    `;
          ul2.appendChild(divItem);
        });
      }).catch(function (error) {
        console.log(error);
      });
    }
    // output1.appendChild(list);
    // console.log(list);
    load();
    function calcHeight(value) {
      let numberOfLineBreaks = (value.match(/\n/g) || []).length;
      let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
      return newHeight;
    }
    let textarea = document.querySelector(".resize-ta");
    textarea.addEventListener("keyup", () => {
      textarea.style.height = calcHeight(textarea.value) + "px";
    });
    // --function comment
    
    const btnSubmitCmt = document.querySelector('.formBtn-CmtNew');
   
    const fullNameCmt = document.querySelector('#fullName');
    const numberPhone = document.querySelector('#sdt');
    const textareaCmtEl = document.querySelector('#textAreaCmt');
    const image_uploadsCmt = document.querySelector('#image_uploads');
    const formCmt = document.getElementById('formCmtTV');
    formCmt.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formDataCmt = new FormData();
      formDataCmt.append('name_comment', document.getElementById('fullName').value);
      formDataCmt.append('phone_comment', document.getElementById('sdt').value);
      formDataCmt.append('comment', document.getElementById('textAreaCmt').value);
      formDataCmt.append('img_comment', document.getElementById('image_uploads').files[0]);
      formDataCmt.append('new_convertition', 1);

      try {
        const res = await fetch('https://data.thoviet.com/api/newConver', {
          method: 'POST',
          body: formDataCmt,
        })

        if (res.status !== 200) {
          const err = new Error("Error")
          throw err;
        }
        const data = await res.json()
		    window.open('https://thoviet.com.vn/binh-luan-tho-viet.html','_blank');

      } catch (error) {
        console.log(error);
      }
    });
    // const d = document.getElementById('text123').value
    async function handleReply(e, id) {
      e.preventDefault();
      console.log("kiem tra", id);
      const formDataReply = new FormData();
      formDataReply.append('name_comment', document.getElementById(`fullNameReply${id}`).value);
      formDataReply.append('phone_comment', document.getElementById(`sdtReply${id}`).value);
      formDataReply.append('answer', document.getElementById(`textAreaCmtReply${id}`).value);
      // formDataReply.append('img_comment', document.getElementById(`image_uploadsReply${id}`).files[0]);
      formDataReply.append('id_comment', id);
      formDataReply.append('new_answer', 1);
      try {
        const res = await fetch('https://data.thoviet.com/api/newAnswer', {
          method: 'POST',
          body: formDataReply,
        })
        if (res.status !== 200) {
          const err = new Error("Error")
          throw err;
        }
        const dataReply = await res.json()
   
      } catch (error) {
        console.log(error);
      }
    }

    function showReplay(id) {
      console.log("show id", id);
      const replyCmtShow = document.getElementsByClassName('replay' + id).value;
      console.log(replyCmtShow);
      if ($('.replay' + id).css('display') === 'none') {
        $('.replay' + id).css('display', 'block');
      } else {
        $('.replay' + id).css('display', 'none');
      }
    }
	  
    $('input[type=number]').on('mousewheel', function (e) {
      $(e.target).blur();
    });
    // image Input upload 
    const input = document.getElementById('image_uploads');
    const preview_img_coment = document.querySelector('.previewNew');
    const fileTypes = [
      "image/jpeg",
      "image/png"
    ];

    function validFileType(file) {
      return fileTypes.includes(file.type);
    }
    function returnFileSize(number) {
      if (number < 1024) {
        return `${number} bytes`;
      } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
      } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
      }
    }
    input.style.opacity = 0;
    input.addEventListener('change', updateImageDisplay);
    function updateImageDisplay() {
      while (preview_img_coment.firstChild) {
        preview_img_coment.removeChild(preview_img_coment.firstChild);
      }

      const curFiles = input.files;
      if (curFiles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'Không chọn được hình ảnh';
        preview_img_coment.appendChild(para);
      } else {
        const list = document.createElement('ol');
        preview_img_coment.appendChild(list);

        for (const file of curFiles) {
          const listItem = document.createElement('li');
          const para = document.createElement('p');
          if (validFileType(file)) {
            para.textContent = `Hình ảnh: ${file.name}, kích thước ${returnFileSize(file.size)}.`;
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);

            listItem.appendChild(image);
            listItem.appendChild(para);
          } else {
            para.textContent = `Hình ${file.name}: Không đúng định dạng`;
            listItem.appendChild(para);
          }

          list.appendChild(listItem);
        }
      }
    }
  </script>