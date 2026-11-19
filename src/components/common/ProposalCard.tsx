import { Link } from 'react-router';
import { ArrowUpRight, Clock } from 'lucide-react';
import QuorumIndicator from '@/components/common/QuorumIndicator';
import type { Proposal } from '@/types/governance';
import { cn } from '@/lib/utils';
import {
	getEligibleVotingWeight,
	getProposalOptions,
	getProposalVoteTotal,
} from '@/utils/governance.utils';
import { formatCompactNumber } from '@/utils/numberFormat.utils';

interface ProposalCardProps {
	proposal: Proposal;
	className?: string;
}

const statusClasses: Record<Proposal['status'], string> = {
	active: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
	closed: 'border-foreground/15 bg-foreground/10 text-foreground/60',
	passed: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
	rejected: 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400',
	executed: 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400',
	cancelled: 'border-foreground/10 bg-foreground/[0.04] text-foreground/40',
};

function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

/**
 * Proposal card with quorum progress indicator (#826, #922).
 *
 * Shows the proposal title, description, per-option vote weights, the voting
 * window, and a quorum progress bar so voters can see whether participation is
 * on track before voting ends. The whole card links to the detail page.
 */
const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, className }) => {
	const isActive = proposal.status === 'active';
	const options = getProposalOptions(proposal);
	const totalVotes = getProposalVoteTotal(proposal);
	const eligibleVotingWeight = getEligibleVotingWeight(proposal);

	return (
		<Link
			to={`/governance/${encodeURIComponent(proposal.id)}`}
			aria-label={`View ${proposal.title}`}
			className={cn(
				'group block rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] p-5 transition-all duration-200 hover:border-amber-500/30 hover:bg-foreground/[0.05]',
				className
			)}
		>
			<div className="mb-3 flex items-start justify-between gap-3">
				<h3 className="font-jakarta text-base font-bold leading-snug text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-200">
					{proposal.title}
				</h3>
				<div className="flex shrink-0 items-center gap-2">
					<span
						className={cn(
							'rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold capitalize',
							statusClasses[proposal.status]
						)}
					>
						{proposal.status}
					</span>
					<ArrowUpRight className="size-4 text-foreground/30 transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-300" />
				</div>
			</div>

			<p className="mb-4 line-clamp-2 text-sm leading-relaxed text-foreground/60">
				{proposal.description ||
					'No additional proposal details were provided.'}
			</p>

			<div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground/50">
				{options.map(option => (
					<span
						key={option.label}
						className="inline-flex items-center gap-1"
					>
						<span className="max-w-28 truncate">{option.label}</span>
						<span className="font-medium text-foreground/70">
							{formatCompactNumber(option.weight)}
						</span>
					</span>
				))}
				<span className="ml-auto tabular-nums text-foreground/40">
					{formatCompactNumber(totalVotes)} weight
				</span>
			</div>

			{isActive && (
				<QuorumIndicator
					quorumBps={proposal.quorumBps}
					totalVotingWeight={totalVotes}
					totalCirculatingSupply={eligibleVotingWeight}
					className="mt-4"
				/>
			)}

			<div className="mt-4 flex items-center gap-1.5 text-xs text-foreground/35">
				<Clock className="size-3" aria-hidden="true" />
				<span>
					{formatDate(proposal.startDate)} — {formatDate(proposal.endDate)}
				</span>
			</div>
		</Link>
	);
};

export default ProposalCard;
