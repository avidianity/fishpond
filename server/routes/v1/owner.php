<?php

use App\Http\Controllers\V1\Owner\AuthController;
use App\Http\Controllers\V1\Owner\ConversationController;
use App\Http\Controllers\V1\Owner\FileController;
use App\Http\Controllers\V1\Owner\ForgotPasswordController;
use App\Http\Controllers\V1\Owner\PondController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('auth.')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->as('login');
    Route::post('register', 'register')->as('register');

    Route::middleware('auth:owners')->group(function () {
        Route::get('check', 'check')->as('check');
        Route::get('logout', 'logout')->as('logout');
        Route::post('update', 'update')->as('update');
    });

    Route::prefix('forgot-password')->controller(ForgotPasswordController::class)->group(function () {
        Route::post('send', 'send')->as('send');
        Route::post('verify', 'verify')->as('verify');
        Route::post('finalize', 'finalize')->as('finalize');
    });
});

Route::middleware('auth:owners')->group(function () {
    Route::apiResource('files', FileController::class)->only(['store']);

    Route::post('ponds/comment', [PondController::class, 'comment'])->name('ponds.comment');
    Route::apiResources([
        'ponds' => PondController::class,
    ]);

    Route::apiResource('conversations', ConversationController::class)->except(['update', 'destroy']);
});
