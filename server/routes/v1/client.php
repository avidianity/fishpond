<?php

use App\Http\Controllers\V1\Client\AuthController;
use App\Http\Controllers\V1\Client\ConversationController;
use App\Http\Controllers\V1\Client\ForgotPasswordController;
use App\Http\Controllers\V1\Client\IssueController;
use App\Http\Controllers\V1\Client\NotificationController;
use App\Http\Controllers\V1\Client\OwnersController;
use App\Http\Controllers\V1\Client\PondController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('auth.')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->as('login');
    Route::post('register', 'register')->as('register');

    Route::middleware('auth:clients')->group(function () {
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
Route::middleware('auth:clients')->group(function () {
    Route::post('ponds/rate', [PondController::class, 'rate'])->name('ponds.rate');
    Route::delete('ponds/comment/{comment}', [PondController::class, 'deleteComment'])->name('ponds.comment.destroy');
    Route::post('ponds/comment', [PondController::class, 'comment'])->name('ponds.comment');
    Route::apiResource('ponds', PondController::class)->only(['index', 'show']);
    Route::apiResource('owners', OwnersController::class)->only(['index', 'show']);
    Route::apiResource('issues', IssueController::class)->only('store');

    Route::post('conversations/send', [ConversationController::class, 'send'])->name('conversations.send');
    Route::apiResource('conversations', ConversationController::class)->except(['update', 'destroy']);
    Route::apiResource('notifications', NotificationController::class)->only(['index', 'update']);
});
