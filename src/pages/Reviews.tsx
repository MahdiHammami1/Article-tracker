import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockArticles, getStatusLabel } from '@/data/mockData';
import { ArticleStatus } from '@/types/article';
import { Clock, FileText, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

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

export default function Reviews() {
  const reviewableArticles = mockArticles.filter(
    a => a.currentStatus === 'UNDER_REVIEW' || a.currentStatus === 'SUBMITTED'
  );

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Pending review assignments and decisions
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="animate-slide-up" style={{ animationDelay: '0ms' }}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-status-review/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-status-review" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '50ms' }}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-status-accepted/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-status-accepted" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Completed This Month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">3.2</p>
                <p className="text-sm text-muted-foreground">Avg. Days per Review</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Queue */}
        <Card className="animate-slide-up" style={{ animationDelay: '150ms' }}>
          <CardHeader>
            <CardTitle>Review Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviewableArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors animate-slide-up"
                  style={{ animationDelay: `${200 + index * 50}ms` }}
                >
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/articles/${article.id}`}
                      className="font-medium hover:text-primary transition-colors line-clamp-1"
                    >
                      {article.title}
                    </Link>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.authors[0]?.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(article.updatedAt, { addSuffix: true })}
                      </span>
                      <Badge variant={getStatusVariant(article.currentStatus)} className="text-xs">
                        {getStatusLabel(article.currentStatus)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="gradient" size="sm">
                      Submit Review
                    </Button>
                  </div>
                </div>
              ))}

              {reviewableArticles.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-status-accepted mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending reviews!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
