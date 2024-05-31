<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warranties extends Model
{
    use HasFactory;
    protected $fillable = ['id_work_has','warranty_time','warranty_info','unit'];
    public function workAssignment() {
    return $this->belongsTo(WorksAssignment::class, 'id_work_has', 'id');
}
}
