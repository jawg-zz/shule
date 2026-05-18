import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-700 text-white text-sm font-bold">
              S
            </div>
            <span className="text-xl font-bold">Shule</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-green-700 transition-colors">Features</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-green-700 transition-colors">About</a>
            <Link
              href="/login"
              className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-800 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Modern School Management
            <span className="block text-green-700 mt-2">for Kenyan Schools</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Shule is a comprehensive, AI-powered platform designed for the Kenyan education system.
            Manage students, academics (CBC & 8-4-4), fees, staff, and more — all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-md bg-green-700 px-8 py-2 text-sm font-medium text-white shadow hover:bg-green-800 transition-colors"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-white px-8 py-2 text-sm font-medium shadow-sm hover:bg-accent transition-colors"
            >
              Learn More
            </a>
          </div>
        </section>

        <section id="features" className="border-t bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold">Everything your school needs</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              Built specifically for the Kenyan CBC and 8-4-4 curricula
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-xl border bg-card p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer id="about" className="border-t bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-green-700 text-white text-xs font-bold">
                S
              </div>
              <span className="font-bold">Shule</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Shule School Management System. Built for Kenyan schools.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

const features = [
  {
    title: "CBC Competency Tracking",
    description: "Full CBC support with strands, sub-strands, competencies, and performance level reporting (Exceeds to Below Expectations).",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 6.231-4.41 52.36 52.36 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0 2.658-.116A48.62 48.62 0 0 1 12 12.322a48.62 48.62 0 0 1 3.232-.291 50.66 50.66 0 0 0 2.658.116m-15.482 0A20.16 20.16 0 0 1 12 2.08a20.16 20.16 0 0 1 9.742 6.067M4.26 10.147A20.908 20.908 0 0 1 12 4.579a20.908 20.908 0 0 1 7.74 5.568" /></svg>,
  },
  {
    title: "KCSE & KCPE Analysis",
    description: "Automatic grade calculation (A=12pts to E=1pt), mean scores, cluster filtering, and university placement projections.",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  },
  {
    title: "Fee Management & M-Pesa",
    description: "Kenyan fee structures, invoice generation, M-Pesa Daraja API integration (STK Push, C2B), balance tracking, and statements.",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  },
  {
    title: "Student & Staff Management",
    description: "UPI & NEMIS tracking, TSC numbers, admission management, staff payroll, leave, and TPAD integration.",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>,
  },
  {
    title: "Timetable & Attendance",
    description: "Smart timetable builder with conflict detection, student & staff attendance tracking with reports.",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  },
  {
    title: "AI-Powered Analytics",
    description: "Predictive analytics for at-risk students, fee default prediction, performance trends, and smart insights.",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" /></svg>,
  },
];
