<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoticationAll extends Model
{
    use HasFactory;
    protected $fillable = ['from_table','info_notication', 'user_read'];
}
