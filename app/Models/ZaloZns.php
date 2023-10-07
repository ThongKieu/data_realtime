<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ZaloZns extends Model
{
    use HasFactory;
    protected $fillable = ['code','access_token_zns','refresh_token_zns','time_access_token','time_refresh_token'];
}
