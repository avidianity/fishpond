<?php

namespace App\Http\Controllers\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->client()
            ->notifications()
            ->get();

        return NotificationResource::collection($notifications);
    }

    public function update(Request $request, $id)
    {
        /**
         * @var \Illuminate\Notifications\DatabaseNotification
         */
        $notification = $request->client()
            ->notifications()
            ->findOrFail($id);

        if ($request->boolean('mark_as_read')) {
            $notification->markAsRead();
        } else {
            $notification->markAsUnread();
        }

        return NotificationResource::make($notification);
    }
}
