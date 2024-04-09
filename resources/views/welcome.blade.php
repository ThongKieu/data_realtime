<style>
  /* style css order form  */
  .gridContactLeft {
    grid-area: left;
    width: 100%;
  }

  .gridContactLeft h3 {
    font-size: 30px;
    text-align: center;
  }

  .headingContact {
    background-color: #3d89f8 !important;
  }

  .gridContactLeft input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding-left: 0;
    padding-right: 0;
    border-radius: 0;
    background: none;
    outline: none;
    box-shadow: none !important;
  }

  .gridContactLeft input:focus {
    border-bottom: 1px solid black;

  }
  .gridContactLeft select {
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding-left: 0;
    padding-right: 0;
    border-radius: 0;
    background: none;
    outline: none;
  }

  .gridContactLeft select:focus {
    border-bottom: 1px solid black;
  }
  .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    -o-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  }

  .gridContactRight {
    grid-area: right;
    width: 100%;
  }

  .containerContact {
    width: 100%;
    margin: auto;
    display: grid;
    grid-template-areas:
      'left   left right'
      'bottom bottom bottom'
    ;

  }

  .gridContactLeft {
    background-color: white;
  }

  .gridContactRight {
    color: white;
    background-color: #3d89f8;
    text-align: center;
  }

  .containerContact label {
    font-size: 14px;
    color: black;
    margin: 0 0 0 0;
    display: inline-block;
    padding: 0;
  }

  .contactWork {
    display: flex;
    justify-content: space-between;
  }

  .workCont {
    width: 100%;
    margin-right: 20px;
  }

  .namePro {
    width: 100%;
    margin-right: 30px;
  }


  .buttonSubmit {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .buttonItem {
    padding: 10px 5px;
    border: none !important;
    color: white !important;
    background-color: #35477d;
    font-size: 15px;
    background-color: #2b5896 !important;
  }

  .contentContactRight {
    padding: 5px;
    color: white;
  }

  .buttonItem:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  .noteOrder {
    margin-right: 30px;
  }

  /* reponsive  */
  @media only screen and (max-width : 768px) {

    /* Styles */
    .containerContact {
      width: 100%;
      margin: auto;
      display: block;
      height: 100%;
      background-color: white;
    }

    .contactWork {
      display: block;
    }

    .workCont {
      width: 100%;
      margin-right: 0;
    }

    .namePro {
      width: 100%;
      margin-right: 0;
    }

    .noteOrder {
      margin-right: 0;
    }

    #orderForm {
      padding-left: 10px;
      padding-right: 10px;
    }

    .containerContact {
      padding: 5px;
    }
  }

  #orderForm {
    padding-left: 10px;
  }

  /* end reponsive */
</style>
<div class="containerContact">
  <div class="gridContactLeft">
    <h4>Tư Vấn - Báo Giá - Đặt Lịch Ngay</h4>
    <form action="" id="orderForm" method="post">
      <div class="contactWork">
        <div class="workCont"><label class="yccv">Yêu cầu công việc<span class="required "
              style="float: none !important;">(*)</span></label> <br /><input class="inputText" type="text"
            name="cvCont" id="cvCont" required="" placeholder="Ví dụ: sửa máy lạnh, sửa tủ lạnh,..." /></div>
        <div class="namePro"><label class="ten">Họ Và Tên</label> <input class="inputText" type="text" name="tenCont"
            id="tenCont" placeholder="Lê Thị A" /></div>
      </div>
      <div class="contactWork">
        <div class="workCont"><label>Số điện thoại<span class="required "
              style="float: none !important;">(*)</span></label> <input class="inputTel" type="tel" name="sdtCont"
            id="sdtCont" maxlength="11" onkeypress="return onlyNumberKey(event)" placeholder="VD: 0944 661 839"
            required="" /></div>

            <div class="dateCont"><label class="dateCont">Địa Chỉ<span class="required"
              style="float: none !important;">(*)</span></label> <input type="date" class="inputText" name="dateCont"
            placeholder="Số nhà, tên đường" id="dateCont" required="" /></div>
      </div>
      <div class="contactWork">
        <div class="workCont"><label class="spanDiaChi">Địa Chỉ<span class="required "
              style="float: none !important;">(*)</span></label> <input type="text" class="inputText" name="diaChiCont"
            placeholder="Số nhà, tên đường" id="diaChiCont" required="" /></div>
        <div class="namePro"><label>Quận, Huyện<span class="required "
              style="float: none !important;">(*)</span></label> <br /><select id="qCont" required="">
            <option value="">Chọn</option>
            <option value="Quận 1">Quận 1</option>
            <option value="Quận 3">Quận 3</option>
            <option value="Quận 4">Quận 4</option>
            <option value="Quận 5">Quận 5</option>
            <option value="Quận 6">Quận 6</option>
            <option value="Quận 7">Quận 7</option>
            <option value="Quận 8">Quận 8</option>
            <option value="Quận 10">Quận 10</option>
            <option value="Quận 11">Quận 11</option>
            <option value="Quận 12">Quận 12</option>
            <option value="TP Thủ Đức">Thành phố Thủ Đức</option>
            <option value="Bình Tân">Quận Bình Tân</option>
            <option value="Bình Thạnh">Quận Bình Thạnh</option>
            <option value="Gò Vấp">Quận Gò Vấp</option>
            <option value="Phú Nhuận">Quận Phú Nhuận</option>
            <option value="Tân Bình">Quận Tân Bình</option>
            <option value="Tân Phú">Quận Tân Phú</option>
            <option value="Bình Chánh">Huyện Bình Chánh</option>
            <option value="Cần Giờ">Huyện Cần Giờ</option>
            <option value="Củ Chi">Huyện Củ Chi</option>
            <option value="Hooc Môn">Huyện Hóc Môn</option>
            <option value="Nhà Bè">Huyện Nhà Bè</option>
            <option value="Dĩ An">Dĩ An - Bình Dương</option>
            <option value="Thuận An">Thuận An - Bình Dương</option>
            <option value="Khác">Khác</option>
          </select></div>
      </div>
      <div class="noteOrder"><label>Ghi Chú<span class="required " style="float: none !important;"></span></label>
        <input type="text" class="inputText" name="ghiChuCont " id="ghiChuCont" placeholder="VD: Mang thang cao,..." />
      </div>
      <div class="buttonSubmit" style="text-align: center;"><button class="buttonItem" style="width: 50%;"
          type="submit">Đặt Lịch</button></div>
      <div class="notice" style="padding: 0 10px;"><span class="noticeRed">(**)</span><span><b>Alo Việc Nhà sẽ liên hệ
            lại Khách Hàng ngay từ 07h đến 17h. Nếu Khách Hàng đặt lịch ngoài giờ làm việc, Alo Việc Nhà sẽ liên hệ xác
            nhận vào sáng mai hoặc vào ngày Khách Hàng yêu cầu thực hiện.</b></span></div>
    </form>
  </div>
  <div class="gridContactRight" style="word-wrap: break-word;">
    <div class="contentContactRight">
      <h4 style="text-align: center; background-color: #3d89f8; color: white;">ALO VIỆC NHÀ ĐÃ TIẾP NHẬN VÀ XỬ LÝ</h4>
      <div
        style="color: black; margin: auto; margin-top: 5px; width: fit-content; height: 620px; border-radius: 15px; justify-content: space-between; overflow: hidden; z-index: 1; background-color: white;">
                  <marquee direction="up" height="100%" data-speed="100" scrollamount="10" hspace="15px" vspace="0%"
          class="card1" id="output1"></marquee>
      </div>
    </div>
  </div>
</div>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.js"
  integrity="sha512-K/oyQtMXpxI4+K0W7H25UopjM8pzq0yrVdFdG21Fh5dBe91I40pDd9A4lzNlHPHBIP2cwZuoxaUSX0GJSObvGA=="
  crossorigin="anonymous" referrerpolicy="no-referrer"></script>
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
      cus_from_page: "Alo Việc Nhà"
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
  // const url = 'https://data.thoviet.com/api/showAllWork';
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
  const btnSubmitCmt = document.querySelector('.formBtn-CmtNew');
  const cmtEl = document.querySelector('.containerCmtNew');
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
      console.log('data', data);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  });
  // const d = document.getElementById('text123').value


</script>