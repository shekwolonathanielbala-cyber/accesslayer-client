import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardMetaRowProps {
	label: ReactNode;
	value: ReactNode;
	className?: string;
	valueClassName?: string;
	truncateValue?: boolean;
	valueTitle?: string;
}

const CardMetaRow: React.FC<CardMetaRowProps> = ({
	label,
	value,
	className,
	valueClassName,
	truncateValue = true,
	valueTitle,
}) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between gap-3 text-xs',
				className
			)}
		>
			<span className="shrink-0 uppercase tracking-wider text-foreground/40">
				{label}
			</span>
			<span
				title={valueTitle}
				className={cn(
					'font-medium text-foreground/75',
					truncateValue && 'truncate text-right',
					valueClassName
				)}
			>
				{value}
			</span>
		</div>
	);
};

export default CardMetaRow;
