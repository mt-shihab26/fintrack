import type { NavItem } from '@/types';

import { dashboard } from '@/routes';

import { LayoutGrid, User } from 'lucide-vue-next';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

export const footerNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/profile',
        icon: User,
    },
];
