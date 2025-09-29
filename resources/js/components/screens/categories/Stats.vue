<script setup lang="ts">
import type { TCategory } from '@/types/models';

import { computed } from 'vue';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, FolderOpen, TrendingDown, TrendingUp } from 'lucide-vue-next';

const props = defineProps<{ categories: TCategory[] }>();

const incomeCategories = computed(() => props.categories.filter((cat) => cat.kind === 'income'));
const expenseCategories = computed(() => props.categories.filter((cat) => cat.kind === 'expense'));

const totalIncome = computed(() => incomeCategories.value.reduce((sum, cat) => sum + cat.total_amount, 0));
const totalExpenses = computed(() => expenseCategories.value.reduce((sum, cat) => sum + cat.total_amount, 0));
const totalAmount = computed(() => props.categories.reduce((sum, cat) => sum + cat.total_amount, 0));

const countIncomeTransactions = computed(() => incomeCategories.value.reduce((sum, cat) => sum + cat.transaction_count, 0));
const countExpensesTransactions = computed(() => expenseCategories.value.reduce((sum, cat) => sum + cat.transaction_count, 0));
const countTransactions = computed(() => props.categories.reduce((sum, cat) => sum + cat.transaction_count, 0));
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Total Categories</CardTitle>
                <FolderOpen class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ categories.length }}</div>
                <p class="text-xs text-muted-foreground">{{ incomeCategories.length }} income, {{ expenseCategories.length }} expense</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Income Categories</CardTitle>
                <TrendingUp class="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold text-primary">${{ totalIncome.toLocaleString() }}</div>
                <p class="text-xs text-muted-foreground">{{ incomeCategories.length }} categories, {{ countIncomeTransactions }} transactions</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Expense Categories</CardTitle>
                <TrendingDown class="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold text-destructive">${{ totalExpenses.toLocaleString() }}</div>
                <p class="text-xs text-muted-foreground">{{ expenseCategories.length }} categories, {{ countExpensesTransactions }} transactions</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Total Transactions</CardTitle>
                <Activity class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">${{ totalAmount.toLocaleString() }}</div>
                <p class="text-xs text-muted-foreground">{{ countTransactions }} Transactions Across all categories</p>
            </CardContent>
        </Card>
    </div>
</template>
