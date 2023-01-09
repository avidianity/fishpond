<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Administrator
 *
 * @property string $id
 * @property string $email
 * @property string $password
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Otp[] $otps
 * @property-read int|null $otps_count
 * @method static \Database\Factories\AdministratorFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrator newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Administrator newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Administrator query()
 * @method static \Illuminate\Database\Eloquent\Builder|Administrator whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrator whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrator whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrator wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Administrator whereUpdatedAt($value)
 */
	class IdeHelperAdministrator {}
}

namespace App\Models{
/**
 * App\Models\Client
 *
 * @property string $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Issue[] $issues
 * @property-read int|null $issues_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Otp[] $otps
 * @property-read int|null $otps_count
 * @method static \Database\Factories\ClientFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Client newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Client newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Client query()
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Client whereUpdatedAt($value)
 */
	class IdeHelperClient {}
}

namespace App\Models{
/**
 * App\Models\Comment
 *
 * @property string $id
 * @property string $commentable_type
 * @property string $commentable_id
 * @property string $senderable_type
 * @property string $senderable_id
 * @property string $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $commentable
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $senderable
 * @method static \Database\Factories\CommentFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Comment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Comment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Comment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Comment whereCommentableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comment whereCommentableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comment whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comment whereSenderableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comment whereSenderableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comment whereUpdatedAt($value)
 */
	class IdeHelperComment {}
}

namespace App\Models{
/**
 * App\Models\Conversation
 *
 * @property string $id
 * @property string $sender_type
 * @property string $sender_id
 * @property string $receiver_type
 * @property string $receiver_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Message[] $messages
 * @property-read int|null $messages_count
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $receiver
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $sender
 * @method static \Database\Factories\ConversationFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereReceiverType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereSenderType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	class IdeHelperConversation {}
}

namespace App\Models{
/**
 * App\Models\File
 *
 * @property string $id
 * @property string $type
 * @property string $name
 * @property string $path
 * @property string $url
 * @property int $size
 * @property string $driver
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\FileFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|File newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|File newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|File query()
 * @method static \Illuminate\Database\Eloquent\Builder|File whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereDriver($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|File whereUrl($value)
 */
	class IdeHelperFile {}
}

namespace App\Models{
/**
 * App\Models\Issue
 *
 * @property string $id
 * @property string $pond_id
 * @property string $client_id
 * @property string $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Client $client
 * @property-read \App\Models\Pond $pond
 * @method static \Database\Factories\IssueFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue query()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue wherePondId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereUpdatedAt($value)
 */
	class IdeHelperIssue {}
}

namespace App\Models{
/**
 * App\Models\Message
 *
 * @property string $id
 * @property string $conversation_id
 * @property mixed|null $metadata
 * @property \App\Enums\MessageType $type
 * @property string $sender_type
 * @property string $sender_id
 * @property string $receiver_type
 * @property string $receiver_id
 * @property string $message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Conversation $conversation
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $receiver
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $sender
 * @method static \Database\Factories\MessageFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereConversationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereReceiverType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereSenderType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	class IdeHelperMessage {}
}

namespace App\Models{
/**
 * App\Models\Otp
 *
 * @property string $id
 * @property string $otpable_type
 * @property string $otpable_id
 * @property string $uuid
 * @property string $code
 * @property int $used
 * @property \App\Enums\OtpPurposeEnum|null $purpose
 * @property int $expiry
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $otpable
 * @method static \Database\Factories\OtpFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Otp newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Otp notUsed()
 * @method static \Illuminate\Database\Eloquent\Builder|Otp purpose(\App\Enums\OtpPurposeEnum|string $purpose)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp query()
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereExpiry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereOtpableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereOtpableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp wherePurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereUsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Otp whereUuid($value)
 */
	class IdeHelperOtp {}
}

namespace App\Models{
/**
 * App\Models\Owner
 *
 * @property string $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Otp[] $otps
 * @property-read int|null $otps_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Pond[] $ponds
 * @property-read int|null $ponds_count
 * @method static \Database\Factories\OwnerFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Owner newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Owner query()
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereUpdatedAt($value)
 */
	class IdeHelperOwner {}
}

namespace App\Models{
/**
 * App\Models\Pond
 *
 * @property string $id
 * @property string $owner_id
 * @property string $name
 * @property string $status
 * @property string $image_url
 * @property mixed|null $images
 * @property string|null $description
 * @property mixed|null $latitude
 * @property mixed|null $longitude
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Comment[] $comments
 * @property-read int|null $comments_count
 * @property-read \App\Models\Owner $owner
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Rating[] $ratings
 * @property-read int|null $ratings_count
 * @method static \Database\Factories\PondFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pond newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pond query()
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pond whereUpdatedAt($value)
 */
	class IdeHelperPond {}
}

namespace App\Models{
/**
 * App\Models\Rating
 *
 * @property string $id
 * @property string $client_id
 * @property string $rateable_type
 * @property string $rateable_id
 * @property mixed $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Client $client
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $rateable
 * @method static \Database\Factories\RatingFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rating newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rating query()
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereClientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereRateableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereRateableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereValue($value)
 */
	class IdeHelperRating {}
}

