<?php

namespace App\Http\Requests\V1\Client\ForgotPassword;

use Illuminate\Foundation\Http\FormRequest;

class FinalizeRequest extends FormRequest
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
            'verification_id' => ['required', 'uuid'],
            'password' => ['required', 'string', 'max:255', 'confirmed'],
        ];
    }
}
