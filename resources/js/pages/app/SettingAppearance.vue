<script setup lang="ts">
import AppearanceTabs from '@/components/elements/AppearanceTabs.vue';
import HeadingSmall from '@/components/elements/HeadingSmall.vue';

import AppLayout from '@/layouts/app-layout/Layout.vue';
import SettingsLayout from '@/layouts/app-layout/SettingLayout.vue';
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
                title: 'Appearance settings',
            },
        ]"
    >
        <SettingsLayout>
            <div class="space-y-6">
                <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                <AppearanceTabs />
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
