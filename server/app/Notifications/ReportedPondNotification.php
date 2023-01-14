<?php

namespace App\Notifications;

use App\Models\Issue;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ReportedPondNotification extends Notification
{
    use Queueable;

    public function __construct(protected Issue $issue)
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
            'issue_id' => $this->issue->getKey(),
            'pond_id' => $this->issue->pond_id,
            'message' => $this->issue->message,
        ];
    }
}
