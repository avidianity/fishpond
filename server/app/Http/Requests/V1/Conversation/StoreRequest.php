<?php

namespace App\Http\Requests\V1\Conversation;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
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
            'receiver_type' => ['required', 'string', Rule::in(['administrator', 'buyer', 'seller'])],
            'receiver_id' => ['required', 'uuid'],
        ];
    }
}
