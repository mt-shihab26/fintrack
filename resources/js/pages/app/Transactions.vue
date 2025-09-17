<script setup lang="ts">
import type { TTransactionFilters } from '@/components/transactions/screens/TransactionFilters.vue';
import type { TTransaction } from '@/lib/mock-data';

import { mockTransactions } from '@/lib/mock-data';
import { computed, ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLayout } from '@/layouts/app-layout';
import { Download, Plus } from 'lucide-vue-next';

import TransactionFilters from '@/components/screens/transactions/TransactionFilters.vue';
import TransactionForm from '@/components/screens/transactions/TransactionForm.vue';
import TransactionTable from '@/components/screens/transactions/TransactionTable.vue';

const transactions = ref<TTransaction[]>([...mockTransactions]);
const showForm = ref(false);
const editingTransaction = ref<TTransaction | undefined>(undefined);
const filters = ref<TTransactionFilters>({
    search: '',
    type: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
});

const filteredTransactions = computed(() => {
    return transactions.value.filter((transaction) => {
        // Search filter
        if (filters.value.search && !transaction.description.toLowerCase().includes(filters.value.search.toLowerCase())) {
            return false;
        }

        // Type filter
        if (filters.value.type && transaction.type !== filters.value.type) {
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

const handleAddTransaction = (transactionData: Omit<TTransaction, 'id'>) => {
    const newTransaction: TTransaction = {
        ...transactionData,
        id: Date.now().toString(),
    };
    transactions.value = [newTransaction, ...transactions.value];
    showForm.value = false;
};

const handleEditTransaction = (transactionData: Omit<TTransaction, 'id'>) => {
    if (!editingTransaction.value) return;

    transactions.value = transactions.value.map((t) => (t.id === editingTransaction.value!.id ? { ...transactionData, id: t.id } : t));
    editingTransaction.value = undefined;
    showForm.value = false;
};

const handleDeleteTransaction = (id: string) => {
    transactions.value = transactions.value.filter((t) => t.id !== id);
};

const handleBulkDelete = (ids: string[]) => {
    transactions.value = transactions.value.filter((t) => !ids.includes(t.id));
};

const handleExport = () => {
    const csvContent = [
        ['Date', 'Type', 'Category', 'Description', 'Amount', 'Tags'].join(','),
        ...filteredTransactions.value.map((t) =>
            [t.date, t.type, t.category, `"${t.description}"`, t.amount, `"${t.tags?.join('; ') || ''}"`].join(','),
        ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
};

const clearFilters = () => {
    filters.value = {
        search: '',
        type: '',
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
    <AppLayout :breadcrumbs="[{ title: 'Transactions' }]">
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-balance">Transactions</h1>
                    <p class="text-pretty text-muted-foreground">Manage your income and expenses with detailed tracking and filtering.</p>
                </div>
                <div class="flex gap-2">
                    <Button variant="outline" @click="handleExport">
                        <Download class="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                    <Button @click="showForm = true">
                        <Plus class="mr-2 h-4 w-4" />
                        Add Transaction
                    </Button>
                </div>
            </div>

            <!-- Transaction Form -->
            <TransactionForm
                v-if="showForm"
                :transaction="editingTransaction"
                @submit="editingTransaction ? handleEditTransaction : handleAddTransaction"
                @cancel="handleFormCancel"
            />

            <!-- Filters -->
            <Card>
                <CardHeader>
                    <CardTitle>Filter Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <TransactionFilters :filters="filters" @filters-change="filters = $event" @clear-filters="clearFilters" />
                </CardContent>
            </Card>

            <!-- Results Summary -->
            <div class="flex items-center justify-between">
                <p class="text-sm text-muted-foreground">Showing {{ filteredTransactions.length }} of {{ transactions.length }} transactions</p>
            </div>

            <!-- Transaction Table -->
            <TransactionTable
                :transactions="filteredTransactions"
                @edit="handleEditClick"
                @delete="handleDeleteTransaction"
                @bulk-delete="handleBulkDelete"
                @export="handleExport"
            />
        </div>
    </AppLayout>
</template>
