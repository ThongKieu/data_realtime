<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'work_content' => 'required|min:2,max:500',
            'date_book' => 'required|min:2,max:11',
            'phone_number' => 'required|min:2,max:11',
            'district' => 'required|min:2,max:250',
            'member_read' => 'required',
            'kind_work' => 'required|numeric',
            'status_cus' => 'required|numeric',
            'flag_status' => 'required|numeric',
            'from_cus' => 'required|numeric',
            'street' => 'max:500',
            'name_cus' => 'max:500',
            'work_note' => 'max:1000',
            'from_app' => 'required|numeric',
            'content' => 'max:500',
            'id_worker' => 'required|numeric',

        ];
    }
}
