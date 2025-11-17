import '@fontsource/jetbrains-mono';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import '../styles/globals.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Script
        data-goatcounter="https://kuang316.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
        strategy="afterInteractive"
      />
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <div className='m-auto flex w-full max-w-screen-sm flex-col '>
        <Header />

          <div className='flex min-h-screen grid-cols-4 flex-col sm:grid sm:gap-8'>

            <div className='col-span-full col-start-2'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={router.route}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  exit={{ opacity: 0, y: -20 }}
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