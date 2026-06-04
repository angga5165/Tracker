import { Routes, Route } from 'react-router'
import AppLayout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import InputHarian from '@/pages/InputHarian'
import RekapHarian from '@/pages/RekapHarian'
import AnalisisKategori from '@/pages/AnalisisKategori'
import Visualisasi from '@/pages/Visualisasi'
import Pengaturan from '@/pages/Pengaturan'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/input" element={<InputHarian />} />
        <Route path="/rekap" element={<RekapHarian />} />
        <Route path="/analisis" element={<AnalisisKategori />} />
        <Route path="/visualisasi" element={<Visualisasi />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Routes>
    </AppLayout>
  )
}
