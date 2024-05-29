<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkList extends Model
{
    use HasFactory;
    protected $fillable =
    [
        "work_content",
        "work_distric",
        "work_phone",
        "work_name_cus",
    ];
    public function assignments() {
        return $this->hasMany(WorksAssignment::class, 'id_cus', 'id');
    }
}
