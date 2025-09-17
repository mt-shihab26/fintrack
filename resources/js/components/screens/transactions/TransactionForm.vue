<script setup lang="ts">
import type { TTransaction } from '@/lib/mock-data';

import { mockCategories } from '@/lib/mock-data';
import { computed, ref } from 'vue';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-vue-next';

interface Props {
    transaction?: TTransaction;
}

interface Emits {
    (e: 'submit', transaction: Omit<TTransaction, 'id'>): void;
    (e: 'cancel'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formData = ref({
    type: props.transaction?.type || 'expense',
    amount: props.transaction?.amount?.toString() || '',
    category: props.transaction?.category || '',
    description: props.transaction?.description || '',
    date: props.transaction?.date || new Date().toISOString().split('T')[0],
    tags: props.transaction?.tags || [],
});

const newTag = ref('');

const handleSubmit = (e: Event) => {
    e.preventDefault();
    emit('submit', {
        type: formData.value.type as 'income' | 'expense',
        amount: Number.parseFloat(formData.value.amount),
        category: formData.value.category,
        description: formData.value.description,
        date: formData.value.date,
        tags: formData.value.tags,
    });
};

const addTag = () => {
    if (newTag.value.trim() && !formData.value.tags.includes(newTag.value.trim())) {
        formData.value.tags.push(newTag.value.trim());
        newTag.value = '';
    }
};

const removeTag = (tagToRemove: string) => {
    formData.value.tags = formData.value.tags.filter((tag) => tag !== tagToRemove);
};

const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTag();
    }
};

const availableCategories = computed(() => mockCategories.filter((cat) => cat.type === formData.value.type));
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ transaction ? 'Edit Transaction' : 'Add New Transaction' }}</CardTitle>
        </CardHeader>
        <CardContent>
            <form @submit="handleSubmit" class="space-y-4">
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
                        <Label for="amount">Amount</Label>
                        <Input id="amount" type="number" step="0.01" placeholder="0.00" v-model="formData.amount" required />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label for="category">Category</Label>
                        <Select v-model="formData.category">
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="cat in availableCategories" :key="cat.id" :value="cat.name">
                                    {{ cat.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div class="space-y-2">
                        <Label for="date">Date</Label>
                        <Input id="date" type="date" v-model="formData.date" required />
                    </div>
                </div>

                <div class="space-y-2">
                    <Label for="description">Description</Label>
                    <textarea
                        id="description"
                        class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        placeholder="Enter transaction description"
                        v-model="formData.description"
                        required
                    />
                </div>

                <div class="space-y-2">
                    <Label>Tags</Label>
                    <div class="mb-2 flex flex-wrap gap-2">
                        <Badge v-for="tag in formData.tags" :key="tag" variant="secondary" class="flex items-center gap-1">
                            {{ tag }}
                            <X class="h-3 w-3 cursor-pointer" @click="removeTag(tag)" />
                        </Badge>
                    </div>
                    <div class="flex gap-2">
                        <Input placeholder="Add tag" v-model="newTag" @keypress="handleKeyPress" />
                        <Button type="button" variant="outline" size="sm" @click="addTag">
                            <Plus class="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div class="flex gap-2 pt-4">
                    <Button type="submit" class="flex-1">
                        {{ transaction ? 'Update Transaction' : 'Add Transaction' }}
                    </Button>
                    <Button type="button" variant="outline" @click="emit('cancel')"> Cancel </Button>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
