<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelOTWorker extends Model
{
    use HasFactory;
    protected $fillable = [
     'fuel_o_t_workers_id',
     'fuel_o_t_workers_content',
     'fuel_o_t_workers_spend_money',
     'fuel_o_t_workers_date_set',
     'fuel_o_t_workers_flag',
     'fuel_o_t_id_admin_check',
    ];
}
