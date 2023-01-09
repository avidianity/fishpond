<?php

namespace App\Notifications;

use App\Models\Comment;
use App\Models\Pond;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewCommentNotification extends Notification
{
    use Queueable;

    public function __construct(protected Pond $pond, protected Comment $comment)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'pond_id' => $this->pond->getKey(),
            'owner_id' => $this->pond->owner->getKey(),
            'comment' => $this->comment->withoutRelations()->toArray(),
            'commenter' => $this->comment->senderable->withoutRelations()->toArray(),
        ];
    }
}
