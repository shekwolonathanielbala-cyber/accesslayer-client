import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CreatorLabeledStatRowProps {
	label: ReactNode;
	value: ReactNode;
	className?: string;
	labelClassName?: string;
	valueClassName?: string;
}

const CreatorLabeledStatRow: React.FC<CreatorLabeledStatRowProps> = ({
	label,
	value,
	className,
	labelClassName,
	valueClassName,
}) => {
	return (
		<div
			className={cn(
				'group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-4 backdrop-blur-md transition-all duration-300 hover:border-amber-500/30 hover:bg-foreground/[0.06] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
				className
			)}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
			<div className="relative z-10 flex items-start justify-between gap-4">
				<div
					className={cn(
						'text-[0.65rem] font-bold uppercase tracking-[0.22em] text-foreground/40 transition-colors duration-300 group-hover:text-amber-700/50 dark:group-hover:text-amber-200/50',
						labelClassName
					)}
				>
					{label}
				</div>
				<div
					className={cn(
						'text-right font-jakarta text-base font-bold text-foreground md:text-[1.05rem]',
						valueClassName
					)}
				>
					{value}
				</div>
			</div>
		</div>
	);
};

export default CreatorLabeledStatRow;
