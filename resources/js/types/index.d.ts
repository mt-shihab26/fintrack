import type { InertiaLinkProps } from '@inertiajs/vue3';
import type { LucideIcon } from 'lucide-vue-next';

export type TBreadcrumb = {
    title?: string;
    href?: string;
    home?: boolean;
};

export type TNavItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon;
    isActive?: boolean;
};

export type TAppProps = {
    name: string;
    auth: { user: TUser };
    flash: { success: string; error: string };
};
