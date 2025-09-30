<script setup lang="ts">
import { useForm, usePage } from '@inertiajs/vue3';

import { Error, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLayout, SettingLayout } from '@/layouts/app-layout';
import { Link } from '@inertiajs/vue3';

import HeadingSmall from '@/components/elements/HeadingSmall.vue';
import AvatarUpload from '@/components/screens/settings/AvatarUpload.vue';
import DangerZone from '@/components/screens/settings/DangerZone.vue';
import DataExport from '@/components/screens/settings/DataExport.vue';
import SubmitButton from '@/components/screens/settings/SubmitButton.vue';

defineProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>();

const page = usePage();
const user = page.props.auth.user;

const form = useForm({
    _method: 'PATCH',
    name: user.name,
    email: user.email,
    avatar: null as File | null,
});
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
        <SettingLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Profile information" description="Update your profile picture, name and email address" />

                <form
                    @submit.prevent="() => form.post(route('profile.update'), { preserveScroll: true, preserveState: false, forceFormData: true })"
                    class="space-y-6"
                >
                    <AvatarUpload :user="user" v-model="form.avatar" :error="form.errors.avatar" />

                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input id="name" v-model="form.name" class="mt-1 block w-full" required autocomplete="name" placeholder="Full name" />
                        <Error class="mt-2" :message="form.errors.name" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="email">Email address</Label>
                        <Input
                            id="email"
                            v-model="form.email"
                            type="email"
                            class="mt-1 block w-full"
                            required
                            autocomplete="username"
                            placeholder="Email address"
                        />
                        <Error class="mt-2" :message="form.errors.email" />
                    </div>

                    <div v-if="mustVerifyEmail && !user.email_verified_at">
                        <p class="-mt-4 text-sm text-muted-foreground">
                            Your email address is unverified.
                            <Link
                                :href="route('verification.send')"
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

                    <SubmitButton :processing="form.processing" :recently-successful="form.recentlySuccessful" test-id="update-profile-button" />
                </form>
            </div>

            <DataExport />
            <DangerZone />
        </SettingLayout>
    </AppLayout>
</template>
