import { useState, useEffect, useRef } from "react";
import {
  Bookmark,
  Share2,
  ArrowLeft,
  MapPin,
  Star,
  Library,
  FlaskConical,
  Building2,
  Dumbbell,
  Wifi,
  UtensilsCrossed,
  Stethoscope,
  Bus,
  TrendingUp,
  Briefcase,
  ChevronDown,
  Search,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { collegeData } from "../data/collegeData";
import Newsletter from "./Newsletter";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "Courses" },
  { id: "admissions", label: "Admissions" },
  { id: "placements", label: "Placements" },
  { id: "reviews", label: "Reviews" },
];

const facilityIcons = {
  Library, Labs: FlaskConical, Hostel: Building2, Sports: Dumbbell,
  WiFi: Wifi, Cafeteria: UtensilsCrossed, Medical: Stethoscope, Transport: Bus,
};

function Counter({ end, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}

function FacilityCard({ name }) {
  const Icon = facilityIcons[name] || Building2;
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-white/50 p-3 transition-all hover:scale-105 hover:shadow-md dark:bg-gray-800/50">
      <Icon className="h-5 w-5 text-indigo-500" />
      <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">{name}</span>
    </div>
  );
}

export default function CollegePage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [courseSearch, setCourseSearch] = useState("");
  const [showAllRecruiters, setShowAllRecruiters] = useState(false);

  const filteredCourses = collegeData.courses.filter(
    (c) =>
      c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.degree.toLowerCase().includes(courseSearch.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollPos) setActiveSection(s.id);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
  };

  const { name, location, rating, reviewCount, interestedCount, nirfRank,
    matchScore, type, nba, naac, avgPackage, highestPackage, annualFees,
    about, website, facilities, acceptedExams, courses, placements,
    placementHistory, reviews } = collegeData;

  return (
    <main className="relative flex-1">
      <div className="mx-auto max-w-6xl px-4">
        {/* Back link */}
        <div className="pt-6">
          <a href="#" className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-indigo-500 dark:text-gray-400">
            <ArrowLeft className="h-4 w-4" />
            Back to Colleges
          </a>
        </div>

        {/* Hero */}
        <section className="py-6">
          <div className="glass-card overflow-hidden rounded-2xl border border-border/60">
            <div className="relative bg-gradient-to-br from-indigo-500/10 via-cyan-400/5 to-transparent p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-1 gap-5">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-white p-1.5 shadow-sm dark:bg-gray-800">
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-2xl font-bold text-white">
                      IIT
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-300">
                        NIRF #{nirfRank}
                      </span>
                      <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-[11px] font-bold text-green-600 dark:text-green-300">
                        {matchScore}% Match
                      </span>
                      <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-600 dark:text-blue-300">
                        {type}
                      </span>
                      {nba && (
                        <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-bold text-purple-600 dark:text-purple-300">
                          NBA
                        </span>
                      )}
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-300">
                        NAAC {naac}
                      </span>
                    </div>
                    <h1 className="mt-2 font-heading text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                      {name}
                    </h1>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                        {location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        {rating} ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
                      </span>
                      <span>{interestedCount}+ interested</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white/75 px-3.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-800/75 dark:text-gray-300">
                        <Bookmark className="h-3.5 w-3.5" />
                        Save
                      </button>
                      <button className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white/75 px-3.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-800/75 dark:text-gray-300">
                        <Share2 className="h-3.5 w-3.5" />
                        Share
                      </button>
                      <button className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-all hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300">
                        ⚔️ Compare
                      </button>
                      <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-1.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-border/60 bg-white/50 px-4 py-3 dark:bg-gray-800/50">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    Avg Package
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ₹<Counter end={avgPackage} />L
                  </div>
                  <div className="text-[10px] text-green-600 dark:text-green-400">
                    ↑ Top 10% in India
                  </div>
                </div>
                <div className="rounded-xl border border-border/60 bg-white/50 px-4 py-3 dark:bg-gray-800/50">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                    <TrendingUp className="h-3 w-3 text-amber-500" />
                    Highest Package
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ₹<Counter end={highestPackage} />L
                  </div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400">
                    Industry Leader
                  </div>
                </div>
                <div className="rounded-xl border border-border/60 bg-white/50 px-4 py-3 dark:bg-gray-800/50">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                    <Briefcase className="h-3 w-3 text-indigo-500" />
                    Annual Fees
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    ₹{annualFees}L
                  </div>
                  <div className="text-[10px] text-gray-400">Per annum</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky section nav */}
        <div className="sticky top-[4.5rem] z-40 -mx-4 border-b border-border/60 bg-white/80 px-4 backdrop-blur-xl dark:bg-gray-900/80">
          <div className="flex gap-1 overflow-x-auto py-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeSection === s.id
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="py-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Main */}
            <div className="space-y-10 lg:col-span-3">
              {/* Overview */}
              <section id="overview">
                <h2 className="mb-4 font-heading text-xl font-semibold text-gray-900 dark:text-white">
                  About the College
                </h2>
                <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {about}
                </p>

                <h3 className="mb-3 mt-6 font-heading text-base font-semibold text-gray-900 dark:text-white">
                  Campus Facilities
                </h3>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
                  {facilities.map((f) => (
                    <FacilityCard key={f} name={f} />
                  ))}
                </div>

                <h3 className="mb-3 mt-6 font-heading text-base font-semibold text-gray-900 dark:text-white">
                  Accepted Entrance Exams
                </h3>
                <div className="flex flex-wrap gap-2">
                  {acceptedExams.map((exam) => (
                    <span key={exam} className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300">
                      {exam}
                    </span>
                  ))}
                </div>
              </section>

              {/* Courses */}
              <section id="courses">
                <h2 className="mb-4 font-heading text-xl font-semibold text-gray-900 dark:text-white">
                  Courses Offered
                </h2>

                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    className="h-10 w-full rounded-full border border-border/70 bg-white/75 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800/75 dark:text-white"
                  />
                </div>

                <div className="overflow-x-auto rounded-xl border border-border/60">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-border/60 bg-gray-50 dark:bg-gray-800/50">
                        {["Course Name", "Degree", "Duration", "Fees/Year", "Seats"].map((h) => (
                          <th key={h} className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map((course, i) => (
                        <tr key={i} className="border-b border-border/40 transition hover:bg-gray-50 dark:hover:bg-gray-800/30">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{course.name}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{course.degree}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{course.duration}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">₹{course.fees}L</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{course.seats}</td>
                        </tr>
                      ))}
                      {filteredCourses.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                            No courses match your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Showing {filteredCourses.length} of {courses.length} courses
                </p>
              </section>

              {/* Admissions */}
              <section id="admissions">
                <h2 className="mb-4 font-heading text-xl font-semibold text-gray-900 dark:text-white">
                  Admissions & Cutoffs
                </h2>
                <div className="glass-card rounded-xl border border-border/60 p-6">
                  <h3 className="mb-2 font-heading text-base font-semibold text-gray-900 dark:text-white">
                    Eligibility Criteria
                  </h3>
                  <p className="mb-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    Visit the official website for detailed eligibility requirements, minimum percentages, age limits, and category-wise cutoffs.
                  </p>
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-400"
                  >
                    View Official Website
                  </a>
                </div>
              </section>

              {/* Placements */}
              <section id="placements">
                <h2 className="mb-4 font-heading text-xl font-semibold text-gray-900 dark:text-white">
                  Placement Statistics
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Average Package", value: `₹${placements.avgPackage}L`, year: placements.year, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
                    { label: "Highest Package", value: `₹${placements.highestPackage}L`, year: placements.year, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
                    { label: "Placement Rate", value: `${placements.placementRate}%`, year: placements.year, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-500/10" },
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-xl border border-border/60 p-4 ${stat.bg}`}>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label} ({stat.year})</p>
                      <p className={`mt-1 text-xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="mt-6 rounded-xl border border-border/60 bg-white/50 p-6 dark:bg-gray-800/50">
                  <h3 className="mb-4 font-heading text-base font-semibold text-gray-900 dark:text-white">
                    Placement Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={placementHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                      <Bar dataKey="avgPackage" name="Avg Package (₹L)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="highestPackage" name="Highest Package (₹L)" fill="#34d399" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Recruiters */}
                <h3 className="mb-3 mt-6 font-heading text-base font-semibold text-gray-900 dark:text-white">
                  Top Recruiters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(showAllRecruiters ? placements.recruiters : placements.recruiters.slice(0, 8)).map((r) => (
                    <span key={r} className="rounded-full border border-border/60 bg-white/50 px-3.5 py-1 text-sm font-medium text-gray-700 shadow-sm dark:bg-gray-800/50 dark:text-gray-300">
                      {r}
                    </span>
                  ))}
                  {placements.recruiters.length > 8 && (
                    <button
                      onClick={() => setShowAllRecruiters(!showAllRecruiters)}
                      className="inline-flex items-center gap-1 rounded-full border border-indigo-500/30 px-3.5 py-1 text-sm font-medium text-indigo-600 transition-all hover:bg-indigo-500/10 dark:text-indigo-300"
                    >
                      {showAllRecruiters ? "Show Less" : `+${placements.recruiters.length - 8} more`}
                      <ChevronDown className={`h-3 w-3 transition-transform ${showAllRecruiters ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
              </section>

              {/* Reviews */}
              <section id="reviews">
                <h2 className="mb-4 font-heading text-xl font-semibold text-gray-900 dark:text-white">
                  Student Reviews
                </h2>

                <div className="mb-6 flex flex-wrap items-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">{rating}</div>
                    <div className="mt-1 flex items-center justify-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-3.5 w-3.5 ${star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300 dark:text-gray-600"}`} />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Based on {reviewCount} student review{reviewCount !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = star === 5 ? 1 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="w-3 text-xs text-gray-500">{star}</span>
                          <Star className="h-3 w-3 text-yellow-500" />
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div className="h-full rounded-full bg-yellow-500" style={{ width: `${(count / reviewCount) * 100}%` }} />
                          </div>
                          <span className="w-4 text-xs text-gray-400">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {reviews.map((review) => (
                  <div key={review.id} className="glass-card rounded-xl border border-border/60 p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{review.author}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{review.year} · {review.program}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-3 w-3 ${star <= review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300 dark:text-gray-600"}`} />
                        ))}
                      </div>
                    </div>
                    <h4 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{review.title}</h4>
                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{review.body}</p>
                  </div>
                ))}
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass-card rounded-xl border border-border/60 p-5">
                <h3 className="mb-3 font-heading text-sm font-semibold text-gray-900 dark:text-white">
                  Quick Stats
                </h3>
                <div className="space-y-2.5">
                  {[
                    { label: "NIRF Rank", value: `#${nirfRank}` },
                    { label: "Total Courses", value: courses.length },
                    { label: "Avg Package", value: `₹${avgPackage}L` },
                    { label: "Placement Rate", value: `${placements.placementRate}%` },
                    { label: "Annual Fees", value: `₹${annualFees}L` },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl border border-border/60 p-5">
                <h3 className="mb-3 font-heading text-sm font-semibold text-gray-900 dark:text-white">
                  Similar Colleges
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "IIT Delhi", rank: 2, location: "New Delhi" },
                    { name: "IIT Bombay", rank: 3, location: "Mumbai" },
                    { name: "IIT Kanpur", rank: 4, location: "Kanpur" },
                    { name: "IIT Kharagpur", rank: 5, location: "Kharagpur" },
                  ].map((college) => (
                    <a key={college.name} href="#" className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 text-xs font-bold text-indigo-600 dark:text-indigo-300">
                        {college.name.split(" ")[1]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{college.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">NIRF #{college.rank} · {college.location}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mx-auto max-w-6xl px-4">
        <Newsletter />
      </div>
    </main>
  );
}
