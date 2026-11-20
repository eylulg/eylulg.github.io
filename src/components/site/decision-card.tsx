import { Card, CardBody, CardHeader } from '@eylulg/ui/card';
import type { Decision } from '@/content/project-details';

export function DecisionCard({ title, body }: Decision) {
  return (
    <Card className='h-full'>
      <CardHeader title={title} headingLevel={3} />
      <CardBody>
        <p className='text-md text-tertiary'>{body}</p>
      </CardBody>
    </Card>
  );
}
