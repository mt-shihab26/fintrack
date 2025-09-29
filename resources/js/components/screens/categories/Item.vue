<script setup lang="ts">
import type { TCategory } from '@/types/models';

import { useFormat } from '@/composables/use-format';
import { computed } from 'vue';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-vue-next';

const { currency } = useFormat();

const props = defineProps<{
    category: TCategory;
    onEdit: (category: TCategory) => void;
    onDelete: (id: string) => void;
}>();

const averagePerTransaction = computed(() => {
    return props.category.transaction_count > 0 ? props.category.total_amount / props.category.transaction_count : 0;
});
</script>

<template>
    <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <div class="flex items-center space-x-2">
                <div class="h-4 w-4 rounded-full" :style="{ 'background-color': category.color }" />
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
                <Badge :variant="category.kind === 'income' ? 'default' : 'destructive'" class="capitalize">
                    {{ category.kind }}
                </Badge>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center space-x-2">
                    <div>
                        <p class="text-sm text-muted-foreground">Transactions</p>
                        <p class="font-semibold">{{ category.transaction_count }}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <div>
                        <p class="text-sm text-muted-foreground">Total Amount</p>
                        <p :class="`font-semibold ${category.kind === 'income' ? 'text-primary' : 'text-destructive'}`">
                            {{ currency(category.total_amount) }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="text-xs text-muted-foreground">Avg: {{ currency(averagePerTransaction) }} per transaction</div>
        </CardContent>
    </Card>
</template>
