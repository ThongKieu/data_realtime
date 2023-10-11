<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckWorkByAdmin extends Model
{
    use HasFactory;
    protected $fillable = ['id_work_ass','id_auth','info_check'];
}
