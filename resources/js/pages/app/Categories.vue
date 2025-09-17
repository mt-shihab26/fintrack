<script setup lang="ts">
import type { Category } from '@/lib/mock-data';

import { mockCategories } from '@/lib/mock-data';
import { computed, ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppLayout } from '@/layouts/app-layout';
import { Plus, Search } from 'lucide-vue-next';

import CategoryCard from '@/components/screens/categories/CategoryCard.vue';
import CategoryForm from '@/components/screens/categories/CategoryForm.vue';
import CategoryStats from '@/components/screens/categories/CategoryStats.vue';

const categories = ref<Category[]>(mockCategories);
const showForm = ref(false);
const editingCategory = ref<Category | null>(null);
const searchTerm = ref('');
const typeFilter = ref('all');

const filteredCategories = computed(() => {
    return categories.value.filter((category) => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesType = typeFilter.value === 'all' || category.type === typeFilter.value;
        return matchesSearch && matchesType;
    });
});

const handleAddCategory = (categoryData: Omit<Category, 'id' | 'transactionCount' | 'totalAmount'>) => {
    const newCategory: Category = {
        ...categoryData,
        id: Date.now().toString(),
        transactionCount: 0,
        totalAmount: 0,
    };
    categories.value = [...categories.value, newCategory];
    showForm.value = false;
};

const handleEditCategory = (categoryData: Omit<Category, 'id' | 'transactionCount' | 'totalAmount'>) => {
    if (!editingCategory.value) return;

    categories.value = categories.value.map((c) =>
        c.id === editingCategory.value!.id ? { ...categoryData, id: c.id, transactionCount: c.transactionCount, totalAmount: c.totalAmount } : c,
    );
    editingCategory.value = null;
    showForm.value = false;
};

const handleDeleteCategory = (id: string) => {
    categories.value = categories.value.filter((c) => c.id !== id);
};
</script>

<template>
    <AppLayout :breadcrumbs="[{ title: 'Categories' }]">
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-balance">Categories</h1>
                    <p class="text-pretty text-muted-foreground">Organize your transactions with custom categories and track usage statistics.</p>
                </div>
                <Button @click="() => (showForm = true)">
                    <Plus class="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>

            <!-- Category Form -->
            <CategoryForm
                v-if="showForm"
                :category="editingCategory"
                :onSubmit="editingCategory ? handleEditCategory : handleAddCategory"
                :onCancel="
                    () => {
                        showForm = false;
                        editingCategory = null;
                    }
                "
            />

            <!-- Category Statistics -->
            <CategoryStats :categories="categories" />

            <!-- Filters -->
            <div class="flex gap-4">
                <div class="relative flex-1">
                    <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                    <Input v-model="searchTerm" placeholder="Search categories..." class="pl-10" />
                </div>
                <Select v-model="typeFilter">
                    <SelectTrigger class="w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <!-- Categories Grid -->
            <div>
                <div class="mb-4 flex items-center justify-between">
                    <h2 class="text-xl font-semibold">Your Categories</h2>
                    <p class="text-sm text-muted-foreground">Showing {{ filteredCategories.length }} of {{ categories.length }} categories</p>
                </div>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <CategoryCard
                        v-for="category in filteredCategories"
                        :key="category.id"
                        :category="category"
                        :onEdit="
                            (category) => {
                                editingCategory = category;
                                showForm = true;
                            }
                        "
                        :onDelete="handleDeleteCategory"
                    />
                </div>
                <div v-if="filteredCategories.length === 0" class="py-8 text-center text-muted-foreground">
                    <p>
                        {{
                            searchTerm || typeFilter !== 'all'
                                ? 'No categories found matching your criteria.'
                                : 'No categories created yet. Create your first category to start organizing your transactions.'
                        }}
                    </p>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
