<script setup lang="ts">
import type { Budget } from '@/lib/mock-data';

import { mockBudgets } from '@/lib/mock-data';
import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-vue-next';

import BudgetCard from '@/components/screens/budgets/BudgetCard.vue';
import BudgetForm from '@/components/screens/budgets/BudgetForm.vue';
import BudgetHistory from '@/components/screens/budgets/BudgetHistory.vue';
import BudgetOverview from '@/components/screens/budgets/BudgetOverview.vue';
import { AppLayout } from '@/layouts/app-layout';

const budgets = ref<Budget[]>(mockBudgets);
const showForm = ref(false);
const editingBudget = ref<Budget | null>(null);

const handleAddBudget = (budgetData: Omit<Budget, 'id' | 'spent'>) => {
    const newBudget: Budget = {
        ...budgetData,
        id: Date.now().toString(),
        spent: 0,
    };
    budgets.value = [...budgets.value, newBudget];
    showForm.value = false;
};

const handleEditBudget = (budgetData: Omit<Budget, 'id' | 'spent'>) => {
    if (!editingBudget.value) return;

    budgets.value = budgets.value.map((b) => (b.id === editingBudget.value!.id ? { ...budgetData, id: b.id, spent: b.spent } : b));
    editingBudget.value = null;
    showForm.value = false;
};

const handleDeleteBudget = (id: string) => {
    budgets.value = budgets.value.filter((b) => b.id !== id);
};
</script>

<template>
    <AppLayout :breadcrumbs="[{ home: true }, { title: 'Budgets' }]">
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-balance">Budget Management</h1>
                    <p class="text-pretty text-muted-foreground">Set spending limits, track progress, and stay on top of your financial goals.</p>
                </div>
                <Button @click="() => (showForm = true)">
                    <Plus class="mr-2 h-4 w-4" />
                    Create Budget
                </Button>
            </div>

            <!-- Budget Form -->
            <BudgetForm
                v-if="showForm"
                :budget="editingBudget"
                :onSubmit="editingBudget ? handleEditBudget : handleAddBudget"
                :onCancel="
                    () => {
                        showForm = false;
                        editingBudget = null;
                    }
                "
            />

            <!-- Budget Overview -->
            <BudgetOverview :budgets="budgets" />

            <!-- Budget Cards -->
            <div>
                <h2 class="mb-4 text-xl font-semibold">Your Budgets</h2>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <BudgetCard
                        v-for="budget in budgets"
                        :key="budget.id"
                        :budget="budget"
                        :onEdit="
                            (budget) => {
                                editingBudget = budget;
                                showForm = true;
                            }
                        "
                        :onDelete="handleDeleteBudget"
                    />
                </div>
                <div v-if="budgets.length === 0" class="py-8 text-center text-muted-foreground">
                    <p>No budgets created yet. Create your first budget to start tracking your spending limits.</p>
                </div>
            </div>

            <!-- Budget History -->
            <BudgetHistory v-if="budgets.length > 0" />
        </div>
    </AppLayout>
</template>
