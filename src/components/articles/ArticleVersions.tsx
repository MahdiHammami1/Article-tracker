import { ArticleVersion } from '@/types/article';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Clock, GitBranch, Eye, Diff } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleVersionsProps {
  versions: ArticleVersion[];
}

export function ArticleVersions({ versions }: ArticleVersionsProps) {
  const sortedVersions = [...versions].sort((a, b) => b.versionNumber - a.versionNumber);

  return (
    <div className="space-y-4">
      {sortedVersions.map((version, index) => (
        <Card 
          key={version.id}
          className="animate-slide-up overflow-hidden"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-0">
            <div className="flex items-stretch">
              {/* Version indicator */}
              <div className="w-20 gradient-primary flex flex-col items-center justify-center text-primary-foreground py-4">
                <GitBranch className="w-5 h-5 mb-1" />
                <span className="text-lg font-bold">v{version.versionNumber}</span>
              </div>

              {/* Content */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-sm">
                      {version.versionNumber === 1 ? 'Initial Submission' : `Revision ${version.versionNumber - 1}`}
                    </h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {format(version.submittedAt, 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                {version.changeSummary && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {version.changeSummary}
                  </p>
                )}

                {version.diffWithPreviousVersion && (
                  <div className="p-3 rounded-lg bg-secondary/50 mb-3">
                    <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1">
                      <Diff className="w-3 h-3" />
                      Changes from previous version:
                    </p>
                    <p className="text-sm">{version.diffWithPreviousVersion}</p>
                  </div>
                )}

                {/* Files */}
                <div className="flex flex-wrap gap-2">
                  {version.contentFile && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                      <FileText className="w-3.5 h-3.5" />
                      {version.contentFile}
                    </span>
                  )}
                  {version.associatedFiles.map((file) => (
                    <span 
                      key={file}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      {file}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
