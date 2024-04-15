<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeWorkerKind extends Model
{
    use HasFactory;
    protected $fillable =
    [
        'code_worker','kind_worker', 'descript_code_worker','status_code_worker'
    ];
}
