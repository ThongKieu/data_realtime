<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountionWorker extends Model
{
    use HasFactory;
    protected $fillable = ['id_worker','acc_worker','pass_worker'];
}
