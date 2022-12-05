import React from 'react';

const Section = ({ header, children }: HomeSectionProps) => {
  return (
    <section className='flex flex-col gap-2'>
      <h2 className='text-xl text-emerald-500 font-large text-right lowercase tracking-wider'>
        {header}
      </h2>
      {children}
    </section>
  );
};

interface HomeSectionProps {
  header: string;
  children: React.ReactNode;
}

export default Section;