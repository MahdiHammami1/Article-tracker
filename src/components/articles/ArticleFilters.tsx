import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArticleStatus } from '@/types/article';
import { getStatusLabel } from '@/data/mockData';

interface ArticleFiltersProps {
  onSearch: (query: string) => void;
  onStatusFilter: (status: ArticleStatus | null) => void;
  selectedStatus: ArticleStatus | null;
}

const statuses: ArticleStatus[] = [
  'DRAFT',
  'SUBMITTED',
  'UNDER_REVIEW',
  'REVISION_REQUIRED',
  'ACCEPTED',
  'REJECTED',
  'PUBLISHED',
];

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

export function ArticleFilters({ onSearch, onStatusFilter, selectedStatus }: ArticleFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? 'default' : 'outline'}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 p-4 bg-secondary/50 rounded-lg animate-slide-up">
          <span className="text-sm font-medium text-muted-foreground mr-2">Status:</span>
          {statuses.map((status) => (
            <Badge
              key={status}
              variant={selectedStatus === status ? getStatusVariant(status) : 'outline'}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onStatusFilter(selectedStatus === status ? null : status)}
            >
              {getStatusLabel(status)}
            </Badge>
          ))}
          {selectedStatus && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStatusFilter(null)}
              className="ml-2"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
