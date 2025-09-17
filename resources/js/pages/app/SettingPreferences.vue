<script setup lang="ts">
import { reactive } from 'vue';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Form } from '@inertiajs/vue3';

import HeadingSmall from '@/components/elements/HeadingSmall.vue';
import InputError from '@/components/elements/InputError.vue';
import AppLayout from '@/layouts/app-layout/Layout.vue';
import SettingsLayout from '@/layouts/app-layout/SettingLayout.vue';

interface UserPreferences {
    currency: string;
    theme: string;
    notifications: {
        email: boolean;
        push: boolean;
        budgetAlerts: boolean;
        weeklyReports: boolean;
    };
    dateFormat: string;
    language: string;
}

defineProps<{
    preferences?: UserPreferences;
}>();

const formData = reactive<UserPreferences>({
    currency: 'USD',
    theme: 'system',
    notifications: {
        email: true,
        push: false,
        budgetAlerts: true,
        weeklyReports: true,
    },
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
});

const updateNotification = (key: keyof typeof formData.notifications, value: boolean) => {
    formData.notifications[key] = value;
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
                title: 'Preferences settings',
            },
        ]"
    >
        <SettingsLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Preferences" description="Update your general and notification preferences" />

                <Form
                    :action="route('app.settings.preferences.update')"
                    method="patch"
                    class="space-y-6"
                    v-slot="{ errors, processing, recentlySuccessful }"
                >
                    <div class="space-y-6">
                        <div class="space-y-4">
                            <h3 class="text-lg font-medium">General</h3>
                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div class="grid gap-2">
                                    <Label for="currency">Currency</Label>
                                    <Select v-model="formData.currency" name="currency">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USD">USD ($)</SelectItem>
                                            <SelectItem value="EUR">EUR (€)</SelectItem>
                                            <SelectItem value="GBP">GBP (£)</SelectItem>
                                            <SelectItem value="JPY">JPY (¥)</SelectItem>
                                            <SelectItem value="CAD">CAD (C$)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError class="mt-2" :message="errors.currency" />
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-lg font-medium">Notifications</h3>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <div class="space-y-0.5">
                                        <Label for="email-notifications">Email Notifications</Label>
                                        <p class="text-sm text-muted-foreground">Receive notifications via email</p>
                                    </div>
                                    <Switch
                                        id="email-notifications"
                                        name="notifications[email]"
                                        :checked="formData.notifications.email"
                                        @update:checked="(checked: boolean) => updateNotification('email', checked)"
                                    />
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="space-y-0.5">
                                        <Label for="push-notifications">Push Notifications</Label>
                                        <p class="text-sm text-muted-foreground">Receive push notifications in browser</p>
                                    </div>
                                    <Switch
                                        id="push-notifications"
                                        name="notifications[push]"
                                        :checked="formData.notifications.push"
                                        @update:checked="(checked: boolean) => updateNotification('push', checked)"
                                    />
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="space-y-0.5">
                                        <Label for="budget-alerts">Budget Alerts</Label>
                                        <p class="text-sm text-muted-foreground">Get notified when approaching budget limits</p>
                                    </div>
                                    <Switch
                                        id="budget-alerts"
                                        name="notifications[budgetAlerts]"
                                        :checked="formData.notifications.budgetAlerts"
                                        @update:checked="(checked: boolean) => updateNotification('budgetAlerts', checked)"
                                    />
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="space-y-0.5">
                                        <Label for="weekly-reports">Weekly Reports</Label>
                                        <p class="text-sm text-muted-foreground">Receive weekly spending summaries</p>
                                    </div>
                                    <Switch
                                        id="weekly-reports"
                                        name="notifications[weeklyReports]"
                                        :checked="formData.notifications.weeklyReports"
                                        @update:checked="(checked: boolean) => updateNotification('weeklyReports', checked)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button :disabled="processing" data-test="save-preferences-button">
                            {{ processing ? 'Saving...' : 'Save Preferences' }}
                        </Button>

                        <Transition
                            enter-active-class="transition ease-in-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition ease-in-out"
                            leave-to-class="opacity-0"
                        >
                            <p v-show="recentlySuccessful" class="text-sm text-neutral-600">Preferences saved.</p>
                        </Transition>
                    </div>
                </Form>
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
