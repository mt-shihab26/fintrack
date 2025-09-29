<script setup lang="ts">
import type { TCategory } from '@/types/models';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal } from 'lucide-vue-next';

import Delete from './Delete.vue';

defineProps<{
    category: TCategory;
    edit: (category: TCategory) => void;
}>();
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm">
                <MoreHorizontal class="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem @click="edit(category)">
                <Edit class="mr-2 h-4 w-4" />
                Edit
            </DropdownMenuItem>
            <Delete :category="category" />
        </DropdownMenuContent>
    </DropdownMenu>
</template>
