<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

      User::factory()->create([
                'name' => 'Supper Admin',
                'email' => 'tranmanh@thoviet.com.vn',
                'password' => Hash::make('Thoviet58568!@#'),
                'permission'=>0,
                'phone'=>'0912847218',
                'position'=> 'NV Văn Phòng',
                'code'=>'VP01',
                'avatar'=>'assets/avatar/avata1.png'
            ],);

            User::factory()->create([
                'name' => 'Admin Quản lý',
                'email' => 'tung@thoviet.com.vn',
                'password' => Hash::make('Thoviet58568!@#'),
                'phone'=>'0912847218',
                'position'=> 'NV Văn Phòng',
                'permission'=>1,
                'code'=>'VP02',
                'avatar'=>'assets/avatar/avata2.png'
            ],);
            User::factory()->create([
                'name' => 'Admin Quản lý',
                'email' => 'thong@thoviet.com.vn',
                'phone'=>'0912847218',
                'position'=> 'NV Văn Phòng',
                'password' => Hash::make('Thoviet58568!@#'),
                'permission'=>1,
                'code'=>'VP03',
                'avatar'=>'assets/avatar/avata3.png'
            ],);
            User::factory()->create([
                'name' => 'Điều phối viên',
                'email' => 'dieuphoivien@thoviet.com.vn',
                'phone'=>'0912847218',
                'position'=> 'NV Văn Phòng',
                'password' => Hash::make('Thoviet58568!@#'),
                'permission'=>2,
                'code'=>'VP04',
                'avatar'=>'assets/avatar/avata3.png'
            ],);
            User::factory()->create([
                'name' => 'Kế Toán',
                'email' => 'ketoan@thoviet.com.vn',
                'phone'=>'0912847218',
                'position'=> 'NV Văn Phòng',
                'password' => Hash::make('Thoviet58568!@#'),
                'permission'=>3,
                'code'=>'VP05',
                'avatar'=>'assets/avatar/avata3.png'
            ],);
    }
}
