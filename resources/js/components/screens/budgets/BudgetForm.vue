<script setup lang="ts">
import type { TBudget } from '@/types/models';

import { categories } from '@/lib/mock-data';
import { computed, ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    budget?: TBudget | null;
    onSubmit: (budget: Omit<TBudget, 'id' | 'spent'>) => void;
    onCancel: () => void;
}

const props = defineProps<Props>();

const formData = ref({
    category: props.budget?.category || '',
    amount: props.budget?.amount?.toString() || '',
    period: props.budget?.period || 'monthly',
});

const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onSubmit({
        category: formData.value.category,
        amount: Number.parseFloat(formData.value.amount),
        period: formData.value.period as 'monthly' | 'weekly',
    });
};

const expenseCategories = computed(() => categories.filter((cat) => cat.kind === 'expense'));
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ budget ? 'Edit Budget' : 'Create New Budget' }}</CardTitle>
        </CardHeader>
        <CardContent>
            <form @submit="handleSubmit" class="space-y-4">
                <div class="space-y-2">
                    <Label for="category">Category</Label>
                    <Select v-model="formData.category">
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="cat in expenseCategories" :key="cat.id" :value="cat.name">
                                {{ cat.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="amount">Budget Amount</Label>
                        <Input id="amount" v-model="formData.amount" type="number" step="0.01" placeholder="0.00" required />
                    </div>

                    <div class="space-y-2">
                        <Label for="period">Period</Label>
                        <Select v-model="formData.period">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div class="flex gap-2 pt-4">
                    <Button type="submit" class="flex-1">
                        {{ budget ? 'Update Budget' : 'Create Budget' }}
                    </Button>
                    <Button type="button" variant="outline" @click="onCancel"> Cancel </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
