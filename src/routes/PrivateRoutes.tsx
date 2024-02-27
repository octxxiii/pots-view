// import { lazy } from "react";
// import { Route, Routes } from "react-router-dom";
// import { PrivateLayout } from "@/layouts";
// import { JiThemeProvider } from "@/theme";

// const DashboardView = lazy(() => import("@/views/Dashboard"));

// // chain
// const AttackChainView = lazy(() => import("@/views/Chain/AttackChain"));
// const AttackAlertView = lazy(() => import("@/views/Chain/AttackAlert"));
// const RuleSetView = lazy(() => import("@/views/Chain/RuleSet"));
// const CollectionView = lazy(() => import("@/views/Chain/Collection"));

// // campaign
// const AttackDataView = lazy(() => import("@/views/Campaign/AttackData"));
// const AttackTagView = lazy(() => import("@/views/Campaign/AttackTag"));
// const SimilarityView = lazy(() => import("@/views/Campaign/Similarity"));
// const IncreaseView = lazy(() => import("@/views/Campaign/Increase"));
// const ClassificationView = lazy(
//   () => import("@/views/Campaign/Classification")
// );

// // against
// const AttackConfrontationView = lazy(
//   () => import("@/views/Against/AttackConfrontation")
// );
// const AttackAgentView = lazy(() => import("@/views/Against/AttackAgent"));
// const AttackHostDefensesView = lazy(
//   () => import("@/views/Against/AttackHostDefenses")
// );
// const AttackNetworkDefensesView = lazy(
//   () => import("@/views/Against/AttackNetworkDefenses")
// );
// const AvailabilityView = lazy(() => import("@/views/Against/Availability"));

// // joe-sandbox
// const SuspiciousFileInfoView = lazy(
//   () => import("@/views/JoeSandbox/SuspiciousFileInfo")
// );

// const PrivateRoutes = () => {
//   return (
//     <JiThemeProvider>
//       <Routes>
//         <Route path="/" element={<PrivateLayout />}>
//           <Route index element={<DashboardView />} />
//           <Route path="/chain/attack-chain" element={<AttackChainView />} />
//           <Route path="/chain/attack-alert" element={<AttackAlertView />} />
//           <Route path="/chain/rule-set" element={<RuleSetView />} />
//           <Route path="/chain/collection" element={<CollectionView />} />
//           <Route path="/campaign/attack-data" element={<AttackDataView />} />
//           <Route path="/campaign/attack-tag" element={<AttackTagView />} />
//           <Route path="/campaign/similarity" element={<SimilarityView />} />
//           <Route
//             path="/campaign/classification"
//             element={<ClassificationView />}
//           />
//           <Route path="/campaign/increase" element={<IncreaseView />} />
//           <Route
//             path="/against/attack-confrontation"
//             element={<AttackConfrontationView />}
//           />
//           <Route path="/against/attack-agent" element={<AttackAgentView />} />
//           <Route
//             path="/against/attack-host-defenses"
//             element={<AttackHostDefensesView />}
//           />
//           <Route
//             path="/against/attack-network-rules"
//             element={<AttackNetworkDefensesView />}
//           />
//           <Route path="/against/availability" element={<AvailabilityView />} />
//           <Route
//             path="/joe-sandbox/suspicious-file-info"
//             element={<SuspiciousFileInfoView />}
//           />
//         </Route>
//       </Routes>
//     </JiThemeProvider>
//   );
// };

// export default PrivateRoutes;
