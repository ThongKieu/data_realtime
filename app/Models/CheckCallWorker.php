<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckCallWorker extends Model
{
    use HasFactory;
    protected $fillable =['worker_phone','worker_phone_called','worker_call_date','worker_call_time','worker_call_start_time','worker_call_check'];
    
}
