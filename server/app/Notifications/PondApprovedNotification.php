<?php

namespace App\Notifications;

use App\Models\Pond;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PondApprovedNotification extends Notification
{
    use Queueable;

    public function __construct(protected Pond $pond)
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

    public function toArray($notifiable)
    {
        return [
            'pond_id' => $this->pond->getKey(),
        ];
    }
}
