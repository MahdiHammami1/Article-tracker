import { FileText, Users, Clock, CheckCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SubmissionsChart } from '@/components/dashboard/SubmissionsChart';
import { StatusDistribution } from '@/components/dashboard/StatusDistribution';
import { ReviewerDecisions } from '@/components/dashboard/ReviewerDecisions';
import { RecentArticles } from '@/components/dashboard/RecentArticles';
import { mockDashboardStats } from '@/data/mockData';

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your research workflow.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Articles"
            value={mockDashboardStats.totalArticles}
            icon={FileText}
            trend={{ value: 12, label: 'vs last month' }}
            delay={0}
          />
          <StatCard
            title="In Review"
            value={mockDashboardStats.articlesInReview}
            icon={Users}
            trend={{ value: 8, label: 'vs last month' }}
            delay={50}
          />
          <StatCard
            title="Published"
            value={mockDashboardStats.articlesPublished}
            icon={CheckCircle}
            trend={{ value: 15, label: 'vs last month' }}
            delay={100}
          />
          <StatCard
            title="Avg. Review Time"
            value={mockDashboardStats.averageReviewTime}
            subtitle="days"
            icon={Clock}
            trend={{ value: -5, label: 'vs last month' }}
            delay={150}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SubmissionsChart />
          <StatusDistribution />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReviewerDecisions />
          <RecentArticles />
        </div>
      </div>
    </AppLayout>
  );
}
