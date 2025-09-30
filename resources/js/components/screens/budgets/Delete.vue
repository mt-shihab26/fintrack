<script setup lang="ts">
import type { TBudgetCategory } from '@/types/models';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/vue3';
import { Trash2 } from 'lucide-vue-next';

const props = defineProps<{
    budget: TBudgetCategory;
}>();

const destroy = () => {
    router.delete(route('app.budgets.destroy', { budget: props.budget.id }), {
        preserveScroll: true,
    });
};
</script>

<template>
    <DropdownMenuItem @click="destroy" class="text-destructive focus:text-destructive">
        <Trash2 class="mr-2 h-4 w-4" />
        Delete
    </DropdownMenuItem>
</template>