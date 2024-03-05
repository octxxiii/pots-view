export {};
// import React, { Suspense, useCallback, useState } from "react";
// import { BrowserRouter } from "react-router-dom";
// import { JiLoading } from "@/components";
// import { useAuthWatchdog, useIsAuthenticated } from "@/hooks";
// import PrivateRoutes from "@/routes/PrivateRoutes";
// import PublicRoutes from "@/routes/PublicRoutes";

// const Routes = (): React.JSX.Element => {
//   const [loading, setLoading] = useState(true);
//   const [refresh, setRefresh] = useState(0);
//   const isAuthenticated = useIsAuthenticated();

//   const afterLogin = useCallback(() => {
//     setRefresh((old) => old + 1);
//     setLoading(false);
//   }, []);

//   const afterLogout = useCallback(() => {
//     setRefresh((old) => old + 1);
//     setLoading(false);
//   }, []);

//   useAuthWatchdog(afterLogin, afterLogout);

//   if (loading) {
//     return <JiLoading />;
//   }

//   console.log(
//     `Routes() - isAuthenticated: ${isAuthenticated}, refreshCount: ${refresh}`
//   );

//   return (
//     <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
//       <Suspense fallback={<JiLoading />}>
//         {/* <PrivateRoutes key={refresh} /> */}
//         {isAuthenticated ? (
//           <PrivateRoutes key={refresh} />
//         ) : (
//           <PublicRoutes key={refresh} />
//         )}
//       </Suspense>
//     </BrowserRouter>
//   );
// };

// export default Routes;
