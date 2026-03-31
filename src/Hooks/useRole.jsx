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
//                 const res = await axios.get(`/users/${user.email}`);
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


import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import axios from 'axios';

const useRole = () => {
    const { user } = useAuth();
    const [role, setRole] = useState("user");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchRole = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`/users?email=${user.email}`);
                const data = res.data;

                setRole(data?.role || "user");
                console.log("Fetched role:", data?.role || "user");
            } catch (err) {
                console.error(err);
                setRole("user");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRole();
    }, [user?.email]);

    return { role, isLoading };
};

export default useRole;