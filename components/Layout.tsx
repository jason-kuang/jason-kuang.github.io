import Head from 'next/head';
import React from 'react';

const Layout = ({ title, description, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <main className='flex flex-col gap-4 sm:py-20 md:px-0 dark:bg-slate-1100'>
        {children}
      </main>
    </>
  );
};

interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default Layout;