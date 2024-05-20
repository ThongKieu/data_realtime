<!DOCTYPE html>
<html>

<head>
    <title>Bảng Báo Giá Dịch Vụ</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    {{-- <link rel="stylesheet" href="{{ asset("assets/css/style.css")}}"> --}}
</head>
<style>
  
 body{
    max-width: 90%;
    margin: auto;
    margin-top: 20px;
    font-family: 'Time New Romand', sans-serif;
 }
 .logo {
    max-width: 150px;
}

.info-quote {
    border: 2px solid black;
    border-radius: 10px;

}

.info-quote p {
    padding: 5px 0 0 5px;
}

.c-center {
    vertical-align: inherit;
    text-align: center;
}
</style>

<body>


    <div class="row">
        <div class="col-2">
            {{-- <img class="logo" src="{{ asset('assets/pdf/logo.jpg') }}" alt=""> --}}
        </div>
        <div class="col-8 text-center">
            <p><span style="font-size: 20px;font-weight: 700"> CÔNG TY TNHH DỊCH VỤ KỸ THUẬT THỢ VIỆT </span> <br>
                ĐC: 25/6 Phùng Văn Cung, Phường 2, Quận Phú Nhuận., TP. HCM <br>
                Tel: 028.36202538 - 0903532938 ; Website: www.thoviet.com.vn </p>
            <p style="font-size: 30px;font-weight: 700">BẢNG BÁO GIÁ <br>
                <span style="font-size:13px "><i>(Vv: sửa máy lạnh)</i></span>
            </p>
        </div>
        <div class="col-2"></div>
        {{-- row1 --}}
        <div class="col-1"></div>

        <div class="col-4 info-quote">
            <p> <b>Người liên hệ: Quý Khách hàng</b> <br>
                Địa chỉ : <br>
                Email: <br>
                ĐT : 0347578964 <br></p>
        </div>
        <div class="col-2"></div>
        <div class="col-4 info-quote">
            <p> <b>Từ: Ngô Văn Thông</b><br>
                Chức vụ : Phó Phòng Kinh Doanh<br>
                Email: lienhe@thoviet.com.vn<br>
                ĐT : 0914439118 - 0912747218<br></p>
        </div>
        <div class="col-12 p-2">
            THỢ VIỆT NGƯỜI THỢ CỦA GIA ĐÌNH VIỆT SINCE 2011<br>
            DỊCH VỤ SỬA NHÀ - LẮP ĐẶT - SỬA CHỮA ĐIỆN NƯỚC - ĐIỆN LẠNH - ĐỒ GỖ<br>
            Công ty Thợ Việt rất vui khi nhận được yêu cầu của Quý công ty.<br>
            Chúng tôi hân hạnh gửi đến Quý Công ty bảng báo giá sau:<br>
        </div>
        <div class="col-12" style="max-width: 98%; margin: auto">
            <table class="table table-bordered">
                <thead>
                    <tr class="c-center">
                        <th>STT</th>
                        <th>Nội Dung</th>
                        <th>Đơn vị</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>Ghi Chú</th>
                    </tr>
                </thead>
                <tbody>
                    {{-- @foreach ($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->created_at->format('d-m-Y') }}</td>
                </tr>
                @endforeach --}}
                    <tr>
                        <td class="c-center">1</td>
                        <td> THỢ VIỆT NGƯỜI THỢ CỦA GIA ĐÌNH VIỆT SINCE 2011<br>
                            DỊCH VỤ SỬA NHÀ - LẮP ĐẶT - SỬA CHỮA ĐIỆN NƯỚC - ĐIỆN LẠNH - ĐỒ GỖ<br>
                            Công ty Thợ Việt rất vui khi nhận được yêu cầu của Quý công ty.<br>
                            Chúng tôi hân hạnh gửi đến Quý Công ty bảng báo giá sau:<br></td>
                        <td class="c-center">Cái</td>
                        <td class="c-center">1</td>
                        <td class="c-center">500,000</td>
                        <td class="c-center">5,000,000</td>
                        <td></td>
                    </tr>
                    <tr class="c-center">
                        <td colspan="2"></td>
                        <td colspan="2">Cộng</td>
                        <td colspan="2">100</td>
                        <td></td>
                    </tr>
                    <tr class="c-center">
                        <td colspan="2"></td>
                        <td colspan="2">Thuế GTGT</td>
                        <td colspan="2">100</td>
                        <td></td>
                    </tr>
                    <tr class="c-center">
                        <td colspan="2"></td>
                        <td colspan="2">Tổng Cộng</td>
                        <td colspan="2">100</td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot>
                   
                </tfoot>
            </table>
            <p>
                <b>*Ghi chú:</b>
            <ul>
                <li>
                    Khối lượng báo theo thực tế thi công.
                </li>
                <li>
                    Đơn giá chưa bao gồm VAT.

                </li>
            </ul>
            
            </p>
        </div>
    </div>




</body>

</html>
