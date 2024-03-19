<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PopupDiscount extends Model
{
    use HasFactory;
    protected $fillable = [
       'popup_title',
       'popup_image',
       'popup_discount',
       'popup_description',
       'popup_date_begin',
       'popup_date_end',
        'popup_status'
    ];
}
