<?php

use App\Models\Client;
use App\Models\Owner;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

Route::get('/email/verify/{id}/{hash}', function ($id) {
    /**
     * @var \App\Models\Client|\App\Models\Owner|null
     */
    $user = Client::find($id) ?? Owner::find($id);

    if (!is_null($user)) {
        $user->markEmailAsVerified();
        event(new Verified($user));
    }

    return redirect()->to(config('app.frontend_url'));
})->middleware(['signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return response('', Response::HTTP_NO_CONTENT);
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');
