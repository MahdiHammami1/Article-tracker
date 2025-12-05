import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmissionsChart } from '@/components/dashboard/SubmissionsChart';
import { StatusDistribution } from '@/components/dashboard/StatusDistribution';
import { ReviewerDecisions } from '@/components/dashboard/ReviewerDecisions';
import { mockDashboardStats, mockArticles } from '@/data/mockData';
import { Download, FileSpreadsheet, FileText, TrendingUp, Clock, Users } from 'lucide-react';

export default function Analytics() {
  // Calculate some additional metrics
  const avgVersionsPerArticle = mockArticles.reduce((sum, a) => sum + a.currentVersionNumber, 0) / mockArticles.length;
  
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Detailed metrics and insights for your research workflow
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="animate-slide-up" style={{ animationDelay: '0ms' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Acceptance Rate</p>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-status-accepted">+5% vs last quarter</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-status-accepted/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-status-accepted" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '50ms' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Review Time</p>
                  <p className="text-2xl font-bold">{mockDashboardStats.averageReviewTime}d</p>
                  <p className="text-xs text-status-accepted">-3 days vs last month</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Revisions</p>
                  <p className="text-2xl font-bold">{avgVersionsPerArticle.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">per article</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-status-revision/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-status-revision" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '150ms' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Reviewers</p>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">this month</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-status-review/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-status-review" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SubmissionsChart />
          <StatusDistribution />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ReviewerDecisions />
          
          {/* Top Performers */}
          <Card className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Articles with Longest Review Cycles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockArticles
                  .filter(a => a.currentVersionNumber > 1)
                  .sort((a, b) => b.currentVersionNumber - a.currentVersionNumber)
                  .slice(0, 5)
                  .map((article, index) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="flex-1 min-w-0 mr-4">
                        <p className="text-sm font-medium truncate">{article.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {article.authors[0]?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{article.currentVersionNumber}</p>
                        <p className="text-xs text-muted-foreground">versions</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
