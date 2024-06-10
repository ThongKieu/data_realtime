<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_work_has', 'id_auth', 'quote_date', 'quote_info','quote_total_price','quote_status','quote_image'
    ];
}
