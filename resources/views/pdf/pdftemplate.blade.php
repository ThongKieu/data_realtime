<!DOCTYPE html>
<html>

<head>
    <title>Bảng Báo Giá Dịch Vụ</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    {{-- <link rel="stylesheet" href="{{ asset("assets/css/style.css")}}"> --}}
</head>
<style>
    * {
        margin: 15px;
        padding: 0;
        font-family: DejaVu Sans, sans-serif;
        font-size: 18px;
    }

    .info-quote {
        border: 2px solid black;
        border-radius: 20px;
    }

    .c-center td {
        font-size: 20px;
    }

    .c-center th {
        padding: 0;
        font-size: 18px;
        text-align: center;
        align-items: center;
    }

    .table>thead>tr th {
        padding: 0;
        border: 1px solid #000;
    }

    .table>tbody>tr td {
        padding: 5px;
        border: 1px solid #000;
        vertical-align: center;
    }

    th,
    tr,
    td {
        font-size: 18px;
    }

    th {
        padding: 0;
        text-align: center;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    .td-c {
        text-align: right;
    }

    .td-c-m {
        text-align: center;
    }

    .td-c-e {
        font-weight: 700;
        text-align: right;
    }
</style>

<body>
    <div class="main">
        <section class="headerTitle" style="position: relative;">
            <div class="headerTitle_left" style="position: absolute">
                <img class="logo" src='assets/pdf/logo.jpg' width="150" height="150" alt="">
            </div>
            <div class="headerTitle_right" style="position: absolute; top:30px; right: 30px; text-align:center;">
                <p style="font-size: 20px;"> <span style="font-size:30px;
                    font-style: bold;">CÔNG
                        TY TNHH DỊCH VỤ KỸ THUẬT THỢ VIỆT</span><br>ĐC: 25/6 Phùng Văn Cung, Phường 2, Quận Phú Nhuận,
                    TP. HCM<br>Tel:
                    028.36202538 - 0903532938  -   Website: www.thoviet.com.vn</p>
            </div>
        </section>
        <section class="headerTitle" style="margin-bottom: -3%">
            <div style="font-style: bold;  text-align: center; padding-top: 150px">
                <p style="padding: -10px; margin: -10px;">----</p>
                <p style="padding: -10px; margin: -10px; font-size: 30px;">BẢNG BÁO GIÁ</p>
                <p style="font-style: italic">
                    @foreach ($data['info_cus'] as $index => $item)
                        {{isset($item->work_content)?'(V/v: '.$item->work_content.')':'(V/v: Bảo trì M & E)'}} 
                    @endforeach
                </p>
            </div>
        </section>
        <section style="position: relative; margin-top: -10px">
            <div>
                <div class="info-quote" style="width: 500px;">
                    <p> @foreach ($data['info_cus'] as $index => $item)
                        <b>Người liên hệ:{{isset($item->name_cus)?$item->name_cus:'Quý Khách hàng'}} </b><br>
                        Địa chỉ:{{isset($item->street)?$item->street.','.$item->district:''}} <br>
                        Email:{{isset($item->email)?$item->email:''}} <br>
                        ĐT: {{isset($item->phone_number)?$item->phone_number:''}} <br>
                        @endforeach
                    </p>
                </div>
                <div class="info-quote" style="width: 500px; position: absolute; top:0; right: 0;">
                    <p>
                        @foreach ($data['user'] as $index => $item)
                        <b>Từ: {{$item->name}}</b><br>
                        Chức vụ: {{isset($item->position)?$item->position:'Nv Kinh Doanh'}}<br>
                        Email: {{isset($item->email)?$item->email:'lienhe@thoviet.com.vn'}}<br>
                        ĐT:{{isset($item->phone)?$item->phone.'-':''}} 18008122<br>
                        @endforeach
                    </p>
                </div>
            </div>
            <div style="margin-top: -20px;">
                <p style="font-style: bold;  padding:-10px 0;  margin: -10px 0;"> <strong>THỢ VIỆT NGƯỜI THỢ CỦA GIA ĐÌNH VIỆT SINCE 2011</strong></p>
                <p style="font-style: bold; padding:-10px 0;  margin: -10px 0;"><strong> DỊCH VỤ SỬA NHÀ - LẮP ĐẶT - SỬA CHỮA ĐIỆN NƯỚC - ĐIỆN LẠNH - ĐỒ GỖ</strong></p>
                <p style="padding:-10px 15px;  margin: -10px 0; ">Công ty Thợ Việt rất vui khi nhận được yêu cầu của Quý công ty.</p>
                <p style="padding:-10px 15px;  margin: -10px 0; ">Chúng tôi hân hạnh gửi đến Quý Công ty bảng báo giá sau:</p>
            </div>
            <div class="col-12" style="max-width: 98%; margin: auto">
                <table class="table table-bordered tb-c">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Nội Dung</th>
                            <th style="padding:0 10px;">Đơn vị</th>
                            <th style="padding:0 10px;">Số lượng</th>
                            <th style="padding:0 10px;">Đơn giá</th>
                            <th style="padding:0 10px;">Thành tiền</th>
                            <th style="padding:0 10px;">Ghi Chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($data['quote_info'] as $index => $item)
                        <tr>
                            <td>{{ $index + 1 }}</td>
                            <td>{{ $item->info ?? '' }}</td>
                            <td class="td-c">{{ $item->unit ?? '' }}</td>
                            <td class="td-c">{{ $item->{'quantity '} ?? '' }}</td>
                            <td class="td-c">{{ isset($item->{'unitPrice '}) ? number_format((float)$item->{'unitPrice '}, 0, ',', '.') : '' }}</td>
                            <td class="td-c">{{ isset($item->{'totalPrice'}) ? number_format((float)$item->{'totalPrice'}, 0, ',', '.') : '' }}</td>
                            <td class="td-c">{{ isset($item->vat) ? number_format((float)$item->vat * 100, 2, ',', '.') . '%' : '' }}</td>
                        </tr>
                        @endforeach
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2" class="td-c-m">Cộng</td>
                            <td colspan="2" class="td-c-e">500,000 đ</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2" class="td-c-m">Thuế GTGT</td>
                            <td colspan="2" class="td-c-e">50,000 đ</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2" class="td-c-m">Tổng Cộng</td>
                            <td colspan="2" class="td-c-e">550,000 đ</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <ul>
                    <li style="list-style: none; padding:0px">
                        <b>* Ghi chú:</b>
                    </li>
                    <li>
                        Khối lượng báo theo thực tế thi công.
                    </li>
                    <li>
                        Đơn giá chưa bao gồm VAT.
                    </li>
                </ul>
            </div>
        </section>
        <section style="position: relative;">
            <div style="position: absolute; left: 10%">
                <p style="font-size: 20px; font-style: bold;">Đại diện công ty Thợ Việt</p>
            </div>
            <div style="position: absolute; right:10%">
                <p style="font-size: 20px; font-style: bold;">Duyệt bởi</p>
            </div>
        </section>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous">
    </script>
</body>

</html>
