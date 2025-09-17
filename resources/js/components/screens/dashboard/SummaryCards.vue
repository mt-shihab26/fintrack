<script setup lang="ts">
import { mockBudgets, mockTransactions } from '@/lib/mock-data';

import { Target, TrendingDown, TrendingUp, Wallet } from 'lucide-vue-next';

import SummaryCard from './SummaryCard.vue';

const totalIncome = mockTransactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

const totalExpenses = mockTransactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

const netBalance = totalIncome - totalExpenses;

const totalBudget = mockBudgets.reduce((sum, b) => sum + b.amount, 0);
const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);
const budgetUtilization = (totalSpent / totalBudget) * 100;
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
            title="Total Income"
            :value="`$${totalIncome.toLocaleString()}`"
            subtitle="+12% from last month"
            :icon="TrendingUp"
            icon-class="text-primary"
            value-class="text-primary"
        />

        <SummaryCard
            title="Total Expenses"
            :value="`$${totalExpenses.toLocaleString()}`"
            subtitle="+8% from last month"
            :icon="TrendingDown"
            icon-class="text-destructive"
            value-class="text-destructive"
        />

        <SummaryCard
            title="Net Balance"
            :value="`$${netBalance.toLocaleString()}`"
            :subtitle="netBalance >= 0 ? 'Positive cash flow' : 'Negative cash flow'"
            :icon="Wallet"
            icon-class="text-accent"
            :value-class="netBalance >= 0 ? 'text-primary' : 'text-destructive'"
        />

        <SummaryCard
            title="Budget Usage"
            :value="`${budgetUtilization.toFixed(1)}%`"
            :subtitle="`$${totalSpent.toLocaleString()} of $${totalBudget.toLocaleString()}`"
            :icon="Target"
            icon-class="text-chart-3"
        />
    </div>
</template>
