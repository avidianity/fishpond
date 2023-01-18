<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ponds', function (Blueprint $table) {
            $table->string('class')->nullable();
            $table->string('price')->nullable();
            $table->string('location_url')->nullable();
            $table->string('square_meters')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ponds', function (Blueprint $table) {
            $table->dropColumn([
                'class',
                'price',
                'location_url',
                'square_meters',
            ]);
        });
    }
};
