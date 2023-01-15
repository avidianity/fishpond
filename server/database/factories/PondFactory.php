<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pond>
 */
class PondFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'status' => Arr::random(['For Sale', 'For Rent', 'Sold']),
            'image_url' => $this->faker->imageUrl,
            'description' => $this->faker->text,
        ];
    }
}
