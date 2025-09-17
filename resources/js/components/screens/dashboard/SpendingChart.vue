<script setup lang="ts">
import { mockCategories } from '@/lib/mock-data';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DonutChart } from '@/components/ui/chart-donut';

const expenseCategories = mockCategories.filter((cat) => cat.type === 'expense');

const data = expenseCategories.map((cat) => ({
    name: cat.name,
    total: cat.totalAmount,
}));

const colors = expenseCategories.map((cat) => cat.color);
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
            <DonutChart index="name" :category="'total'" :data="data" :colors="colors" :type="'pie'" />
        </CardContent>
    </Card>
</template>
