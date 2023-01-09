<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Owner;
use App\Models\Pond;
use Illuminate\Database\Seeder;

class PondSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ponds = Pond::factory(5)->for(Owner::factory())->create();

        foreach ($ponds as $pond) {
            foreach (range(0, random_int(2, 10)) as $_) {
                $pond->rate(Client::factory()->create(), random_int(1, 5));
            }
        }
    }
}
