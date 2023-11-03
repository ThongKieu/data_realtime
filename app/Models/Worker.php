<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    use HasFactory;
    protected $fillable =[
        'worker_full_name',            // Họ và tên
        'worker_code',                 // Mã nhân viên
        'worker_BHXH',                 // Mã bảo hiểm xã hội (BHXH)
        'worker_BHXH_time',            // Thời gian tham gia BHXH
        'worker_BHBV',                 // Bảo hiểm bảo việt (BHBV)
        'worker_BHBV_money',           // Số tiền tham gia BHBV
        'worker_date_of_birth',        // Ngày sinh
        'worker_CCCD',                 // Số căn cước công dân (CCCD)
        'worker_CCCD_date',            // Ngày cấp CCCD
        'worker_CMND',                 // Số chứng minh nhân dân (CMND)
        'worker_CMND_date',            // Ngày cấp CMND
        'worker_address',              // Địa chỉ, số nhà,..
        'worker_ward',                 // Phường, xã,..
        'worker_district',             // Quận, huyện
        'worker_city',                 // Thành phố     
        'worker_phone_company',        // Số điện thoại của công ty
        'worker_tax_TNCN',             // Mã số thuế thu nhập cá nhân (TNCN)
        'worker_phone_personal',       // Số điện thoại cá nhân
        'worker_phone_family',         // Số điện thoại gia đình
        'worker_date_ATLD2',           // Ngày hết hạn thẻ an toàn lao động (ATLĐ) lần 2 2021-2022
        'worker_date_ATLD3',           // Ngày hết hạn thẻ an toàn lao động (ATLĐ) lần 3 2021-2023
        'worker_date_ATLD4',           // Ngày hết hạn thẻ an toàn lao động (ATLĐ) lần 4 2022-2024
        'worker_degree_school',        // Trường học, đơn vị học, trung tâm học
        'worker_degree',               // Hệ bằng cấp, học vị         
        'worker_degree_major',         // Chuyên ngành học
        'worker_degree_rate',          // Xếp loại tốt nghiệp
        'worker_degree_time_train',    // Thời gian đào tạo
        'worker_degree_date',          // Ngày cấp bằng, chứng chỉ
        'worker_degree_time_effective',// Thời gian hiệu lực bằng, chứng chỉ
        'worker_profile',              // Hồ sơ xin việc
        'worker_presenter',            // Người giới thiệu
        'worker_time_start_work',      // Thời gian bắt đầu làm việc

        'worker_path',
        'worker_kind',
        'worker_has_work',
        'worker_status',
        'worker_check_acc',
        'worker_avatar'
    ];
}