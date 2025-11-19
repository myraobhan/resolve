import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { RefreshCw, TrendingUp } from "lucide-react";
import {
  getTotalDownloads,
  getTodayDownloads,
  getDetailedStats,
  getAllDownloadRecords,
} from "@/services/firebaseAnalyticsService";

interface DetailedStatsData {
  totalDownloads: number;
  byForum: Record<string, number>;
  byState: Record<string, number>;
  byValueRange: Record<string, number>;
  lastUpdated: Date | null;
}

interface DownloadRecord {
  id: string;
  complainantName: string;
  oppositePartyName: string;
  forumType: string;
  totalValue: string;
  district: string;
  state: string;
  downloadedAt: any;
  timestamp: string;
}

const Analytics = () => {
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [todayDownloads, setTodayDownloads] = useState(0);
  const [stats, setStats] = useState<DetailedStatsData>({
    totalDownloads: 0,
    byForum: {},
    byState: {},
    byValueRange: {},
    lastUpdated: null,
  });
  const [records, setRecords] = useState<DownloadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setRefreshing(true);
      const total = await getTotalDownloads();
      const today = await getTodayDownloads();
      const detailedStats = await getDetailedStats();
      const allRecords = await getAllDownloadRecords();

      setTotalDownloads(total);
      setTodayDownloads(today);
      setStats(detailedStats);
      setRecords(allRecords);
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Format data for charts
  const forumChartData = Object.entries(stats.byForum).map(([name, value]) => ({
    name,
    value,
  }));

  const stateChartData = Object.entries(stats.byState)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .slice(0, 10);

  const valueRangeChartData = Object.entries(stats.byValueRange).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Form Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Track complaint form downloads and statistics
              </p>
            </div>
            <Button
              onClick={loadData}
              disabled={refreshing}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalDownloads}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {totalDownloads > 0 ? "All time" : "No downloads yet"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Today's Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{todayDownloads}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {todayDownloads > 0 ? `${todayDownloads} form(s) today` : "No downloads today"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm font-semibold">
                  {stats.lastUpdated
                    ? new Date(stats.lastUpdated).toLocaleString()
                    : "Never"}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Real-time sync enabled
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Forum Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Downloads by Forum Type</CardTitle>
              </CardHeader>
              <CardContent>
                {forumChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={forumChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {forumChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No data available</p>
                )}
              </CardContent>
            </Card>

            {/* Value Range Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Downloads by Claim Value</CardTitle>
              </CardHeader>
              <CardContent>
                {valueRangeChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={valueRangeChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No data available</p>
                )}
              </CardContent>
            </Card>

            {/* State-wise Distribution */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top 10 States by Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                {stateChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={stateChartData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 200 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={200} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No data available</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Downloads Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Form Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left font-semibold p-3">Complainant</th>
                      <th className="text-left font-semibold p-3">Forum</th>
                      <th className="text-left font-semibold p-3">Claim Value</th>
                      <th className="text-left font-semibold p-3">State</th>
                      <th className="text-left font-semibold p-3">Download Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.length > 0 ? (
                      records.slice(0, 20).map((record) => (
                        <tr key={record.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{record.complainantName}</td>
                          <td className="p-3 text-xs">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {record.forumType}
                            </span>
                          </td>
                          <td className="p-3">{record.totalValue}</td>
                          <td className="p-3">{record.state}</td>
                          <td className="p-3 text-muted-foreground text-xs">
                            {record.timestamp
                              ? new Date(record.timestamp).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          No downloads recorded yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {records.length > 20 && (
                <p className="text-xs text-muted-foreground mt-4">
                  Showing 20 of {records.length} total downloads
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
