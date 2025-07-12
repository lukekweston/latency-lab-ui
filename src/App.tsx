import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BenchmarkPage from './BenchmarkPage';
// Future pages
// import MemoryBenchmark from './MemoryBenchmark';
// import ThreadingBenchmark from './ThreadingBenchmark';
// etc.

function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<BenchmarkPage />} />
          {/* Future benchmarks */}
          {/* <Route path="/memory" element={<MemoryBenchmark />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
