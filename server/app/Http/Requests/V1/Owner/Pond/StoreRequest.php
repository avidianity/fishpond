<?php

namespace App\Http\Requests\V1\Owner\Pond;

use Illuminate\Foundation\Http\FormRequest;

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
            'name' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
            'image_url' => ['required', 'url', 'max:255'],
            'description' => ['nullable', 'string'],
            'images' => ['nullable', 'array'],
            'images.*' => ['nullable', 'url'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'class' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:255'],
            'location_url' => ['required', 'url', 'max:255'],
            'square_meters' => ['required', 'string', 'max:255'],
        ];
    }
}
