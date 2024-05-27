<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorksAssignment extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_cus',
        'id_worker',
        'id_phu',
        'real_note',
        'spending_total',
        'income_total',
        'bill_imag',
        'seri_imag',
        'seri_number',
        'admin_check',
        'check_admin_check',
        'kind_work_assign',
        'status_work',
        'his_work'
        ];
    public function warranty()
    {
        return $this->hasOne(Warranties::class);
    }
}
