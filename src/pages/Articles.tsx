import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ArticleFilters } from '@/components/articles/ArticleFilters';
import { mockArticles } from '@/data/mockData';
import { ArticleStatus } from '@/types/article';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ArticleStatus | null>(null);

  // local articles state so we can append new articles in the UI
  const [articles, setArticles] = useState(() => mockArticles);

  // dialog state and form fields for creating a new article
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAbstract, setNewAbstract] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [newStatus, setNewStatus] = useState<ArticleStatus>('DRAFT');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch = !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = !selectedStatus || article.currentStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [articles, searchQuery, selectedStatus]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    const newArticle = {
      id: String(Date.now()),
      title: newTitle || 'Untitled',
      abstract: newAbstract || '',
      keywords: newKeywords ? newKeywords.split(',').map(k => k.trim()).filter(Boolean) : [],
      currentStatus: newStatus,
      // fill other fields with defaults so ArticleCard can render
      authors: [],
      versions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      currentVersionNumber: 1,
      submittedBy: 'current-user',
    } as any;

    setArticles(prev => [newArticle, ...prev]);
    // reset form and close
    setNewTitle('');
    setNewAbstract('');
    setNewKeywords('');
    setNewStatus('DRAFT');
    setDialogOpen(false);
  };

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Articles</h1>
            <p className="text-muted-foreground mt-1">Manage and track your research articles</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Article</DialogTitle>
                <DialogDescription>Add a new article to your tracker.</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreate} className="grid gap-4 py-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Article title" />
                </div>

                <div>
                  <label className="text-sm font-medium">Abstract</label>
                  <Textarea value={newAbstract} onChange={e => setNewAbstract(e.target.value)} placeholder="Short abstract" />
                </div>

                <div>
                  <label className="text-sm font-medium">Keywords (comma separated)</label>
                  <Input value={newKeywords} onChange={e => setNewKeywords(e.target.value)} placeholder="e.g. ml, vision" />
                </div>

                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select className="mt-1 w-full rounded-md border px-3 py-2" value={newStatus} onChange={e => setNewStatus(e.target.value as ArticleStatus)}>
                    <option value={'DRAFT'}>Draft</option>
                    <option value={'SUBMITTED'}>Submitted</option>
                    <option value={'UNDER_REVIEW'}>Under review</option>
                    <option value={'REVISION_REQUIRED'}>Revision required</option>
                    <option value={'ACCEPTED'}>Accepted</option>
                    <option value={'REJECTED'}>Rejected</option>
                    <option value={'PUBLISHED'}>Published</option>
                  </select>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost" type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <ArticleFilters
            onSearch={setSearchQuery}
            onStatusFilter={setSelectedStatus}
            selectedStatus={selectedStatus}
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4 animate-fade-in">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-muted-foreground">No articles found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchQuery('');
              setSelectedStatus(null);
            }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
