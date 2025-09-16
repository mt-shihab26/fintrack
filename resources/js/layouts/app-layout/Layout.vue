<script setup lang="ts">
import type { TBreadcrumb } from '@/types';

import { computed } from 'vue';

import { Head } from '@inertiajs/vue3';

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
    <Head :title="title" />
    <slot />
    <AppShell class="flex-col">
        <AppHeader :breadcrumbs="breadcrumbs" />
        <AppContent>
            <slot />
        </AppContent>
    </AppShell>
</template>
