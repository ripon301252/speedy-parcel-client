import React, { useEffect, useState } from 'react';
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
    YAxis
} from 'recharts';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const COLORS = ["#5b46b1", "#f97316", "#22c55e"]; // Pie chart colors

const Charts = () => {
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const axiosChart = useAxiosSecure();


    useEffect(() => {
        // pie
        axiosChart.get("/api/dashboard/pie")
            .then(res => {
                console.log(res.data)
                const userData = res.data.map(item => ({
                    name: item._id,
                    value: item.count
                }));
                setPieData(userData);
            });

        // Bar
        axiosChart.get("/api/dashboard/bar")
            .then(res => {
                console.log(res.data)
                const parcelData = res.data.map(item => ({
                    name: item._id,
                    parcelNames: item.parcelNames || [],
                    count: item.count || 0,
                    revenue: item.totalCost || 0,
                    totalWeight: item.totalWeight || 0
                }));
                setBarData(parcelData);
            });

    }, [axiosChart]);



    return (
        <div>

            {/* Pie Chart */}
            <div className=" dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                    Users: Role basis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className='dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-600 mt-20'>
                <h1 className='ml-4 font-bold'>Parcel: District Basis</h1>
                <div className="w-full overflow-x-auto wrapper">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart
                            data={barData}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
                            barCategoryGap={20}
                        >
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

                            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

                            {/* X Axis */}
                            <XAxis
                                type="number"
                                tick={{ fill: "#9ca3af" }}
                            />

                            {/* Y Axis */}
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={140}
                                tick={{ fill: "#d1d5db", fontSize: 12 }}
                            />

                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;

                                        return (
                                            <div className="bg-gray-900 text-white p-3 rounded-lg border border-gray-700">
                                                <p className="font-bold mb-1">{label}</p>

                                                <p className="text-sm">
                                                    📦 Parcels: {data.parcelNames?.length
                                                        ? data.parcelNames.join(", ")
                                                        : "No parcels"}
                                                </p>

                                                <p>📊 Count: {data.count}</p>
                                                <p>💰 Revenue: {data.revenue}</p>
                                                <p>⚖️ Weight: {data.totalWeight}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />

                            <Legend />

                            {/* MAIN DATA */}
                            <Bar
                                dataKey="count"
                                name="Parcels"
                                fill="url(#colorCount)"
                                radius={[0, 8, 8, 0]}
                            />

                            <Bar
                                dataKey="revenue"
                                name="Revenue"
                                fill="url(#colorRevenue)"
                                radius={[0, 8, 8, 0]}
                            />

                            <Bar
                                dataKey="totalWeight"
                                name="Weight"
                                fill="url(#colorWeight)"
                                radius={[0, 8, 8, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>

    );
};

export default Charts;