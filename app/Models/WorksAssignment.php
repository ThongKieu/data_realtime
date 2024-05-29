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
    // WorksAssignment model 
    public function warranty() {
        return $this->hasMany(Warranties::class, 'id_work_has', 'id');
    }
    public function work() {
        return $this->belongsTo(Work::class, 'id_cus', 'id');
    }
    
    public function worker() {
        return $this->belongsTo(Worker::class, 'id_worker', 'id');
    }
    // //Warranties model
    // public function workAssignment() {
    //     return $this->belongsTo(WorksAssignment::class, 'id_work_has', 'id');
    // }
    // //worker model
    // public function assignments() {
    //     return $this->hasMany(WorksAssignment::class, 'id_worker', 'id');
    // } 
    // //work model
    // public function assignments() {
    //     return $this->hasMany(WorksAssignment::class, 'id_cus', 'id');
    // }
}
