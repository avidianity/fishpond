<?php

return [
    'size' => (int) env('OTP_SIZE', 6),
    'expiry' => (int) env('OTP_EXPIRY', 5),
    'throttle' => (int) env('OTP_THROTTLE', 1),
];
