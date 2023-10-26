<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    protected $fillable =
    [
        'name_product',
        'code_product',
        'provider_product',
        'phone_product',
        'price_product',
        'sale_price_product',
        'image_product',
    ];
}
