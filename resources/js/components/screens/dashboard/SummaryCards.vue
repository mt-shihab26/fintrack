<script setup lang="ts">
import { mockBudgets, mockTransactions } from '@/lib/mock-data';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingDown, TrendingUp, Wallet } from 'lucide-vue-next';

const totalIncome = mockTransactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

const totalExpenses = mockTransactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

const netBalance = totalIncome - totalExpenses;

const totalBudget = mockBudgets.reduce((sum, b) => sum + b.amount, 0);
const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);
const budgetUtilization = (totalSpent / totalBudget) * 100;
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Total Income</CardTitle>
                <TrendingUp class="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold text-primary">${{ totalIncome.toLocaleString() }}</div>
                <p class="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Total Expenses</CardTitle>
                <TrendingDown class="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold text-destructive">${{ totalExpenses.toLocaleString() }}</div>
                <p class="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Net Balance</CardTitle>
                <Wallet class="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
                <div :class="`text-2xl font-bold ${netBalance >= 0 ? 'text-primary' : 'text-destructive'}`">${{ netBalance.toLocaleString() }}</div>
                <p class="text-xs text-muted-foreground">{{ netBalance >= 0 ? 'Positive' : 'Negative' }} cash flow</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Budget Usage</CardTitle>
                <Target class="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">{{ budgetUtilization.toFixed(1) }}%</div>
                <p class="text-xs text-muted-foreground">${{ totalSpent.toLocaleString() }} of ${{ totalBudget.toLocaleString() }}</p>
            </CardContent>
        </Card>
    </div>
</template>
