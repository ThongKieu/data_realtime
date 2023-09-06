<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    use HasFactory;
    protected $fillable =
    [
        'work_content',
        'work_note',
        'name_cus',
        'date_book',
        'phone_number',
        'street',
        'district',
        'members_read',
        'kind_work',
        'status_cus',
        'flag_status',
        'from_cus',
        'image_work_path'
    ];
}
