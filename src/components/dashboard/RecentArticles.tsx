import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockArticles, getStatusLabel } from '@/data/mockData';
import { ArticleStatus } from '@/types/article';
import { formatDistanceToNow } from 'date-fns';

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

export function RecentArticles() {
  const recentArticles = mockArticles.slice(0, 5);

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '500ms' }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Articles</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/articles">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="block group"
            >
              <div 
                className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${600 + index * 50}ms` }}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>{article.authors[0]?.name}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(article.updatedAt, { addSuffix: true })}
                    </span>
                    <span>v{article.currentVersionNumber}</span>
                  </div>
                </div>
                <Badge variant={getStatusVariant(article.currentStatus)}>
                  {getStatusLabel(article.currentStatus)}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
