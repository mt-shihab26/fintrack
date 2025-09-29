<script setup lang="ts">
import type { TUser } from '@/types/models';

import { getInitials } from '@/lib/utils';
import { ref } from 'vue';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Error } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-vue-next';

defineProps<{
    user: TUser;
    error?: string;
    modelValue?: File | null;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', file: File | null): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
</script>

<template>
    <div class="grid gap-4">
        <Label>Profile Avatar</Label>
        <div class="flex items-center gap-6">
            <Avatar class="h-20 w-20">
                <AvatarImage :src="user.avatar || ''" :alt="user.name" />
                <AvatarFallback class="text-lg">{{ getInitials(user.name || 'U') }}</AvatarFallback>
            </Avatar>

            <div class="flex flex-col gap-2">
                <input ref="fileInput" type="file" accept="image/*" class="hidden" @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement)?.files?.[0] || null)" />
                <Button type="button" variant="outline" @click="fileInput?.click()" class="flex items-center gap-2" data-test="upload-avatar-button">
                    <Upload class="h-4 w-4" />
                    Choose photo
                </Button>
                <p class="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
            </div>
        </div>
        <Error v-if="error" :message="error" />
    </div>
</template>
