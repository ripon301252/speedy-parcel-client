
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = useAuth();
    const axiosUseRole = useAxiosSecure();

    const { data: role = 'user', isLoading: roleLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        // enabled: !!user?.email, // 🔥 fix
        queryFn: async () => {
            const res = await axiosUseRole.get(`/users/${user.email}/role`);
            return res.data?.role || "user";
        }
    });

    return { role, roleLoading };
};

export default useRole;




// import React, { useEffect, useState } from 'react';
// import useAuth from './useAuth';
// import axios from 'axios';

// const useRole = () => {
//     const { user } = useAuth();
//     const [role, setRole] = useState("user");
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         if (!user?.email) return;

//         const fetchRole = async () => {
//             setIsLoading(true);
//             try {
//                 const res = await axios.get(`/users/${user.email}/role`);
//                 const data = res.data;
//                 setRole(data?.role || "user");
//                 console.log("Fetched role:", data?.role || "user");
//             } catch (err) {
//                 console.error(err);
//                 setRole("user");
//             } finally {
//                 setIsLoading(false);
//             }
//         }

//         fetchRole();

//     }, [user?.email]);

//     return { role, isLoading };
// };

// export default useRole;


// import { useEffect, useState } from 'react';
// import useAuth from './useAuth';
// import axios from 'axios';

// const useRole = () => {
//     const { user } = useAuth();
//     const [role, setRole] = useState("user");
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         if (!user?.email) return;

//         const fetchRole = async () => {
//             setIsLoading(true);
//             try {
//                 const res = await axios.get(`/users/${user.email}/role`);
//                 const data = res.data;

//                 setRole(data?.role || "user");
//                 console.log("Fetched role:", data?.role || "user");
//             } catch (err) {
//                 console.error(err);
//                 setRole("user");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchRole();
//     }, [user?.email]);

//     return { role, isLoading };
// };

// export default useRole;



