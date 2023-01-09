<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class MultipleExists implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(protected array $rules)
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        foreach ($this->rules as $key => $model) {
            if (!is_string($key)) {
                $key = $attribute;
            }

            if ($model::query()->where($key, $value)->count() > 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The selected :attribute is invalid.';
    }

    public static function make(array $rules)
    {
        return new static($rules);
    }
}
