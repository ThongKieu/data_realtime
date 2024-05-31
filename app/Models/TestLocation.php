<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestLocation extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_worker', 'address', 'lat', 'lng', 'time',
    ];
}
