<?php

namespace App\Exceptions;

use Avidianity\LaravelExtras\Contracts\RenderableExceptionContract;
use Carbon\CarbonInterval;
use Exception;
use Illuminate\Http\Response;

class ThrottleRequestsException extends Exception implements RenderableExceptionContract
{
    const KEY = 'TOO_MANY_ATTEMPTS';

    public function __construct(protected int $retryAfter, ?Exception $previous = null)
    {
        $time = CarbonInterval::seconds($retryAfter)->cascade()->forHumans();
        parent::__construct("Too many attempts. Please try again in {$time}.", 0, $previous);
    }

    /**
     * Render the exception as an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        return response()->json([
            'key' => static::KEY,
            'message' => $this->getMessage(),
            'retry_after' => $this->retryAfter,
        ], Response::HTTP_TOO_MANY_REQUESTS);
    }
}
