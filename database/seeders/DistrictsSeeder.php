<?php

namespace Database\Seeders;

use App\Models\Districts;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DistrictsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        Districts::insert([
            'dis_name' => 'Quận 1',
            'dis_sort_name' => 'q1',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 2',
            'dis_sort_name' => 'q2',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 3',
            'dis_sort_name' => 'q3',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 4',
            'dis_sort_name' => 'q4',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 5',
            'dis_sort_name' => 'q5',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 6',
            'dis_sort_name' => 'q6',
        ],); Districts::insert([
            'dis_name' => 'Quận 7',
            'dis_sort_name' => 'q7',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 8',
            'dis_sort_name' => 'q8',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 9',
            'dis_sort_name' => 'q9',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 10',
            'dis_sort_name' => 'q10',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 11',
            'dis_sort_name' => 'q11',
        ],);
        Districts::insert([
            'dis_name' => 'Quận 12',
            'dis_sort_name' => 'q12',
        ],);
        Districts::insert([
            'dis_name' => 'Bình Thạnh',
            'dis_sort_name' => 'bt',
        ],);
        Districts::insert([
            'dis_name' => 'Bình Tân',
            'dis_sort_name' => 'btan',
        ],);
        Districts::insert([
            'dis_name' => 'Bình Chánh',
            'dis_sort_name' => 'bc',
        ],);
        Districts::insert([
            'dis_name' => 'Thủ Đức',
            'dis_sort_name' => 'td',
        ],);
        Districts::insert([
            'dis_name' => 'Gò Vấp',
            'dis_sort_name' => 'gv',
        ],);
        Districts::insert([
            'dis_name' => 'Tân Bình',
            'dis_sort_name' => 'tb',
        ],); Districts::insert([
            'dis_name' => 'Tân Phú',
            'dis_sort_name' => 'tp',
        ],); Districts::insert([
            'dis_name' => 'Phú Nhuận',
            'dis_sort_name' => 'pn',
        ],); Districts::insert([
            'dis_name' => 'Nhà Bè',
            'dis_sort_name' => 'nb',
        ],); Districts::insert([
            'dis_name' => 'Hóc Môn',
            'dis_sort_name' => 'hm',
        ],);
        Districts::insert([
            'dis_name' => 'Củ Chi',
            'dis_sort_name' => 'cc',
        ],);
        Districts::insert([
            'dis_name' => 'Khác',
            'dis_sort_name' => 'Khac'
        ],);
    }
}


