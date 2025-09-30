<?php

use App\Models\User;

test('appearance page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('app.settings.appearance.edit'));

    $response->assertOk();
});

test('appearance page requires authentication', function () {
    $response = $this
        ->get(route('app.settings.appearance.edit'));

    $response->assertRedirect(route('login'));
});
