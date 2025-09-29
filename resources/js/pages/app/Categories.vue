<script setup lang="ts">
import type { TCategory } from '@/types/models';

import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import { Plus } from 'lucide-vue-next';

import Form from '@/components/screens/categories/Form.vue';
import List from '@/components/screens/categories/List.vue';
import Stats from '@/components/screens/categories/Stats.vue';

defineProps<{ categories: TCategory[] }>();

const showForm = ref(false);
const categoryForm = ref<TCategory | null>(null);

const edit = (category: TCategory) => {
    categoryForm.value = category;
    showForm.value = true;
};

const cancel = () => {
    showForm.value = false;
    categoryForm.value = null;
};
</script>

<template>
    <AppLayout :breadcrumbs="[{ home: true }, { title: 'Categories' }]">
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-balance">Categories</h1>
                    <p class="text-pretty text-muted-foreground">Organize your transactions with custom categories and track usage statistics.</p>
                </div>
                <Button @click="showForm = true">
                    <Plus class="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>
            <Form v-if="showForm" :category="categoryForm" :cancel="cancel" />
            <Stats :categories="categories" />
            <List :categories="categories" :edit="edit" />
        </div>
    </AppLayout>
</template>
