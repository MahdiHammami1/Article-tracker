import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleTimeline } from '@/components/articles/ArticleTimeline';
import { ArticleVersions } from '@/components/articles/ArticleVersions';
import { mockArticles, mockVersions, mockLifecycleEvents, getStatusLabel } from '@/data/mockData';
import { ArticleStatus } from '@/types/article';
import { 
  ArrowLeft, 
  Edit, 
  Send, 
  Clock, 
  User, 
  Tag, 
  FileText, 
  GitBranch,
  History,
  Info,
  Upload
} from 'lucide-react';
import { format } from 'date-fns';

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

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  
  const article = mockArticles.find(a => a.id === id);
  const versions = mockVersions.filter(v => v.articleId === id);
  const events = mockLifecycleEvents.filter(e => e.articleId === id);

  if (!article) {
    return (
      <AppLayout>
        <div className="p-8 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Article not found</h1>
          <Button asChild>
            <Link to="/articles">Back to Articles</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
          </Button>

          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant={getStatusVariant(article.currentStatus)} className="text-sm">
                  {getStatusLabel(article.currentStatus)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  v{article.currentVersionNumber}
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight mb-3">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {article.authors.map(a => a.name).join(', ')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Updated {format(article.updatedAt, 'MMM d, yyyy')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {article.currentStatus === 'DRAFT' && (
                <Button variant="gradient">
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              )}
              {article.currentStatus === 'REVISION_REQUIRED' && (
                <Button variant="gradient">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Revision
                </Button>
              )}
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="animate-slide-up">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <Info className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="versions" className="gap-2">
              <GitBranch className="w-4 h-4" />
              Versions ({versions.length})
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <History className="w-4 h-4" />
              Timeline ({events.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Abstract */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Abstract</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {article.abstract}
                  </p>
                </CardContent>
              </Card>

              {/* Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Keywords
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {article.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-xs font-medium"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                      Authors
                    </p>
                    <div className="space-y-2">
                      {article.authors.map((author) => (
                        <div key={author.id} className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                            {author.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{author.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{author.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Created</p>
                        <p className="font-medium">{format(article.createdAt, 'MMM d, yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Last Updated</p>
                        <p className="font-medium">{format(article.updatedAt, 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Version */}
            {versions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Current Version Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {versions
                      .find(v => v.versionNumber === article.currentVersionNumber)
                      ?.contentFile && (
                      <Button variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" />
                        {versions.find(v => v.versionNumber === article.currentVersionNumber)?.contentFile}
                      </Button>
                    )}
                    {versions
                      .find(v => v.versionNumber === article.currentVersionNumber)
                      ?.associatedFiles.map(file => (
                        <Button key={file} variant="outline" className="gap-2">
                          <FileText className="w-4 h-4" />
                          {file}
                        </Button>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="versions">
            <ArticleVersions versions={versions} />
          </TabsContent>

          <TabsContent value="timeline">
            <ArticleTimeline events={events} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
