import { cn } from '@/lib/utils';
import { TruncatedText } from '@/components/ui/truncated-text';

interface CategoryTagProps {
	label?: string;
	className?: string;
}

const CategoryTag: React.FC<CategoryTagProps> = ({
	label = 'No category',
	className,
}) => {
	return (
		<span
			className={cn(
				'inline-flex max-w-full items-center rounded-md border border-foreground/15 bg-foreground/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/80',
				className
			)}
		>
			<TruncatedText
				text={label}
				className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/80"
				maxWidth={120}
			/>
		</span>
	);
};

export default CategoryTag;
