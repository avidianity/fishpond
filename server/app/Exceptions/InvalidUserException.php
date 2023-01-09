<?php

namespace App\Exceptions;

use Avidianity\LaravelExtras\Contracts\RenderableExceptionContract;
use Avidianity\LaravelExtras\Traits\RendersException;
use Exception;
use Illuminate\Http\Response;

class InvalidUserException extends Exception implements RenderableExceptionContract
{
    use RendersException;

    const KEY = 'INVALID_USER';

    const STATUS_CODE = Response::HTTP_BAD_REQUEST;

    public function __construct()
    {
        parent::__construct('User is invalid.');
    }
}
