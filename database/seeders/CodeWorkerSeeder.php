<?php

namespace Database\Seeders;

use App\Models\CodeWorkerKind;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CodeWorkerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CodeWorkerKind::insert([
            'code_worker' => 'A',
            'kind_worker' => 'Điện Nước',
            'descript_code_worker' => 'Thợ điện nước thông thường',
            'status_code_worker' => '1'

        ],);
        CodeWorkerKind::insert([
            'code_worker' => 'B',
            'kind_worker' => 'Điện Lạnh',
            'descript_code_worker' => 'Thợ điện lạnh thông thường',
            'status_code_worker' => '1'

        ],);
        CodeWorkerKind::insert([
            'code_worker' => 'C',
            'kind_worker' => 'Đồ gỗ',
            'descript_code_worker' => 'Thợ đồ gỗ thông thường',
            'status_code_worker' => '1'

        ],);
        CodeWorkerKind::insert([
            'code_worker' => 'D',
            'kind_worker' => 'Năng Lượng Mặt trời',
            'descript_code_worker' => 'Thợ Năng Lượng Mặt trời thông thường',
            'status_code_worker' => '1'

        ],);
        CodeWorkerKind::insert([
            'code_worker' => 'F',
            'kind_worker' => 'Xây Dựng',
            'descript_code_worker' => 'Thợ Xây Dựng thông thường',
            'status_code_worker' => '1'

        ],);
        CodeWorkerKind::insert([
            'code_worker' => 'G',
            'kind_worker' => 'Tài Xế',
            'descript_code_worker' => 'Tài xế xe bán tải',
            'status_code_worker' => '1'

        ],);
        CodeWorkerKind::insert([
            'code_worker' => 'H',
            'kind_worker' => 'Cơ Khí',
            'descript_code_worker' => 'Thợ Cơ Khí thông thường',
            'status_code_worker' => '1'

        ],);
    }
}
