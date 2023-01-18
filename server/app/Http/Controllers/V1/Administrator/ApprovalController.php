<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Approval\UpdateRequest;
use App\Http\Resources\ApprovalResource;
use App\Models\Approval;
use Illuminate\Support\Facades\DB;

class ApprovalController extends Controller
{
    protected array $relationships = [
        'approvable',
    ];

    public function index()
    {
        $approvals = Approval::with($this->relationships)
            ->get();

        return ApprovalResource::collection($approvals);
    }

    public function show($id)
    {
        $approval = Approval::with($this->relationships)
            ->findOrFail($id);

        return ApprovalResource::make($approval);
    }

    public function update(UpdateRequest $request, $id)
    {
        $approval = Approval::with($this->relationships)
            ->findOrFail($id);

        $approval->update($request->validated());

        return ApprovalResource::make($approval);
    }

    public function destroy($id)
    {
        return DB::transaction(function () use ($id) {
            /**
             * @var \App\Models\Approval
             */
            $approval = Approval::with($this->relationships)
                ->findOrFail($id);

            $approval->approvable->delete();
            $approval->delete();

            return response()->noContent();
        });
    }
}
