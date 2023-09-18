<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorksAssignment extends Model
{
    use HasFactory;
    protected $fillable =['id_cus','id_worker','id_phu','real_note','spending_total','income_total','bill_imag'];
}
