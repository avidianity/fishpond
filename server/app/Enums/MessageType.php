<?php

namespace App\Enums;

use ArchTech\Enums\InvokableCases;
use ArchTech\Enums\Values;

enum MessageType: string
{
    use Values;
    use InvokableCases;

    case TEXT = 'text';
    case FILE = 'file';
}
