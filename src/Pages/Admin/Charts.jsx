import React, { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    PieChart,
    Pie,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    Cell,
    XAxis,
    YAxis,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const COLORS = ["#5b46b1", "#f97316", "#22c55e"];

const Charts = () => {
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const axiosChart = useAxiosSecure();

    useEffect(() => {
        // Pie Data
        axiosChart.get("/api/dashboard/pie").then((res) => {
            const userData = res.data.map((item) => ({
                name: item._id,
                value: item.count,
            }));
            setPieData(userData);
        });

        // Bar Data
        axiosChart.get("/api/dashboard/bar").then((res) => {
            const parcelData = res.data.map((item) => ({
                name: item._id,
                parcelNames: item.parcelNames || [],
                count: item.count || 0,
                revenue: item.totalCost || 0,
                totalWeight: item.totalWeight || 0,
            }));
            setBarData(parcelData);
        });
    }, [axiosChart]);

    return (
        <div className="w-full px-3 sm:px-5 md:px-8 py-5 space-y-8">

            {/* Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Pie Chart */}
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                        Users: Role basis
                    </h3>

                    <div className="w-full h-[250px] sm:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="70%"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h1 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-white">
                        Parcel: District Basis
                    </h1>

                    {/* Scroll fix for small device */}
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[500px] sm:min-w-full h-[300px] sm:h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={barData}
                                    layout="vertical"
                                    margin={{ top: 10, right: 0, left: -28, bottom: 10 }}
                                    barCategoryGap={15}
                                >
                                    {/* Gradients */}
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>

                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#f97316" />
                                            <stop offset="100%" stopColor="#fb7185" />
                                        </linearGradient>

                                        <linearGradient id="colorWeight" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#22c55e" />
                                            <stop offset="100%" stopColor="#14b8a6" />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

                                    <XAxis type="number" tick={{ fontSize: 10 }} />

                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={80}   // 🔥 140 → 80
                                        tick={{ fill: "#e5e7eb", fontSize: 11 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip
                                        cursor={false} 
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                

                                                return (
                                                    <div className="bg-gray-900 text-white p-2 rounded-md text-xs">
                                                        <p className="font-semibold">{label}</p>

                                                        <p>
                                                            📦{" "}
                                                            {data.parcelNames?.length
                                                                ? data.parcelNames.slice(0, 3).join(", ")
                                                                : "No parcels"}
                                                        </p>

                                                        <p>📊 {data.count}</p>
                                                        <p>💰 {data.revenue}</p>
                                                        <p>⚖️ {data.totalWeight}</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />

                                    <Legend wrapperStyle={{ fontSize: "12px" }} />

                                    <Bar
                                        dataKey="count"
                                        name="Parcels"
                                        fill="url(#colorCount)"
                                        radius={[0, 6, 6, 0]}
                                    />
                                    <Bar
                                        dataKey="revenue"
                                        name="Revenue"
                                        fill="url(#colorRevenue)"
                                        radius={[0, 6, 6, 0]}
                                    />
                                    <Bar
                                        dataKey="totalWeight"
                                        name="Weight"
                                        fill="url(#colorWeight)"
                                        radius={[0, 6, 6, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Charts;