<?php

namespace Database\Seeders;

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
        Pond::factory(5)->for(Owner::factory())->create();
    }
}
