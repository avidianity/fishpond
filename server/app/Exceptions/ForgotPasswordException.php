<?php

namespace App\Exceptions;

use Avidianity\LaravelExtras\Contracts\RenderableExceptionContract;
use Avidianity\LaravelExtras\Traits\RendersException;
use Exception;
use Illuminate\Http\Response;

class ForgotPasswordException extends Exception implements RenderableExceptionContract
{
    use RendersException;

    const KEY = 'FORGOT_PASSWORD_ERROR';

    const STATUS_CODE = Response::HTTP_BAD_REQUEST;

    public function __construct(string $message = '', protected string $subKey = '')
    {
        parent::__construct($message);
    }
}
