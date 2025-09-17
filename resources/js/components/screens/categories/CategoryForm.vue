<script setup lang="ts">
import type { Category } from '@/lib/mock-data';

import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
    category?: Category | null;
    onSubmit: (category: Omit<Category, 'id' | 'transactionCount' | 'totalAmount'>) => void;
    onCancel: () => void;
}

const props = defineProps<Props>();

const colorOptions = [
    { value: '#059669', label: 'Green', class: 'bg-emerald-600' },
    { value: '#dc2626', label: 'Red', class: 'bg-red-600' },
    { value: '#f59e0b', label: 'Orange', class: 'bg-amber-500' },
    { value: '#7c3aed', label: 'Purple', class: 'bg-violet-600' },
    { value: '#4b5563', label: 'Gray', class: 'bg-gray-600' },
    { value: '#10b981', label: 'Teal', class: 'bg-emerald-500' },
    { value: '#3b82f6', label: 'Blue', class: 'bg-blue-500' },
    { value: '#ef4444', label: 'Rose', class: 'bg-rose-500' },
    { value: '#8b5cf6', label: 'Indigo', class: 'bg-indigo-500' },
    { value: '#06b6d4', label: 'Cyan', class: 'bg-cyan-500' },
];

const formData = ref({
    name: props.category?.name || '',
    type: props.category?.type || 'expense',
    color: props.category?.color || '#059669',
});

const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onSubmit({
        name: formData.value.name,
        type: formData.value.type as 'income' | 'expense',
        color: formData.value.color,
    });
};
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ category ? 'Edit Category' : 'Create New Category' }}</CardTitle>
        </CardHeader>
        <CardContent>
            <form @submit="handleSubmit" class="space-y-4">
                <div class="space-y-2">
                    <Label for="name">Category Name</Label>
                    <Input id="name" v-model="formData.name" placeholder="Enter category name" required />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="type">Type</Label>
                        <Select v-model="formData.type">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="expense">Expense</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div class="space-y-2">
                        <Label for="color">Color</Label>
                        <Select v-model="formData.color">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="color in colorOptions" :key="color.value" :value="color.value">
                                    <div class="flex items-center gap-2">
                                        <div :class="`h-4 w-4 rounded-full ${color.class}`" />
                                        {{ color.label }}
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div class="flex items-center gap-2 rounded-lg bg-muted p-3">
                    <div class="h-6 w-6 rounded-full" :style="{ backgroundColor: formData.color }" />
                    <span class="font-medium">{{ formData.name || 'Category Name' }}</span>
                    <span class="text-sm text-muted-foreground capitalize">({{ formData.type }})</span>
                </div>

                <div class="flex gap-2 pt-4">
                    <Button type="submit" class="flex-1">
                        {{ category ? 'Update Category' : 'Create Category' }}
                    </Button>
                    <Button type="button" variant="outline" @click="onCancel"> Cancel </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
