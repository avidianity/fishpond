<?php

namespace App\Enums;

use ArchTech\Enums\InvokableCases;
use ArchTech\Enums\Values;

enum OtpPurposeEnum: string
{
    use Values;
    use InvokableCases;

    case FORGOT_PASSWORD = 'forgot-password';
    case VERIFY_EMAIL = 'verify-email';
}
