<script setup lang="ts">
import { send } from '@/routes/verification';
import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, Link } from '@inertiajs/vue3';
import { Upload } from 'lucide-vue-next';

import HeadingSmall from '@/components/elements/HeadingSmall.vue';
import InputError from '@/components/elements/InputError.vue';
import DangerZone from '@/components/screens/settings/DangerZone.vue';
import DataExport from '@/components/screens/settings/DataExport.vue';
import AppLayout from '@/layouts/app-layout/Layout.vue';
import SettingsLayout from '@/layouts/app-layout/SettingLayout.vue';

const fileInput = ref<HTMLInputElement | null>(null);

defineProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>();

const page = usePage();
const user = page.props.auth.user;
</script>

<template>
    <AppLayout
        :breadcrumbs="[
            {
                home: true,
            },
            {
                title: 'Settings',
                href: route('app.settings.index'),
            },
            {
                title: 'Profile settings',
            },
        ]"
    >
        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Profile information" description="Update your profile picture, name and email address" />

                <Form
                    :action="route('profile.update')"
                    method="patch"
                    enctype="multipart/form-data"
                    class="space-y-6"
                    v-slot="{ errors, processing, recentlySuccessful }"
                >
                    <div class="grid gap-4">
                        <Label>Profile Avatar</Label>
                        <div class="flex items-center gap-6">
                            <Avatar class="h-20 w-20">
                                <AvatarImage :src="user.avatar" :alt="user.name" />
                                <AvatarFallback class="text-lg">{{ user.name?.charAt(0)?.toUpperCase() || 'U' }}</AvatarFallback>
                            </Avatar>

                            <div class="flex flex-col gap-2">
                                <input ref="fileInput" type="file" name="avatar" accept="image/*" class="hidden" />
                                <Button
                                    type="button"
                                    variant="outline"
                                    @click="fileInput?.click()"
                                    class="flex items-center gap-2"
                                    data-test="upload-avatar-button"
                                >
                                    <Upload class="h-4 w-4" />
                                    Choose photo
                                </Button>
                                <p class="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                            </div>
                        </div>
                        <InputError :message="errors.avatar" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            class="mt-1 block w-full"
                            name="name"
                            :default-value="user.name"
                            required
                            autocomplete="name"
                            placeholder="Full name"
                        />
                        <InputError class="mt-2" :message="errors.name" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            class="mt-1 block w-full"
                            name="email"
                            :default-value="user.email"
                            required
                            autocomplete="username"
                            placeholder="Email address"
                        />
                        <InputError class="mt-2" :message="errors.email" />
                    </div>

                    <div v-if="mustVerifyEmail && !user.email_verified_at">
                        <p class="-mt-4 text-sm text-muted-foreground">
                            Your email address is unverified.
                            <Link
                                :href="send()"
                                as="button"
                                class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                            >
                                Click here to resend the verification email.
                            </Link>
                        </p>

                        <div v-if="status === 'verification-link-sent'" class="mt-2 text-sm font-medium text-green-600">
                            A new verification link has been sent to your email address.
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button :disabled="processing" data-test="update-profile-button">Save</Button>

                        <Transition
                            enter-active-class="transition ease-in-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition ease-in-out"
                            leave-to-class="opacity-0"
                        >
                            <p v-show="recentlySuccessful" class="text-sm text-neutral-600">Saved.</p>
                        </Transition>
                    </div>
                </Form>
            </div>

            <DataExport />
            <DangerZone />
        </SettingsLayout>
    </AppLayout>
</template>
