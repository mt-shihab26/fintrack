<script setup lang="ts">
import { AppLayout } from '@/layouts/app-layout';
</script>

<template>
    <AppLayout :breadcrumbs="[{ title: 'Dashboard' }]">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">Hello</div>
    </AppLayout>
</template>
