import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CreatorProfileStatItemProps {
	label: string;
	value: ReactNode;
	helperText?: ReactNode;
	className?: string;
}

const CreatorProfileStatItem: React.FC<CreatorProfileStatItemProps> = ({
	label,
	value,
	helperText,
	className,
}) => {
	const accessibleLabel = typeof value === 'string' ? `${label}: ${value}` : undefined;

	return (
		<div
			className={cn(
				'group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-4 backdrop-blur-md transition-all duration-300 hover:border-amber-500/30 hover:bg-foreground/[0.06] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
				className
			)}
			aria-label={accessibleLabel}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
			<p
				className="relative z-10 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-foreground/40 transition-colors duration-300 group-hover:text-amber-700/50 dark:group-hover:text-amber-200/50"
				aria-hidden={accessibleLabel ? 'true' : 'false'}
			>
				{label}
			</p>
			<div className="relative z-10 mt-2.5 min-w-[4rem] font-jakarta text-base font-bold text-foreground md:text-[1.05rem]">
				{value}
			</div>
			{helperText && (
				<p className="relative z-10 mt-1.5 text-xs text-foreground/45">
					{helperText}
				</p>
			)}
		</div>
	);
};

export default CreatorProfileStatItem;
