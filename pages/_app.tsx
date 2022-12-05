import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <ThemeProvider attribute='class'>
        <div className='m-auto flex w-full max-w-screen-sm flex-col '>
        <Header />

          <div className='flex min-h-screen grid-cols-4 flex-col sm:grid sm:gap-8'>

            <div className='col-span-full col-start-2'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={router.route}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0 }}
                >
                  <Component {...pageProps} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;