<script setup lang="ts">
import { useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Error, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/vue3';
import { Upload } from 'lucide-vue-next';

import HeadingSmall from '@/components/elements/HeadingSmall.vue';
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

const form = useForm({
    name: user.name,
    email: user.email,
    avatar: null as File | null,
});

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        form.avatar = target.files[0];
    }
};
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

                {{ form.data() }}

                <form @submit.prevent="() => form.patch(route('profile.update'), { preserveScroll: true })" class="space-y-6">
                    <div class="grid gap-4">
                        <Label>Profile Avatar</Label>
                        <div class="flex items-center gap-6">
                            <Avatar class="h-20 w-20">
                                <AvatarImage :src="user.avatar" :alt="user.name" />
                                <AvatarFallback class="text-lg">{{ user.name?.charAt(0)?.toUpperCase() || 'U' }}</AvatarFallback>
                            </Avatar>

                            <div class="flex flex-col gap-2">
                                <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
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
                        <Error :message="form.errors.avatar" />
                    </div>
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

                    <div class="flex items-center gap-4">
                        <Button type="submit" :disabled="form.processing" data-test="update-profile-button">Save</Button>

                        <Transition
                            enter-active-class="transition ease-in-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition ease-in-out"
                            leave-to-class="opacity-0"
                        >
                            <p v-show="form.recentlySuccessful" class="text-sm text-neutral-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </div>

            <DataExport />
            <DangerZone />
        </SettingsLayout>
    </AppLayout>
</template>
