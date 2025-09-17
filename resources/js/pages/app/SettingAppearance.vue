<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

import AppearanceTabs from '@/components/elements/AppearanceTabs.vue';
import HeadingSmall from '@/components/elements/HeadingSmall.vue';
import { type TBreadcrumb } from '@/types';

import AppLayout from '@/layouts/app-layout/Layout.vue';
import SettingsLayout from '@/layouts/app-layout/SettingLayout.vue';
import { edit } from '@/routes/appearance';

const breadcrumbItems: TBreadcrumb[] = [
    {
        title: 'Appearance settings',
        href: edit().url,
    },
];
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Appearance settings" />

        <SettingsLayout>
            <div class="space-y-6">
                <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                <AppearanceTabs />
            </div>
        </SettingsLayout>
    </AppLayout>
</template>
