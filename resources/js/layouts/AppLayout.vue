<script setup lang="ts">
import type { TBreadcrumb } from '@/types';

import AppHeaderLayout from '@/layouts/app/AppHeaderLayout.vue';

interface Props {
    breadcrumbs?: TBreadcrumb[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <AppHeaderLayout :breadcrumbs="breadcrumbs">
        <slot />
    </AppHeaderLayout>
</template>
