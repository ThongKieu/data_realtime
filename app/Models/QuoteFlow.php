<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuoteFlow extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_work',
        'staff_in_change_id',
        'staff_in_create_id',
        'total',
        'expense',
        'pripot_percent',
        'status',
        'date_do',
        'to_table',
        'quote_date_do',
    ];
}
