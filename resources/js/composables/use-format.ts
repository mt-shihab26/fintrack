import { computed } from 'vue';

export const useFormat = () => {
    const currency = computed(() => {
        return (amount: number) => {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BDT' }).format(amount);
        };
    });

    return {
        currency,
    };
};
