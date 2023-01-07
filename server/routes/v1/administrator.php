<?php

use App\Http\Controllers\V1\Administrator\AuthController;
use App\Http\Controllers\V1\Administrator\ClientController;
use App\Http\Controllers\V1\Administrator\ConversationController;
use App\Http\Controllers\V1\Administrator\ForgotPasswordController;
use App\Http\Controllers\V1\Administrator\IssueController;
use App\Http\Controllers\V1\Administrator\OwnersController;
use App\Http\Controllers\V1\Administrator\PondController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('auth.')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->as('login');

    Route::middleware('auth:administrators')->group(function () {
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

Route::middleware('auth:administrators')->group(function () {
    Route::post('ponds/comment', [PondController::class, 'comment'])->name('ponds.comment');
    Route::apiResource('ponds', PondController::class)->only(['index', 'show']);

    Route::apiResources([
        'owners' => OwnersController::class,
        'clients' => ClientController::class,
    ]);

    Route::apiResource('issues', IssueController::class)->only(['index', 'show']);

    Route::post('conversations/send', [ConversationController::class, 'send'])->name('conversations.send');
    Route::apiResource('conversations', ConversationController::class)->except(['update', 'destroy']);
});
