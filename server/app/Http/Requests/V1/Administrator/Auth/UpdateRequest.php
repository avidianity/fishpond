<?php

namespace App\Http\Requests\V1\Administrator\Auth;

use App\Models\Administrator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
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
        $administrator = $this->administrator();

        return [
            'email' => ['nullable', 'email', Rule::unique(Administrator::class)->ignoreModel($administrator)],
            'password' => ['nullable', 'string', 'max:255'],
        ];
    }
}
