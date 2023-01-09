<?php

use App\Models\Owner;
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
        Schema::create('ponds', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignIdFor(Owner::class)->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('status');
            $table->string('image_url');
            $table->json('images')->nullable();
            $table->text('description')->nullable();
            $table->decimal('latitude')->nullable();
            $table->decimal('longitude')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ponds');
    }
};
