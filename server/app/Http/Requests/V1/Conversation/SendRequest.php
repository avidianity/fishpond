<?php

namespace App\Http\Requests\V1\Conversation;

use App\Enums\MessageType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SendRequest extends FormRequest
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
            'message_type' => ['required', 'string', Rule::in(MessageType::values())],
            'message_text' => [Rule::requiredIf(fn () => $this->input('message_type') === MessageType::TEXT()), 'string'],
            'message_file' => [Rule::requiredIf(fn () => $this->input('message_type') === MessageType::FILE()), 'file'],
        ];
    }
}
