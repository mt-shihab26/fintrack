<?php

use App\Models\User;

test('preferences page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('app.settings.preferences.edit'));

    $response->assertOk();
});

test('user preferences can be updated', function () {
    $user = User::factory()->create([
        'currency' => 'USD',
        'email_notifications' => false,
        'push_notifications' => false,
        'budget_alerts' => false,
        'weekly_reports' => false,
    ]);

    $response = $this
        ->actingAs($user)
        ->patch(route('app.settings.preferences.update'), [
            'currency' => 'BDT',
            'email_notifications' => true,
            'push_notifications' => true,
            'budget_alerts' => true,
            'weekly_reports' => true,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect();

    $user->refresh();

    expect($user->currency->value)->toBe('BDT');
    expect($user->email_notifications)->toBeTrue();
    expect($user->push_notifications)->toBeTrue();
    expect($user->budget_alerts)->toBeTrue();
    expect($user->weekly_reports)->toBeTrue();
});

test('preferences update requires valid currency', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->patch(route('app.settings.preferences.update'), [
            'currency' => 'INVALID',
            'email_notifications' => true,
            'push_notifications' => true,
            'budget_alerts' => true,
            'weekly_reports' => true,
        ]);

    $response->assertSessionHasErrors('currency');
});

test('preferences update requires authentication', function () {
    $response = $this
        ->get(route('app.settings.preferences.edit'));

    $response->assertRedirect(route('login'));
});

test('preferences update requires authentication for patch', function () {
    $response = $this
        ->patch(route('app.settings.preferences.update'), [
            'currency' => 'USD',
            'email_notifications' => true,
        ]);

    $response->assertRedirect(route('login'));
});

test('boolean preferences can be set to false', function () {
    $user = User::factory()->create([
        'email_notifications' => true,
        'push_notifications' => true,
        'budget_alerts' => true,
        'weekly_reports' => true,
    ]);

    $response = $this
        ->actingAs($user)
        ->patch(route('app.settings.preferences.update'), [
            'currency' => 'USD',
            'email_notifications' => false,
            'push_notifications' => false,
            'budget_alerts' => false,
            'weekly_reports' => false,
        ]);

    $response->assertSessionHasNoErrors();

    $user->refresh();

    expect($user->email_notifications)->toBeFalse();
    expect($user->push_notifications)->toBeFalse();
    expect($user->budget_alerts)->toBeFalse();
    expect($user->weekly_reports)->toBeFalse();
});