<?php

namespace App\Providers;

use App\Models\Administrator;
use App\Models\Client;
use App\Models\Owner;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        FormRequest::macro('model', function (string $name): Model {
            /**
             * @var \Illuminate\Foundation\Http\FormRequest $this
             */
            return $this->route($name);
        });

        Request::macro('owner', function (): Owner {
            /**
             * @var \Illuminate\Http\Request $this
             */
            return $this->user();
        });

        Request::macro('client', function (): Client {
            /**
             * @var \Illuminate\Http\Request $this
             */
            return $this->user();
        });

        Request::macro('administrator', function (): Administrator {
            /**
             * @var \Illuminate\Http\Request $this
             */
            return $this->user();
        });
    }
}
