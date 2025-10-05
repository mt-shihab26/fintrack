<script setup lang="ts">
import type { TTransaction } from '@/types/models';

import { transactions } from '@/lib/mock-data';
import { computed, ref } from 'vue';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDownRight, ArrowUpRight, Download, Edit, MoreHorizontal, Trash2 } from 'lucide-vue-next';

const props = defineProps<{
    transactions: TTransaction[];
}>();

const emit = defineEmits<{
    edit: [transaction: TTransaction];
}>();

const selectedIds = ref<number[]>([]);

const toggleSelection = (id: number) => {
    if (selectedIds.value.includes(id)) {
        selectedIds.value = selectedIds.value.filter((i) => i !== id);
    } else {
        selectedIds.value = [...selectedIds.value, id];
    }
};

const toggleSelectAll = () => {
    selectedIds.value = selectedIds.value.length === props.transactions.length ? [] : props.transactions.map((t) => t.id);
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
};

const formatAmount = (amount: number) => {
    return amount.toLocaleString();
};

const isAllSelected = computed(() => selectedIds.value.length === props.transactions.length && props.transactions.length > 0);

const handleExport = () => {
    const csvContent = [
        ['Date', 'Kind', 'Category', 'Description', 'Amount', 'Tags'].join(','),
        ...transactions.map((t) => [t.date, t.kind, t.category, `"${t.description}"`, t.amount, `"${t.tags?.join('; ') || ''}"`].join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
};
</script>

<template>
    <div class="flex items-center justify-between">
        <p class="text-sm text-muted-foreground">Showing {{ transactions.length }} of {{ transactions.length }} transactions</p>
    </div>

    <div class="space-y-4">
        <div v-if="selectedIds.length > 0" class="flex items-center justify-between rounded-lg bg-muted p-4">
            <span class="text-sm font-medium">{{ selectedIds.length }} transactions selected</span>
            <div class="flex gap-2">
                <Button variant="destructive" size="sm" @click="() => {}">
                    <Trash2 class="mr-1 h-4 w-4" />
                    Delete Selected
                </Button>
                <Button variant="outline" size="sm" @click="handleExport">
                    <Download class="mr-1 h-4 w-4" />
                    Export Selected
                </Button>
            </div>
        </div>

        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-12">
                            <Checkbox :checked="isAllSelected" @update:checked="toggleSelectAll" />
                        </TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead class="w-12"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="transaction in transactions" :key="transaction.id">
                        <TableCell>
                            <Checkbox :checked="selectedIds.includes(transaction.id)" @update:checked="toggleSelection(transaction.id)" />
                        </TableCell>
                        <TableCell>
                            <div class="flex items-center gap-2">
                                <div
                                    :class="[
                                        'rounded-full p-1',
                                        transaction.kind === 'income' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive',
                                    ]"
                                >
                                    <ArrowUpRight v-if="transaction.kind === 'income'" class="h-3 w-3" />
                                    <ArrowDownRight v-else class="h-3 w-3" />
                                </div>
                                <span class="text-sm capitalize">{{ transaction.kind }}</span>
                            </div>
                        </TableCell>
                        <TableCell class="font-medium">{{ transaction.description }}</TableCell>
                        <TableCell>
                            <Badge variant="secondary">{{ transaction.category }}</Badge>
                        </TableCell>
                        <TableCell>
                            <span :class="['font-semibold', transaction.kind === 'income' ? 'text-primary' : 'text-foreground']">
                                {{ transaction.kind === 'income' ? '+' : '-' }}${{ formatAmount(transaction.amount) }}
                            </span>
                        </TableCell>
                        <TableCell>{{ formatDate(transaction.date) }}</TableCell>
                        <TableCell>
                            <div class="flex flex-wrap gap-1">
                                <Badge v-for="tag in transaction.tags?.slice(0, 2)" :key="tag" variant="outline" class="text-xs">
                                    {{ tag }}
                                </Badge>
                                <Badge v-if="(transaction.tags?.length || 0) > 2" variant="outline" class="text-xs">
                                    +{{ (transaction.tags?.length || 0) - 2 }}
                                </Badge>
                            </div>
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal class="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem @click="emit('edit', transaction)">
                                        <Edit class="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="() => {}" class="text-destructive focus:text-destructive">
                                        <Trash2 class="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div v-if="transactions.length === 0" class="py-8 text-center text-muted-foreground">
            <p>No transactions found matching your criteria.</p>
        </div>
    </div>
</template>
