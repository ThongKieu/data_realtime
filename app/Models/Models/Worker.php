<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    use HasFactory;
    protected $fillable =[
        'worker_firstname',
        'worker_name',
        'sort_name',
        'add_woker', 
        'phone_ct',
        'phone_cn',
        'folder_path',
        'kind_worker',
        'has_work',
        'status_worker',
        'check_acc',
        'avata'
    ];
}
