<script setup lang="ts">
import type { Category } from '@/lib/mock-data';

import { computed } from 'vue';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DollarSign, Edit, MoreHorizontal, Receipt, Trash2 } from 'lucide-vue-next';

interface Props {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
}

const props = defineProps<Props>();

const averagePerTransaction = computed(() => {
    return props.category.transactionCount > 0 ? (props.category.totalAmount / props.category.transactionCount).toFixed(2) : '0.00';
});
</script>

<template>
    <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <div class="flex items-center space-x-2">
                <div class="h-4 w-4 rounded-full" :style="{ backgroundColor: category.color }" />
                <CardTitle class="text-base font-medium">{{ category.name }}</CardTitle>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal class="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="onEdit(category)">
                        <Edit class="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="onDelete(category.id)" class="text-destructive focus:text-destructive">
                        <Trash2 class="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardHeader>
        <CardContent class="space-y-4">
            <div class="flex items-center justify-between">
                <Badge :variant="category.type === 'income' ? 'default' : 'secondary'" class="capitalize">
                    {{ category.type }}
                </Badge>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center space-x-2">
                    <Receipt class="h-4 w-4 text-muted-foreground" />
                    <div>
                        <p class="text-sm text-muted-foreground">Transactions</p>
                        <p class="font-semibold">{{ category.transactionCount }}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <DollarSign class="h-4 w-4 text-muted-foreground" />
                    <div>
                        <p class="text-sm text-muted-foreground">Total Amount</p>
                        <p :class="`font-semibold ${category.type === 'income' ? 'text-primary' : 'text-foreground'}`">
                            ${{ category.totalAmount.toLocaleString() }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="text-xs text-muted-foreground">Avg: ${{ averagePerTransaction }} per transaction</div>
        </CardContent>
    </Card>
</template>
