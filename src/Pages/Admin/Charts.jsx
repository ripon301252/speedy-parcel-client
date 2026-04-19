import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Charts = () => {
    return (
        <div>
             <div className=''>
                <h1 className='ml-4 font-bold'>Ratings</h1>
                <div className="w-full overflow-x-auto wrapper">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data="" layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#ff8811" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Charts;