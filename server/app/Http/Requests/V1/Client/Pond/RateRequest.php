<?php

namespace App\Http\Requests\V1\Client\Pond;

use App\Models\Pond;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'pond_id' => ['required', 'uuid', Rule::exists(Pond::class, 'id')],
            'value' => ['required', 'numeric', 'min:0', 'max:5'],
        ];
    }
}
