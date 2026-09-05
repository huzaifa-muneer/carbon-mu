import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'CARBON μ — Beneath the surface',description:'Explore a conceptual carbon storage digital twin. Interactive geology, cosmic muons and detector experiment design.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
