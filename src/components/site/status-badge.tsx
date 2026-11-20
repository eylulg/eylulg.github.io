import { Badge } from '@eylulg/ui/badge';
import type { ProjectStatus } from '@/content/projects';

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge dot size='sm' color={status === 'live' ? 'success' : 'gray'}>
      {status === 'live' ? 'Live' : 'In progress'}
    </Badge>
  );
}
