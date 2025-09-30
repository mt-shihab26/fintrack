<script setup lang="ts">
import type { TBudget } from '@/types/models';

import { computed } from 'vue';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Target, TrendingDown, TrendingUp } from 'lucide-vue-next';

interface Props {
    budgets: TBudget[];
}

const props = defineProps<Props>();

const totalBudget = computed(() => props.budgets.reduce((sum, b) => sum + b.amount, 0));
const totalSpent = computed(() => props.budgets.reduce((sum, b) => sum + b.spent, 0));
const totalRemaining = computed(() => totalBudget.value - totalSpent.value);
const overallPercentage = computed(() => (totalSpent.value / totalBudget.value) * 100);

const overBudgetCount = computed(() => props.budgets.filter((b) => (b.spent / b.amount) * 100 > 100).length);
const nearLimitCount = computed(
    () =>
        props.budgets.filter((b) => {
            const percentage = (b.spent / b.amount) * 100;
            return percentage > 80 && percentage <= 100;
        }).length,
);
const onTrackCount = computed(() => props.budgets.filter((b) => (b.spent / b.amount) * 100 <= 80).length);
</script>

<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Total Budget</CardTitle>
                <Target class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">${{ totalBudget.toLocaleString() }}</div>
                <div class="mt-2 space-y-2">
                    <Progress :value="Math.min(overallPercentage, 100)" class="h-2" />
                    <p class="text-xs text-muted-foreground">${{ totalSpent.toLocaleString() }} spent ({{ overallPercentage.toFixed(1) }}%)</p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Remaining</CardTitle>
                <TrendingDown v-if="totalRemaining >= 0" class="h-4 w-4 text-primary" />
                <TrendingUp v-else class="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
                <div :class="`text-2xl font-bold ${totalRemaining >= 0 ? 'text-primary' : 'text-destructive'}`">
                    ${{ Math.abs(totalRemaining).toLocaleString() }}
                </div>
                <p class="text-xs text-muted-foreground">{{ totalRemaining >= 0 ? 'Under budget' : 'Over budget' }}</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">On Track</CardTitle>
                <TrendingDown class="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold text-primary">{{ onTrackCount }}</div>
                <p class="text-xs text-muted-foreground">Budgets under 80%</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">Alerts</CardTitle>
                <AlertTriangle class="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold text-destructive">{{ overBudgetCount + nearLimitCount }}</div>
                <p class="text-xs text-muted-foreground">{{ overBudgetCount }} over, {{ nearLimitCount }} near limit</p>
            </CardContent>
        </Card>
    </div>
</template>
