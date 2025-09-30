<script setup lang="ts">
import type { TIndexBudget } from '@/types/props';

import { ref } from 'vue';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

defineProps<{
    budgets: TIndexBudget[];
}>();

const selectedPeriod = ref('6months');
</script>

<template>
    <Card>
        <CardHeader class="flex flex-row items-center justify-between">
            <CardTitle>Budget vs Spent Comparison</CardTitle>
            <Select v-model="selectedPeriod">
                <SelectTrigger class="w-32">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
            </Select>
        </CardHeader>
        <CardContent>
            <div class="h-[300px]"></div>
        </CardContent>
    </Card>
</template>
