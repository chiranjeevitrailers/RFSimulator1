import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/common/LoadingSpinner'

// Main Views - Lazy loaded
const DashboardView = React.lazy(() => import('../pages/protocol/DashboardPage'))
const LogsViewerView = React.lazy(() => import('../pages/protocol/LogsViewerPage'))
const EnhancedLogsView = React.lazy(() => import('../pages/protocol/EnhancedLogsPage'))
const LayerTraceView = React.lazy(() => import('../pages/protocol/LayerTracePage'))
const CallFlowView = React.lazy(() => import('../pages/protocol/CallFlowPage'))
const AnalyticsView = React.lazy(() => import('../pages/protocol/AnalyticsPage'))

// O-RAN Analysis Views
const OranOverviewView = React.lazy(() => import('../pages/oran/OranOverviewPage'))
const OranInterfacesView = React.lazy(() => import('../pages/oran/OranInterfacesPage'))
const OranCuAnalysisView = React.lazy(() => import('../pages/oran/OranCuAnalysisPage'))
const OranDuAnalysisView = React.lazy(() => import('../pages/oran/OranDuAnalysisPage'))
const OranE1InterfaceView = React.lazy(() => import('../pages/oran/OranE1InterfacePage'))
const OranF1InterfaceView = React.lazy(() => import('../pages/oran/OranF1InterfacePage'))
const OranPerformanceView = React.lazy(() => import('../pages/oran/OranPerformancePage'))
const OranXappsView = React.lazy(() => import('../pages/oran/OranXappsPage'))
const OranSmoView = React.lazy(() => import('../pages/oran/OranSmoPage'))

// NB-IoT Analysis Views
const NBIoTOverviewView = React.lazy(() => import('../pages/nbiot/NBIoTOverviewPage'))
const NBIoTCallFlowView = React.lazy(() => import('../pages/nbiot/NBIoTCallFlowPage'))
const NBIoTAnalyticsView = React.lazy(() => import('../pages/nbiot/NBIoTAnalyticsPage'))
const NBIoTPhyLayerView = React.lazy(() => import('../pages/nbiot/NBIoTPhyLayerPage'))
const NBIoTMacLayerView = React.lazy(() => import('../pages/nbiot/NBIoTMacLayerPage'))
const NBIoTRrcLayerView = React.lazy(() => import('../pages/nbiot/NBIoTRrcLayerPage'))
const NBIoTTestingView = React.lazy(() => import('../pages/nbiot/NBIoTTestingPage'))

// C-V2X Analysis Views
const V2xOverviewView = React.lazy(() => import('../pages/v2x/V2xOverviewPage'))
const V2xSidelinkView = React.lazy(() => import('../pages/v2x/V2xSidelinkPage'))
const V2xAnalyticsView = React.lazy(() => import('../pages/v2x/V2xAnalyticsPage'))
const V2xPhyLayerView = React.lazy(() => import('../pages/v2x/V2xPhyLayerPage'))
const V2xMacLayerView = React.lazy(() => import('../pages/v2x/V2xMacLayerPage'))
const V2xTestingView = React.lazy(() => import('../pages/v2x/V2xTestingPage'))
const V2xScenariosView = React.lazy(() => import('../pages/v2x/V2xScenariosPage'))

// NTN Analysis Views
const NtnOverviewView = React.lazy(() => import('../pages/ntn/NtnOverviewPage'))
const NtnSatellitesView = React.lazy(() => import('../pages/ntn/NtnSatellitesPage'))
const NtnAnalyticsView = React.lazy(() => import('../pages/ntn/NtnAnalyticsPage'))
const NtnSib19View = React.lazy(() => import('../pages/ntn/NtnSib19Page'))
const NtnTimingView = React.lazy(() => import('../pages/ntn/NtnTimingPage'))
const NtnDopplerView = React.lazy(() => import('../pages/ntn/NtnDopplerPage'))
const NtnScenariosView = React.lazy(() => import('../pages/ntn/NtnScenariosPage'))

// Protocol Layers Views
const PhyLayerView = React.lazy(() => import('../pages/layers/PhyLayerPage'))
const MacLayerView = React.lazy(() => import('../pages/layers/MacLayerPage'))
const RlcLayerView = React.lazy(() => import('../pages/layers/RlcLayerPage'))
const PdcpLayerView = React.lazy(() => import('../pages/layers/PdcpLayerPage'))
const RrcLayerView = React.lazy(() => import('../pages/layers/RrcLayerPage'))
const NasLayerView = React.lazy(() => import('../pages/layers/NasLayerPage'))
const ImsLayerView = React.lazy(() => import('../pages/layers/ImsLayerPage'))

// Core Network Analyzers
const AmfAnalyzerView = React.lazy(() => import('../pages/core/AmfAnalyzerPage'))
const SmfAnalyzerView = React.lazy(() => import('../pages/core/SmfAnalyzerPage'))
const UpfAnalyzerView = React.lazy(() => import('../pages/core/UpfAnalyzerPage'))
const AusfAnalyzerView = React.lazy(() => import('../pages/core/AusfAnalyzerPage'))
const UdmAnalyzerView = React.lazy(() => import('../pages/core/UdmAnalyzerPage'))
const ConfigManagerView = React.lazy(() => import('../pages/core/ConfigManagerPage'))

// 4G Legacy Analyzers
const MmeAnalyzerView = React.lazy(() => import('../pages/legacy/MmeAnalyzerPage'))
const SgwAnalyzerView = React.lazy(() => import('../pages/legacy/SgwAnalyzerPage'))
const PgwAnalyzerView = React.lazy(() => import('../pages/legacy/PgwAnalyzerPage'))

// Test Suites
const TestSuitesView = React.lazy(() => import('../pages/protocol/TestSuitesPage'))
const TestExecutionView = React.lazy(() => import('../pages/protocol/TestExecutionPage'))
const TestResultsView = React.lazy(() => import('../pages/protocol/TestResultsPage'))
const TestAutomationView = React.lazy(() => import('../pages/protocol/TestAutomationPage'))

// Utilities
const ReportGeneratorView = React.lazy(() => import('../pages/utilities/ReportGeneratorPage'))
const ExportManagerView = React.lazy(() => import('../pages/utilities/ExportManagerPage'))
const HelpSupportView = React.lazy(() => import('../pages/utilities/HelpSupportPage'))

// Loading component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-base-100">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-base-content/70">Loading Protocol Analyzer...</p>
    </div>
  </div>
)

export const ProtocolAnalyzerRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Main Views */}
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="logs-viewer" element={<LogsViewerView />} />
        <Route path="enhanced-logs" element={<EnhancedLogsView />} />
        <Route path="layer-trace" element={<LayerTraceView />} />
        <Route path="callflow" element={<CallFlowView />} />
        <Route path="analytics" element={<AnalyticsView />} />

        {/* O-RAN Analysis */}
        <Route path="oran-overview" element={<OranOverviewView />} />
        <Route path="oran-interfaces" element={<OranInterfacesView />} />
        <Route path="oran-cu-analysis" element={<OranCuAnalysisView />} />
        <Route path="oran-du-analysis" element={<OranDuAnalysisView />} />
        <Route path="oran-e1-interface" element={<OranE1InterfaceView />} />
        <Route path="oran-f1-interface" element={<OranF1InterfaceView />} />
        <Route path="oran-performance" element={<OranPerformanceView />} />
        <Route path="oran-xapps" element={<OranXappsView />} />
        <Route path="oran-smo" element={<OranSmoView />} />

        {/* NB-IoT Analysis */}
        <Route path="nbiot-overview" element={<NBIoTOverviewView />} />
        <Route path="nbiot-callflow" element={<NBIoTCallFlowView />} />
        <Route path="nbiot-analytics" element={<NBIoTAnalyticsView />} />
        <Route path="nbiot-phy-layer" element={<NBIoTPhyLayerView />} />
        <Route path="nbiot-mac-layer" element={<NBIoTMacLayerView />} />
        <Route path="nbiot-rrc-layer" element={<NBIoTRrcLayerView />} />
        <Route path="nbiot-testing" element={<NBIoTTestingView />} />

        {/* C-V2X Analysis */}
        <Route path="v2x-overview" element={<V2xOverviewView />} />
        <Route path="v2x-sidelink" element={<V2xSidelinkView />} />
        <Route path="v2x-analytics" element={<V2xAnalyticsView />} />
        <Route path="v2x-phy-layer" element={<V2xPhyLayerView />} />
        <Route path="v2x-mac-layer" element={<V2xMacLayerView />} />
        <Route path="v2x-testing" element={<V2xTestingView />} />
        <Route path="v2x-scenarios" element={<V2xScenariosView />} />

        {/* NTN Analysis */}
        <Route path="ntn-overview" element={<NtnOverviewView />} />
        <Route path="ntn-satellites" element={<NtnSatellitesView />} />
        <Route path="ntn-analytics" element={<NtnAnalyticsView />} />
        <Route path="ntn-sib19" element={<NtnSib19View />} />
        <Route path="ntn-timing" element={<NtnTimingView />} />
        <Route path="ntn-doppler" element={<NtnDopplerView />} />
        <Route path="ntn-scenarios" element={<NtnScenariosView />} />

        {/* Protocol Layers */}
        <Route path="layer-phy" element={<PhyLayerView />} />
        <Route path="layer-mac" element={<MacLayerView />} />
        <Route path="layer-rlc" element={<RlcLayerView />} />
        <Route path="layer-pdcp" element={<PdcpLayerView />} />
        <Route path="layer-rrc" element={<RrcLayerView />} />
        <Route path="layer-nas" element={<NasLayerView />} />
        <Route path="layer-ims" element={<ImsLayerView />} />

        {/* Core Network */}
        <Route path="analyzer-amf" element={<AmfAnalyzerView />} />
        <Route path="analyzer-smf" element={<SmfAnalyzerView />} />
        <Route path="analyzer-upf" element={<UpfAnalyzerView />} />
        <Route path="analyzer-ausf" element={<AusfAnalyzerView />} />
        <Route path="analyzer-udm" element={<UdmAnalyzerView />} />
        <Route path="analyzer-config-manager" element={<ConfigManagerView />} />

        {/* 4G Legacy */}
        <Route path="analyzer-mme" element={<MmeAnalyzerView />} />
        <Route path="analyzer-sgw" element={<SgwAnalyzerView />} />
        <Route path="analyzer-pgw" element={<PgwAnalyzerView />} />

        {/* Test Suites */}
        <Route path="test-suites" element={<TestSuitesView />} />
        <Route path="test-execution" element={<TestExecutionView />} />
        <Route path="test-results" element={<TestResultsView />} />
        <Route path="test-automation" element={<TestAutomationView />} />

        {/* Utilities */}
        <Route path="report-generator" element={<ReportGeneratorView />} />
        <Route path="export-manager" element={<ExportManagerView />} />
        <Route path="help-support" element={<HelpSupportView />} />

        {/* Default redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default ProtocolAnalyzerRoutes