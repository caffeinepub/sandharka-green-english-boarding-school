import { AlertCircle, Bell, Calendar, Loader2 } from "lucide-react";
import type { Notice } from "../backend";
import { useGetAllNotices } from "../hooks/useQueries";

function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <div className="group flex gap-4 p-5 bg-card border border-border rounded-sm hover:border-primary/40 hover:shadow-card transition-all duration-200">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
        <Bell className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-serif font-semibold text-foreground text-base mb-1 group-hover:text-primary transition-colors">
          {notice.title}
        </h4>
        <p className="font-sans text-muted-foreground text-sm leading-relaxed mb-3">
          {notice.content}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
          <Calendar className="w-3.5 h-3.5" />
          <span>{notice.date}</span>
        </div>
      </div>
    </div>
  );
}

export default function Notices() {
  const { data: notices, isLoading, isError } = useGetAllNotices();

  return (
    <section id="notices" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3 border-b-2 border-accent pb-1">
            Announcements
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Latest Notices
          </h2>
          <p className="font-sans text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            Stay updated with the latest announcements, events, and important
            information from the school.
          </p>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-4" />
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="font-sans text-muted-foreground text-sm">
                Loading notices...
              </p>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <p className="font-sans text-muted-foreground text-sm">
                Unable to load notices. Please try again later.
              </p>
            </div>
          )}

          {!isLoading && !isError && notices && notices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 border border-dashed border-border rounded-sm">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                <Bell className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-serif font-semibold text-foreground mb-1">
                  No notices at this time
                </p>
                <p className="font-sans text-muted-foreground text-sm">
                  Check back later for school announcements and updates.
                </p>
              </div>
            </div>
          )}

          {!isLoading && !isError && notices && notices.length > 0 && (
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <NoticeCard key={`${notice.title}-${index}`} notice={notice} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
