<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MapsWorker extends Model
{
    use HasFactory;
    protected $fillable =['lat','lng','id_worker','last_active','is_online'];
}
