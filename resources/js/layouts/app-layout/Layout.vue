<script setup lang="ts">
import type { TBreadcrumb } from '@/types';

import { computed } from 'vue';

import { Head } from '@inertiajs/vue3';
import { BaseLayout } from '../base-layout';

import AppContent from './AppContent.vue';
import AppHeader from './AppHeader.vue';
import AppShell from './AppShell.vue';

const props = defineProps<{
    breadcrumbs: TBreadcrumb[];
}>();

const title = computed(() => {
    return props.breadcrumbs && props.breadcrumbs.length > 0 ? props.breadcrumbs[props.breadcrumbs.length - 1].title : '';
});
</script>

<template>
    <BaseLayout>
        <Head :title="title" />
        <AppShell class="flex-col">
            <AppHeader :breadcrumbs="breadcrumbs" />
            <AppContent>
                <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl px-4 py-8">
                    <slot />
                </div>
            </AppContent>
        </AppShell>
    </BaseLayout>
</template>
