import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Tag, FileText, ArrowRight } from 'lucide-react';
import { Article, ArticleStatus } from '@/types/article';
import { getStatusLabel } from '@/data/mockData';
import { formatDistanceToNow, format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

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

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <Card 
      hover 
      className="overflow-hidden animate-slide-up group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <Link to={`/articles/${article.id}`}>
              <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
          </div>
          <Badge variant={getStatusVariant(article.currentStatus)}>
            {getStatusLabel(article.currentStatus)}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {article.abstract}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {article.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-xs font-medium"
            >
              <Tag className="w-3 h-3 mr-1" />
              {keyword}
            </span>
          ))}
          {article.keywords.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{article.keywords.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {article.authors[0]?.name}
              {article.authors.length > 1 && ` +${article.authors.length - 1}`}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              v{article.currentVersionNumber}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDistanceToNow(article.updatedAt, { addSuffix: true })}
            </span>
          </div>
          <Button variant="ghost" size="sm" asChild className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Link to={`/articles/${article.id}`}>
              View <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
