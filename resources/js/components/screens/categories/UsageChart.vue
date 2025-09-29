<script setup lang="ts">
import type { TCategory } from '@/types/models';

import { computed } from 'vue';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/ui/chart-bar';

const props = defineProps<{ categories: TCategory[] }>();

const chartData = computed(() =>
    [...props.categories]
        .sort((a, b) => b.total_amount - a.total_amount)
        .slice(0, 6)
        .map((cat) => ({
            name: cat.name,
            amount: cat.total_amount,
            transactions: cat.transaction_count,
            fill: cat.color,
        })),
);

const chartCategories = ['amount'] as any;
const chartColors = computed(() => chartData.value.map((item) => item.fill));
</script>

<template>
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
</template>
