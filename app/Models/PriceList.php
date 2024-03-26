<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceList extends Model
{
    use HasFactory;
    protected $fillable =[
        'ID_price_list',
        'name_price_list',
        'info_price',
        'price',
        'image_price',
        'note_price',
        
       ];
}
