import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthProvider'
import Navbar from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang='en'>
      <body>
        <AuthProvider>

          {/* <Navbar /> */}
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>

            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
