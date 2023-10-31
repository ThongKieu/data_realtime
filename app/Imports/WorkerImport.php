<?php

namespace App\Imports;

use App\Models\Worker;
use Maatwebsite\Excel\Concerns\ToModel;

class WorkerImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Worker([

            'worker_full_name' => $row[0], // Họ và tên
            'worker_code' => $row[1], // Mã nhân viên
            'worker_BHXH' => $row[2], // Mã bảo hiểm xã hội (BHXH)
            'worker_BHXH_time' => $row[3], // Thời gian tham gia BHXH
            'worker_BHBV' => $row[4], // Bảo hiểm bảo việt (BHBV)
            'worker_BHBV_money' => $row[5], // Số tiền tham gia BHBV
            'worker_date_of_birth' => $row[6], // Ngày sinh
            'worker_CCCD' => $row[7], // Số căn cước công dân (CCCD)
            'worker_CCCD_date' => $row[8], // Ngày cấp CCCD
            'worker_CMND' => $row[9], // Số chứng minh nhân dân (CMND)
            'worker_CMND_date' => $row[10], // Ngày cấp CMND
            'worker_address' => $row[11], // Địa chỉ, số nhà,..
            'worker_ward' => $row[12], // Phường, xã,..
            'worker_district' => $row[13], // Quận, huyện
            'worker_city' => $row[14], // Thành phố
            'worker_phone_company' => $row[15], // Số điện thoại của công ty
            'worker_tax_TNCN' => $row[0], // Mã số thuế thu nhập cá nhân (TNCN)
            'worker_phone_personal' => $row[16], // Số điện thoại cá nhân
            'worker_phone_family' => $row[17], // Số điện thoại gia đình
            'worker_date_ATLD2' => $row[18], // Ngày hết hạn thẻ an toàn lao động (ATLĐ) lần 2 2021-2022
            'worker_date_ATLD3' => $row[19], // Ngày hết hạn thẻ an toàn lao động (ATLĐ) lần 3 2021-2023
            'worker_date_ATLD4' => $row[20], // Ngày hết hạn thẻ an toàn lao động (ATLĐ) lần 4 2022-2024
            'worker_degree_school' => $row[21], // Trường học, đơn vị học, trung tâm học
            'worker_degree' => $row[22], // Hệ bằng cấp, học vị
            'worker_degree_major' => $row[23], // Chuyên ngành học
            'worker_degree_rate' => $row[24], // Xếp loại tốt nghiệp
            'worker_degree_time_train' => $row[25], // Thời gian đào tạo
            'worker_degree_date' => $row[26], // Ngày cấp bằng, chứng chỉ
            'worker_degree_time_effective' => $row[27], // Thời gian hiệu lực bằng, chứng chỉ
            'worker_profile' => $row[28], // Hồ sơ xin việc
            'worker_presenter' => $row[29], // Người giới thiệu
            'worker_time_start_work' => $row[30], // Thời gian bắt đầu làm việc
            'worker_path' => $row[31],
            'worker_kind' => $row[32],
            'worker_has_work' => $row[33],
            'worker_status' => $row[34],
            'worker_check_acc' => $row[35],
            'worker_avatar' => $row[36],
        ]);
    }
}
