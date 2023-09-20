<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewSale extends Model
{
    use HasFactory;
    protected $fillable =['content_view_sale','time_begin','time_end','sale_percent'];
}
