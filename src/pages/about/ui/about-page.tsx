export function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="app-container py-6">
        <p className="text-xs font-medium uppercase text-muted-foreground">About</p>

        <h1 className="mt-2 text-subheading text-card-foreground">Star Wars Character Search</h1>

        <div className="mt-6 space-y-4 text-body-sm text-muted-foreground">
          <p>Author: maiano</p>

          <p>This project is built for the RS School React course.</p>
        </div>

        <div className="mt-6">
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-primary transition-colors hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-ring/15"
          >
            RS School React Course
          </a>
        </div>
      </div>
    </main>
  );
}
