<?php

namespace App\Http\Controllers\V1\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Owner\File\StoreRequest;
use App\Http\Resources\Owner\FileResource;
use App\Models\File;

class FileController extends Controller
{
    public function store(StoreRequest $request)
    {
        $file = File::process($request->file('file'));

        return FileResource::make($file);
    }
}
