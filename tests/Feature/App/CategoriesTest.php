<?php

use App\Enums\Kind;
use App\Models\Category;
use App\Models\User;

test('categories index page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('app.categories.index'));

    $response->assertOk();
});

test('categories index requires authentication', function () {
    $response = $this
        ->get(route('app.categories.index'));

    $response->assertRedirect(route('login'));
});

test('user can create a new category', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('app.categories.store'), [
            'name' => 'Test Category',
            'kind' => Kind::EXPENSE->value,
            'color' => '#ff0000',
        ]);

    $response->assertRedirect();

    expect(Category::where([
        'name' => 'Test Category',
        'user_id' => $user->id,
        'kind' => Kind::EXPENSE,
        'color' => '#ff0000',
    ])->exists())->toBeTrue();
});

test('category creation requires authentication', function () {
    $response = $this
        ->post(route('app.categories.store'), [
            'name' => 'Test Category',
            'kind' => Kind::EXPENSE->value,
            'color' => '#ff0000',
        ]);

    $response->assertRedirect(route('login'));
});

test('category creation requires valid data', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('app.categories.store'), [
            'name' => '', // empty name
            'kind' => 'invalid', // invalid kind
            'color' => 'not-a-color', // invalid color
        ]);

    $response->assertSessionHasErrors(['name', 'kind', 'color']);
});

test('user can update their own category', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create([
        'user_id' => $user->id,
        'name' => 'Original Name',
        'kind' => Kind::EXPENSE,
        'color' => '#ff0000',
    ]);

    $response = $this
        ->actingAs($user)
        ->patch(route('app.categories.update', $category), [
            'name' => 'Updated Name',
            'kind' => Kind::INCOME->value,
            'color' => '#00ff00',
        ]);

    $response->assertRedirect();

    $category->refresh();

    expect($category->name)->toBe('Updated Name');
    expect($category->kind)->toBe(Kind::INCOME);
    expect($category->color)->toBe('#00ff00');
});

test('user cannot update another users category', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $category = Category::factory()->create(['user_id' => $user2->id]);

    $response = $this
        ->actingAs($user1)
        ->patch(route('app.categories.update', $category), [
            'name' => 'Hacked Name',
        ]);

    $response->assertForbidden();
});

test('category update requires authentication', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['user_id' => $user->id]);

    $response = $this
        ->patch(route('app.categories.update', $category), [
            'name' => 'Updated Name',
        ]);

    $response->assertRedirect(route('login'));
});

test('category update requires valid data', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['user_id' => $user->id]);

    $response = $this
        ->actingAs($user)
        ->patch(route('app.categories.update', $category), [
            'name' => '', // empty name
            'kind' => 'invalid', // invalid kind
        ]);

    $response->assertSessionHasErrors(['name', 'kind']);
});

test('user can delete their own category', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['user_id' => $user->id]);

    $response = $this
        ->actingAs($user)
        ->delete(route('app.categories.destroy', $category));

    $response->assertRedirect();

    expect(Category::find($category->id))->toBeNull();
});

test('user cannot delete another users category', function () {
    $user1 = User::factory()->create();
    $user2 = User::factory()->create();
    $category = Category::factory()->create(['user_id' => $user2->id]);

    $response = $this
        ->actingAs($user1)
        ->delete(route('app.categories.destroy', $category));

    $response->assertForbidden();

    expect(Category::find($category->id))->not->toBeNull();
});

test('category deletion requires authentication', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create(['user_id' => $user->id]);

    $response = $this
        ->delete(route('app.categories.destroy', $category));

    $response->assertRedirect(route('login'));
});