<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportWorker extends Model
{
    use HasFactory;
    protected $fillable = [
       'id_worker','date_do','work_revenue','work_expenditure','flag_check',
    ];
}
