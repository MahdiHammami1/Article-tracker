export type ArticleStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'UNDER_REVIEW' 
  | 'REVISION_REQUIRED'
  | 'ACCEPTED' 
  | 'REJECTED' 
  | 'PUBLISHED';

export type UserRole = 'author' | 'reviewer' | 'editor' | 'admin';

export interface Author {
  id: string;
  name: string;
  email: string;
  affiliation?: string;
  role: 'primary' | 'corresponding' | 'contributor';
}

export interface Article {
  id: string;
  title: string;
  abstract: string;
  keywords: string[];
  authors: Author[];
  createdAt: Date;
  updatedAt: Date;
  currentVersionNumber: number;
  currentStatus: ArticleStatus;
  submittedBy: string;
}

export interface ArticleVersion {
  id: string;
  articleId: string;
  versionNumber: number;
  submittedAt: Date;
  contentFile?: string;
  associatedFiles: string[];
  changeSummary?: string;
  diffWithPreviousVersion?: string;
}

export interface LifecycleEvent {
  id: string;
  articleId: string;
  versionNumber: number;
  oldState: ArticleStatus | null;
  newState: ArticleStatus;
  changedBy: string;
  changedByName: string;
  changedByRole: UserRole;
  reason?: string;
  timestamp: Date;
  changedFiles: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface DashboardStats {
  totalArticles: number;
  articlesInReview: number;
  articlesPublished: number;
  averageReviewTime: number;
  statusDistribution: Record<ArticleStatus, number>;
  monthlySubmissions: { month: string; count: number }[];
  reviewerDecisions: { decision: string; count: number }[];
}
