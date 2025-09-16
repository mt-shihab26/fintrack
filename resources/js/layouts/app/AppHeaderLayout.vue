<script setup lang="ts">
import type { TBreadcrumb } from '@/types';

import AppContent from '@/components/AppContent.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppShell from '@/components/AppShell.vue';

type TProps = {
    breadcrumbs?: TBreadcrumb[];
};

withDefaults(defineProps<TProps>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <AppShell class="flex-col">
        <AppHeader :breadcrumbs="breadcrumbs" />
        <AppContent>
            <slot />
        </AppContent>
    </AppShell>
</template>
