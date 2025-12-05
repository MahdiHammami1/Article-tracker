import { LifecycleEvent, ArticleStatus } from '@/types/article';
import { getStatusLabel } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Send, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Globe,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ArticleTimelineProps {
  events: LifecycleEvent[];
}

const getStatusIcon = (status: ArticleStatus) => {
  const icons: Record<ArticleStatus, React.ElementType> = {
    DRAFT: FileText,
    SUBMITTED: Send,
    UNDER_REVIEW: Users,
    REVISION_REQUIRED: AlertCircle,
    ACCEPTED: CheckCircle,
    REJECTED: XCircle,
    PUBLISHED: Globe,
  };
  return icons[status];
};

const getStatusVariant = (status: ArticleStatus) => {
  const variants: Record<ArticleStatus, "draft" | "submitted" | "review" | "revision" | "accepted" | "rejected" | "published"> = {
    DRAFT: 'draft',
    SUBMITTED: 'submitted',
    UNDER_REVIEW: 'review',
    REVISION_REQUIRED: 'revision',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
  };
  return variants[status];
};

const getStatusBgColor = (status: ArticleStatus) => {
  const colors: Record<ArticleStatus, string> = {
    DRAFT: 'bg-muted',
    SUBMITTED: 'bg-status-submitted',
    UNDER_REVIEW: 'bg-status-review',
    REVISION_REQUIRED: 'bg-status-revision',
    ACCEPTED: 'bg-status-accepted',
    REJECTED: 'bg-status-rejected',
    PUBLISHED: 'bg-status-published',
  };
  return colors[status];
};

export function ArticleTimeline({ events }: ArticleTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
      
      <div className="space-y-6">
        {events.map((event, index) => {
          const Icon = getStatusIcon(event.newState);
          
          return (
            <div 
              key={event.id} 
              className="relative pl-16 animate-slide-in-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot */}
              <div className={cn(
                "absolute left-4 w-5 h-5 rounded-full border-2 border-background flex items-center justify-center",
                getStatusBgColor(event.newState)
              )}>
                <Icon className="w-2.5 h-2.5 text-primary-foreground" />
              </div>

              {/* Content */}
              <div className="p-4 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    {event.oldState && (
                      <>
                        <Badge variant={getStatusVariant(event.oldState)} className="text-xs">
                          {getStatusLabel(event.oldState)}
                        </Badge>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      </>
                    )}
                    <Badge variant={getStatusVariant(event.newState)} className="text-xs">
                      {getStatusLabel(event.newState)}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {format(event.timestamp, 'MMM d, yyyy h:mm a')}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {event.reason}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-medium">{event.changedByName}</span>
                  <span className="capitalize px-1.5 py-0.5 rounded bg-secondary">
                    {event.changedByRole}
                  </span>
                  {event.versionNumber && (
                    <span>v{event.versionNumber}</span>
                  )}
                </div>

                {event.changedFiles.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Files changed:</p>
                    <div className="flex flex-wrap gap-1">
                      {event.changedFiles.map((file) => (
                        <span 
                          key={file}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary text-xs"
                        >
                          <FileText className="w-3 h-3" />
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
