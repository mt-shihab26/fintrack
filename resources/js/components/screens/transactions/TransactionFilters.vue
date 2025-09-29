<script setup lang="ts">
import { categories } from '@/lib/mock-data';
import { computed } from 'vue';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-vue-next';

export interface TTransactionFilters {
    search: string;
    kind: string;
    category: string;
    dateFrom: string;
    dateTo: string;
    minAmount: string;
    maxAmount: string;
}

interface Props {
    filters: TTransactionFilters;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    filtersChange: [filters: TTransactionFilters];
    clearFilters: [];
}>();

const updateFilter = (key: keyof TTransactionFilters, value: string | number) => {
    emit('filtersChange', { ...props.filters, [key]: String(value) });
};

const handleStringFilter = (key: keyof TTransactionFilters) => (value: string) => {
    updateFilter(key, value);
};

const handleNumberFilter = (key: keyof TTransactionFilters) => (value: string | number) => {
    updateFilter(key, value);
};

const hasActiveFilters = computed(() => {
    return Object.values(props.filters).some((value) => value !== '');
});

const handleClearFilters = () => {
    emit('clearFilters');
};
</script>

<template>
    <div class="space-y-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <Filter class="h-4 w-4" />
                <span class="font-medium">Filters</span>
                <Badge v-if="hasActiveFilters" variant="secondary" class="text-xs"> Active </Badge>
            </div>
            <Button v-if="hasActiveFilters" variant="ghost" size="sm" @click="handleClearFilters">
                <X class="mr-1 h-4 w-4" />
                Clear All
            </Button>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Input placeholder="Search transactions..." :model-value="filters.search" @update:model-value="handleStringFilter('search')" />

            <Select :model-value="filters.kind" @update:model-value="handleStringFilter('kind')">
                <SelectTrigger>
                    <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
            </Select>

            <Select :model-value="filters.category" @update:model-value="handleStringFilter('category')">
                <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.name">
                        {{ cat.name }}
                    </SelectItem>
                </SelectContent>
            </Select>

            <div class="flex gap-2">
                <Input
                    type="number"
                    placeholder="Min amount"
                    :model-value="filters.minAmount"
                    @update:model-value="handleNumberFilter('minAmount')"
                />
                <Input
                    type="number"
                    placeholder="Max amount"
                    :model-value="filters.maxAmount"
                    @update:model-value="handleNumberFilter('maxAmount')"
                />
            </div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="space-y-2">
                <label class="text-sm font-medium">Date From</label>
                <Input type="date" :model-value="filters.dateFrom" @update:model-value="handleStringFilter('dateFrom')" />
            </div>
            <div class="space-y-2">
                <label class="text-sm font-medium">Date To</label>
                <Input type="date" :model-value="filters.dateTo" @update:model-value="handleStringFilter('dateTo')" />
            </div>
        </div>
    </div>
</template>
