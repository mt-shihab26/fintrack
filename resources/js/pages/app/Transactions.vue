<script setup lang="ts">
import type { TCategory, TTransaction } from '@/types/models';
import type { TTransactionFilters } from '@/types/utils';

import { computed, ref } from 'vue';

import { Filters, Form, List } from '@/components/screens/transactions';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import { Plus } from 'lucide-vue-next';

const props = defineProps<{
    transactions: TTransaction[];
    categories: TCategory[];
}>();

const showForm = ref(false);
const editingTransaction = ref<TTransaction | undefined>(undefined);

const filters = ref<TTransactionFilters>({
    search: '',
    kind: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
});

const filteredTransactions = computed(() => {
    return props.transactions.filter((transaction) => {
        // Search filter
        if (filters.value.search && !transaction.description.toLowerCase().includes(filters.value.search.toLowerCase())) {
            return false;
        }

        // Type filter
        if (filters.value.kind && transaction.kind !== filters.value.kind) {
            return false;
        }

        // Category filter
        if (filters.value.category && transaction.category !== filters.value.category) {
            return false;
        }

        // Date range filter
        if (filters.value.dateFrom && transaction.date < filters.value.dateFrom) {
            return false;
        }
        if (filters.value.dateTo && transaction.date > filters.value.dateTo) {
            return false;
        }

        // Amount range filter
        if (filters.value.minAmount && transaction.amount < Number.parseFloat(filters.value.minAmount)) {
            return false;
        }
        if (filters.value.maxAmount && transaction.amount > Number.parseFloat(filters.value.maxAmount)) {
            return false;
        }

        return true;
    });
});

const clearFilters = () => {
    filters.value = {
        search: '',
        kind: '',
        category: '',
        dateFrom: '',
        dateTo: '',
        minAmount: '',
        maxAmount: '',
    };
};

const handleEditClick = (transaction: TTransaction) => {
    editingTransaction.value = transaction;
    showForm.value = true;
};

const handleFormCancel = () => {
    showForm.value = false;
    editingTransaction.value = undefined;
};
</script>

<template>
    <AppLayout :breadcrumbs="[{ home: true }, { title: 'Transactions' }]">
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-balance">Transactions</h1>
                    <p class="text-pretty text-muted-foreground">Manage your income and expenses with detailed tracking and filtering.</p>
                </div>
                <div class="flex gap-2">
                    <Button @click="showForm = true">
                        <Plus class="mr-2 h-4 w-4" />
                        Add Transaction
                    </Button>
                </div>
            </div>
            <Form v-if="showForm" :transaction="editingTransaction" @submit="() => {}" @cancel="handleFormCancel" />
            <Filters :filters="filters" @filters-change="filters = $event" @clear-filters="clearFilters" />
            <List :transactions="filteredTransactions" @edit="handleEditClick" />
        </div>
    </AppLayout>
</template>
