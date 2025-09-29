<script setup lang="ts">
import type { TAppProps } from '@/types';
import type { TCurrency } from '@/types/enums';

import { useForm, usePage } from '@inertiajs/vue3';

import { Button } from '@/components/ui/button';
import { Error } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { AppLayout, SettingLayout } from '@/layouts/app-layout';

import HeadingSmall from '@/components/elements/HeadingSmall.vue';

const page = usePage<TAppProps>();

const user = page.props.auth.user;

const form = useForm<{
    currency: TCurrency;
    email_notifications: boolean;
    push_notifications: boolean;
    budget_alerts: boolean;
    weekly_reports: boolean;
}>({
    currency: user.currency ?? 'BDT',
    push_notifications: user.push_notifications ?? true,
    email_notifications: user.email_notifications ?? false,
    budget_alerts: user.budget_alerts ?? false,
    weekly_reports: user.weekly_reports ?? false,
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
                title: 'Preferences settings',
            },
        ]"
    >
        <SettingLayout>
            <div class="flex flex-col space-y-6">
                <HeadingSmall title="Preferences" description="Update your general and notification preferences" />

                {{ form.data() }}

                <form @submit.prevent="form.patch(route('app.settings.preferences.update'))" class="space-y-6">
                    <div class="space-y-6">
                        <div class="space-y-4">
                            <h3 class="text-lg font-medium">General</h3>
                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div class="grid gap-2">
                                    <Label for="currency">Currency</Label>
                                    <Select v-model="form.currency" name="currency">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="BDT">BDT (৳)</SelectItem>
                                            <SelectItem value="USD">USD ($)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Error class="mt-2" :message="form.errors.currency" />
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-lg font-medium">Notifications</h3>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <div class="space-y-0.5">
                                        <Label for="push-notifications">Push Notifications</Label>
                                        <p class="text-sm text-muted-foreground">Receive push notifications in browser</p>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <Switch id="push-notifications" name="push_notifications" v-model:checked="form.push_notifications" />
                                        <Error v-if="form.errors.push_notifications" :message="form.errors.push_notifications" />
                                    </div>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="space-y-0.5">
                                        <Label for="email-notifications">Email Notifications</Label>
                                        <p class="text-sm text-muted-foreground">Receive notifications via email</p>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <Switch id="email-notifications" name="email_notifications" v-model:checked="form.email_notifications" />
                                        <Error v-if="form.errors.email_notifications" :message="form.errors.email_notifications" />
                                    </div>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="space-y-0.5">
                                        <Label for="budget-alerts">Budget Alerts</Label>
                                        <p class="text-sm text-muted-foreground">Get notified when approaching budget limits</p>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <Switch id="budget-alerts" name="budget_alerts" v-model:checked="form.budget_alerts" />
                                        <Error v-if="form.errors.budget_alerts" :message="form.errors.budget_alerts" />
                                    </div>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="space-y-0.5">
                                        <Label for="weekly-reports">Weekly Reports</Label>
                                        <p class="text-sm text-muted-foreground">Receive weekly spending summaries</p>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <Switch id="weekly-reports" name="weekly_reports" v-model:checked="form.weekly_reports" />
                                        <Error v-if="form.errors.weekly_reports" :message="form.errors.weekly_reports" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <Button :disabled="form.processing" data-test="save-preferences-button">
                            {{ form.processing ? 'Saving...' : 'Save Preferences' }}
                        </Button>

                        <Transition
                            enter-active-class="transition ease-in-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition ease-in-out"
                            leave-to-class="opacity-0"
                        >
                            <p v-show="form.recentlySuccessful" class="text-sm text-neutral-600">Preferences saved.</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </SettingLayout>
    </AppLayout>
</template>
