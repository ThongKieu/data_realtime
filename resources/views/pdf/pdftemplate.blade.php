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

    .w-4 {
        width: 400px;
    }

    .w-1 {
        width: 80px;
    }

    .w-1-5 {
        width: 140px;
    }

    .w-2 {
        width: 180px;
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
                        TY TNHH DỊCH VỤ KỸ
                        THUẬT THỢ VIỆT</span><br>ĐC: 25/6 Phùng Văn Cung, Phường 2, Quận Phú Nhuận., TP. HCM<br>Tel:
                    028.36202538 - 0903532938; Website: www.thoviet.com.vn</p>
            </div>
        </section>
        <section class="headerTitle">
            <p style="font-style: bold; font-size: 30px; text-align: center; padding-top: 135px">
                <i>----</i> <br> BẢNG BÁO GIÁ <br>
                <i style="font-size: 18px; padding-top: 0; margin: 0px;">(V/v @if ($data['quote_con'])
                    
                @else
                    
                @endif)</i>
            </p>
        </section>
        <section style="position: relative; margin-top: -10px">
            <div>
                {{ $data['date'] }}
                @foreach ($data['quote_info'] as $quote)
                    <div class="info-quote" style="width: 500px;">
                        @foreach (json_decode($quote->quote_cus_info) as $customer)
                            <p><b>Người liên hệ: {{ $customer->name ? $customer->name : 'Quý Khách Hàng' }}</b><br>
                                Địa chỉ: {{ $customer->address ? $customer->address : '-' }}<br>
                                Email: {{ $customer->email ? $customer->email : '-' }}<br>
                                Điện thoại: {{ $customer->phone ? $customer->phone : '-' }}<br>
                            </p>
                        @endforeach
                    </div>
                    <div class="info-quote" style="width: 500px; position: absolute; top:0; right: 0;">

                        @foreach (json_decode($quote->quote_user_info) as $user)
                            <p><b>Từ: {{ $user->name ? $user->name : 'Công Ty Thợ Việt' }}</b><br>
                                Chức vụ : <br>
                                Email: lienhe@thoviet.com.vn<br>
                                ĐT : 18008122 - {{ $user->phone ? $user->phone : '0915.269.839' }}<br>
                            </p>
                        @endforeach
                    </div>
            </div>
            <div style="margin-top: -20px;">
                <p style="font-style: bold;  padding:-10px 0;  margin: -10px 0;"> <strong>THỢ VIỆT NGƯỜI THỢ CỦA GIA
                        ĐÌNH VIỆT SINCE 2011</strong></p>
                <p style="font-style: bold; padding:-10px 0;  margin: -10px 0;"><strong> DỊCH VỤ SỬA NHÀ - LẮP ĐẶT - SỬA
                        CHỮA ĐIỆN NƯỚC - ĐIỆN LẠNH - ĐỒ GỖ</strong></p>
                <p style="padding:-10px 15px;  margin: -10px 0; ">Công ty Thợ Việt rất vui khi nhận được yêu cầu của Quý
                    công ty.</p>
                <p style="padding:-10px 15px;  margin: -10px 0; ">Chúng tôi hân hạnh gửi đến Quý Công ty bảng báo giá
                    sau:</p>
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
                        @php
                            $price = 0;
                            $total_price=0; // Khởi tạo giá trị ban đầu
                        @endphp
                        @foreach (json_decode($quote->quote_info) as $quote_i)
                            @php
                                $price += $quote_i->total; // Thêm giá của mục hiện tại vào tổng
                                $total_price += $price;
                                $price_r =$quote_i->price * $quote_i->quality;
                                $vat_r =$quote_i->vat*$price_r;
                                $vat_t =  $vat_r;

                            @endphp
                            <tr>
                                @php
                                    $price_r = $quote_i->price* $quote_i->quality;
                                    $vat_r = $price_r * $quote_i->vat /100;
                                @endphp
                                <td class="td-c-m">1</td>
                                <td class="td-c-m w-4">{{ $quote_i->content }}</td>
                                <td class="td-c-m w-1">{{ $quote_i->unit }}</td>
                                <td class="td-c-m w-1">{{ $quote_i->quality }}</td>
                                <td class="td-c-e2 w-1-5">{{ number_format($quote_i->price, 2) }}</td>
                                <td class=" td-c-e2 w-1-5">{{ number_format($quote_i->price, 2) }}</td>
                                <td class=" td-c-e w-1-5" >{{ $quote_i->note }}</td> <!-- để lấp cột cuối -->
                            </tr>
                            @php
                                $price += $quote_i->total; // Thêm giá của mục hiện tại vào tổng

                                $total_price +=$price;
                            @endphp
                        @endforeach
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2" class="td-c-m">Cộng</td>
                            <td colspan="2" class="td-c-e">{{ number_format($price, 0) }}</td>
                            <td></td>
                        </tr>
                        @if ($quote->vat == 1)
                            <tr>
                                <td colspan="2"></td>
                                <td colspan="2" class="td-c-m">Thuế GTGT</td>
                                <td colspan="2" class="td-c-e">{{ $quote->vat }}</td>
                                <td></td>
                            </tr>
                        @endif
                        <tr>
                            <td colspan="2"></td>
                            <td colspan="2" class="td-c-m">Tổng Cộng</td>
                            <td colspan="2" class="td-c-e">{{ number_format($total_price, 0) }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <ul>

                    <li style="list-style: none; padding:0px">
                        <b>* Ghi chú:</b>
                    </li>

                    @foreach (json_decode($quote->quote_note) as $note)
                        <li>
                            {{ $note->note_content }}
                        </li>
                    @endforeach

                </ul>
            </div>
            @endforeach
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
