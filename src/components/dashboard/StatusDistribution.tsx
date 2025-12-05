import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { mockDashboardStats } from '@/data/mockData';

const COLORS = {
  DRAFT: 'hsl(220, 9%, 46%)',
  SUBMITTED: 'hsl(217, 91%, 60%)',
  UNDER_REVIEW: 'hsl(43, 96%, 56%)',
  REVISION_REQUIRED: 'hsl(28, 87%, 55%)',
  ACCEPTED: 'hsl(142, 71%, 45%)',
  REJECTED: 'hsl(0, 84%, 60%)',
  PUBLISHED: 'hsl(162, 73%, 46%)',
};

const LABELS = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  REVISION_REQUIRED: 'Revision Required',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  PUBLISHED: 'Published',
};

export function StatusDistribution() {
  const data = Object.entries(mockDashboardStats.statusDistribution).map(([key, value]) => ({
    name: LABELS[key as keyof typeof LABELS],
    value,
    color: COLORS[key as keyof typeof COLORS],
  }));

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <CardTitle>Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
              <Legend 
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
