<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage as StorageFacade;

class Storage
{
    public static function public(): StorageFacade
    {
        /** @var mixed $storage */
        $storage = StorageFacade::disk('public');

        return $storage;
    }
}
