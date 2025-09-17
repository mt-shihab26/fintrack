<script setup lang="ts">
import type { Category } from '@/lib/mock-data';

import { computed } from 'vue';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/ui/chart-bar';
import { Activity, FolderOpen, TrendingDown, TrendingUp } from 'lucide-vue-next';

interface Props {
    categories: Category[];
}

const props = defineProps<Props>();

const incomeCategories = computed(() => props.categories.filter((cat) => cat.type === 'income'));
const expenseCategories = computed(() => props.categories.filter((cat) => cat.type === 'expense'));

const totalIncome = computed(() => incomeCategories.value.reduce((sum, cat) => sum + cat.totalAmount, 0));
const totalExpenses = computed(() => expenseCategories.value.reduce((sum, cat) => sum + cat.totalAmount, 0));
const totalTransactions = computed(() => props.categories.reduce((sum, cat) => sum + cat.transactionCount, 0));

const chartData = computed(() =>
    props.categories
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .slice(0, 6)
        .map((cat) => ({
            name: cat.name,
            amount: cat.totalAmount,
            transactions: cat.transactionCount,
            fill: cat.color,
        })),
);

const chartCategories = ['amount'] as any;
const chartColors = computed(() => chartData.value.map((item) => item.fill));
</script>

<template>
    <div class="space-y-6">
        <!-- Overview Cards -->
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
                    <p class="text-xs text-muted-foreground">{{ incomeCategories.length }} categories</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Expense Categories</CardTitle>
                    <TrendingDown class="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">${{ totalExpenses.toLocaleString() }}</div>
                    <p class="text-xs text-muted-foreground">{{ expenseCategories.length }} categories</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Total Transactions</CardTitle>
                    <Activity class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{{ totalTransactions }}</div>
                    <p class="text-xs text-muted-foreground">Across all categories</p>
                </CardContent>
            </Card>
        </div>

        <!-- Category Usage Chart -->
        <Card>
            <CardHeader>
                <CardTitle>Category Usage (Top 6)</CardTitle>
            </CardHeader>
            <CardContent>
                <div class="h-[300px]">
                    <BarChart
                        :data="chartData"
                        :categories="chartCategories"
                        index="name"
                        :colors="chartColors"
                        :y-formatter="(value) => `$${value.toLocaleString()}`"
                        :show-grid-line="true"
                        :show-legend="false"
                        :show-tooltip="true"
                        class="h-full"
                    />
                </div>
            </CardContent>
        </Card>
    </div>
</template>
