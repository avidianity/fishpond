<?php

namespace App\Http\Requests\V1\Owner\Pond;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string', 'max:255'],
            'image_url' => ['nullable', 'url', 'max:255'],
            'description' => ['nullable', 'string'],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable', 'url'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'class' => ['nullable', 'string', 'max:255'],
            'price' => ['nullable', 'string', 'max:255'],
            'location_url' => ['nullable', 'url', 'max:255'],
            'square_meters' => ['nullable', 'string', 'max:255'],
        ];
    }
}
