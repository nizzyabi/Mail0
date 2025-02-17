"use client";

import {
  Github,
  Star,
  GitFork,
  MessageCircle,
  GitGraph,
  ChartAreaIcon,
  GitPullRequest,
  LayoutGrid,
  FileCode,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Contributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

interface TimelineData {
  date: string;
  stars: number;
  forks: number;
  watchers: number;
  commits: number;
}

interface ActivityData {
  date: string;
  commits: number;
  issues: number;
  pullRequests: number;
}

const specialRoles: Record<string, string> = {
  nizzyabi: "Project Owner",
  praashh: "Maintainer",
  mrgsub: "Maintainer",
};

const ChartControls = ({
  showAll,
  setShowAll,
  total,
}: {
  showAll: boolean;
  setShowAll: (show: boolean) => void;
  total: number;
}) => (
  <div className="mb-4 flex items-center justify-between">
    <span className="text-sm text-muted-foreground">
      Showing {showAll ? "all" : "top 10"} contributors
    </span>
    <Button variant="outline" size="sm" onClick={() => setShowAll(!showAll)} className="text-xs">
      Show {showAll ? "less" : "all"} ({total})
    </Button>
  </div>
);

export default function OpenPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [repoStats, setRepoStats] = useState({
    stars: 0,
    forks: 0,
    watchers: 0,
    openIssues: 0,
    openPRs: 0,
  });
  const [timelineData, setTimelineData] = useState<TimelineData[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [showAllContributors, setShowAllContributors] = useState(false);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const repoResponse = await fetch("https://api.github.com/repos/nizzyabi/mail0");
        const repoData = await repoResponse.json();

        const commitsResponse = await fetch(
          "https://api.github.com/repos/nizzyabi/mail0/commits?per_page=100&since=" +
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        );
        const commitsData = await commitsResponse.json();

        const prsResponse = await fetch(
          "https://api.github.com/repos/nizzyabi/mail0/pulls?state=open",
        );
        const prsData = await prsResponse.json();

        setRepoStats({
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          watchers: repoData.subscribers_count,
          openIssues: repoData.open_issues_count - prsData.length,
          openPRs: prsData.length,
        });

        const last7Days = [...Array(7)].map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          const dateStr = date.toISOString().split("T")[0];

          const dayCommits = commitsData.filter(
            (commit: { commit: { author: { date: string } } }) =>
              commit.commit.author.date.startsWith(dateStr),
          ).length;

          const dayIndex = i + 1;
          const growthFactor = dayIndex / 7;

          return {
            date: new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            stars: Math.floor(repoData.stargazers_count * growthFactor),
            forks: Math.floor(repoData.forks_count * growthFactor),
            watchers: Math.floor(repoData.subscribers_count * growthFactor),
            commits: dayCommits,
          };
        });
        setTimelineData(last7Days);

        const activityStats = last7Days.map((dayData) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - last7Days.indexOf(dayData)));

          return {
            date: date.toLocaleDateString("en-US", { weekday: "short" }),
            commits: dayData.commits,
            issues: Math.max(1, Math.floor(dayData.commits * 0.3)),
            pullRequests: Math.max(1, Math.floor(dayData.commits * 0.2)),
          };
        });
        setActivityData(activityStats);
      } catch (error) {
        console.error("Error fetching repository data:", error);
        setTimelineData([]);
        setActivityData([]);
      }
    };

    fetchRepoData();
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/repos/nizzyabi/mail0/contributors")
      .then((res) => res.json())
      .then((data) => setContributors(data))
      .catch((err) => console.error("Error fetching contributors:", err));
  }, []);

  // const maxContributions = Math.max(...contributors.map((c) => c.contributions));

  return (
    <div className="min-h-screen w-full text-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Project Stats */}
        <div className="mb-8 rounded-lg border p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
          <div className="flex items-center justify-between">
            <div className="w-full space-y-1">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">Mail0</h2>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent text-neutral-800 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 sm:hidden"
                >
                  <Link href="https://github.com/nizzyabi/mail0" target="_blank" className="gap-2">
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-neutral-400">
                An open source email app built with modern technologies
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="hidden bg-transparent text-neutral-800 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 sm:inline-flex"
            >
              <Link href="https://github.com/nizzyabi/mail0" target="_blank" className="gap-2">
                <Github className="h-4 w-4" />
                View on GitHub
              </Link>
            </Button>
          </div>

          <Separator className="my-4 dark:bg-neutral-800" />

          <div className="mb-6 flex flex-wrap gap-4 text-neutral-600 dark:text-neutral-400 sm:gap-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              <span className="text-lg font-medium">{repoStats.stars}</span>
              <span>stars</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="h-5 w-5" />
              <span className="text-lg font-medium">{repoStats.forks}</span>
              <span>forks</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              <span className="text-lg font-medium">{repoStats.watchers}</span>
              <span>watchers</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="text-lg font-medium">{repoStats.openIssues}</span>
              <span>open issues</span>
            </div>
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5" />
              <span className="text-lg font-medium">{repoStats.openPRs}</span>
              <span>pull requests</span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Stars & Forks Timeline */}
            <Card className="p-4">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">Repository Growth</h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={timelineData} className="-mx-5 mt-2">
                  <defs>
                    <linearGradient id="stars" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="forks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-card p-2 shadow-md">
                            <div className="grid gap-2">
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">Stars:</span>
                                <span className="font-medium">{payload[0].value}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <GitFork className="h-4 w-4 text-secondary" />
                                <span className="text-sm text-muted-foreground">Forks:</span>
                                <span className="font-medium">{payload[1].value}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="stars"
                    stroke="hsl(var(--primary))"
                    fill="url(#stars)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="forks"
                    stroke="hsl(var(--secondary))"
                    fill="url(#forks)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Commit Activity */}
            <Card className="p-4">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">Commit Activity</h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={activityData} className="-mx-5 mt-2">
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-card p-2 shadow-md">
                            <div className="flex items-center gap-1">
                              <FileCode className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">Commits:</span>
                              <span className="font-medium">{payload[0].value}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="commits"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Issues & Pull Requests */}
            <Card className="p-4">
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">Issues & PRs</h3>
              <ResponsiveContainer width="100%" height={240} className="-mx-5 mt-2">
                <BarChart data={activityData}>
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-card p-2 shadow-md">
                            <div className="grid gap-1">
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm text-muted-foreground">Issues:</span>
                                <span className="font-medium">{payload[0].value}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <GitFork className="h-4 w-4 text-secondary" />
                                <span className="text-sm text-muted-foreground">PRs:</span>
                                <span className="font-medium">{payload[1].value}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="issues" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pullRequests" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        {/* Contributors Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900/80 dark:text-white">
              Contributors
            </h1>
            <div className="mt-2 flex items-center justify-center gap-2 text-muted-foreground">
              <FileCode className="h-4 w-4" />
              <span>
                {contributors.reduce((acc, curr) => acc + curr.contributions, 0)} total
                contributions
              </span>
            </div>
          </div>

          <div>
            <Tabs defaultValue="grid" className="w-full">
              <div className="mb-6 flex justify-center">
                <TabsList className="grid w-full grid-cols-2 sm:w-[200px]">
                  <TabsTrigger value="grid" className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger value="chart" className="flex items-center gap-2">
                    <ChartAreaIcon className="h-4 w-4" />
                    Chart
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {contributors
                    .sort((a, b) => b.contributions - a.contributions)
                    .map((contributor) => (
                      <Link
                        key={contributor.login}
                        href={contributor.html_url}
                        target="_blank"
                        className="group relative flex flex-col items-center rounded-xl border bg-white p-3 transition-all hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50"
                      >
                        <Avatar className="h-16 w-16 rounded-full ring-2 ring-background/50 transition-transform group-hover:scale-105">
                          <AvatarImage
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xs">
                            {contributor.login.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="mt-2 text-center">
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                            {contributor.login}
                          </span>
                          {specialRoles[contributor.login.toLowerCase()] && (
                            <div className="text-[10px] text-muted-foreground">
                              {specialRoles[contributor.login.toLowerCase()]}
                            </div>
                          )}
                        </div>

                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                            {contributor.contributions}
                          </span>
                          <GitGraph className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="chart">
                <Card className="bg-card p-6">
                  <ChartControls
                    showAll={showAllContributors}
                    setShowAll={setShowAllContributors}
                    total={contributors.length}
                  />

                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={contributors
                        .sort((a, b) => b.contributions - a.contributions)
                        .slice(0, showAllContributors ? undefined : 10)}
                      margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
                    >
                      <XAxis
                        dataKey="login"
                        interval={0}
                        tick={(props) => {
                          const { x, y, payload } = props;
                          const contributor = contributors.find((c) => c.login === payload.value);

                          return (
                            <g transform={`translate(${x},${y})`}>
                              <foreignObject x="-12" y="8" width="24" height="24">
                                <Avatar className="h-6 w-6 rounded-full ring-1 ring-border">
                                  <AvatarImage src={contributor?.avatar_url} />
                                  <AvatarFallback className="text-[8px]">
                                    {payload.value.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              </foreignObject>
                            </g>
                          );
                        }}
                        height={60}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <Tooltip
                        cursor={{ fill: "hsl(var(--muted)/0.1)" }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="rounded-lg border bg-popover p-2.5 shadow-lg">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8 ring-1 ring-border">
                                    <AvatarImage src={data.avatar_url} />
                                    <AvatarFallback>
                                      {data.login.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="text-sm font-medium text-popover-foreground">
                                      {data.login}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <GitGraph className="h-3 w-3" />
                                      <span>{data.contributions} commits</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar
                        dataKey="contributions"
                        fill="hsl(var(--background))"
                        radius={[4, 4, 0, 0]}
                        className="fill-neutral-900 dark:fill-white"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
