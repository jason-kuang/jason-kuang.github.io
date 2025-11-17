import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { links, email } from '../components/Contacts';
import Image from 'next/image';

const Home: NextPage = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [greeting, setGreeting] = useState('');
  const [timeMessage, setTimeMessage] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();

      // Determine greeting based on local time
      let greetingText = '';
      if (hour >= 5 && hour < 12) {
        greetingText = 'good morning';
      } else if (hour >= 12 && hour < 17) {
        greetingText = 'good afternoon';
      } else if (hour >= 17 && hour < 24) {
        greetingText = 'good evening';
      } else {
        greetingText = 'good evening'; // late night/early morning
      }

      // Get NYC time
      const nycTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
      const nycHour = nycTime.getHours();

      // Calculate time difference
      const localOffset = -now.getTimezoneOffset() / 60;
      const nycOffset = nycTime.getTimezoneOffset() === 240 ? -4 : -5; // EDT vs EST
      const diff = Math.abs(localOffset - nycOffset);

      // Create time message
      let message = '';
      if (diff === 0) {
        message = "we're in the same timezone!";
      } else {
        const laterOrEarlier = nycHour > hour ? 'later' : 'earlier';
        const aheadOrBehind = nycHour > hour ? 'ahead' : 'behind';
        message = `it's even ${laterOrEarlier} in nyc though, i'm ${diff} hour${diff !== 1 ? 's' : ''} ${aheadOrBehind} of you!`;
      }

      setGreeting(greetingText);
      setTimeMessage(message);
    };

    updateGreeting();
    // Update every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
    title='Jason Kuang'
    description='SWE @ Meta'
    >
      <div className='w-[80px] sm:w-[176px] flex flex-row-reverse items-center ml-72 rounded-xl'>
        <Image
          sizes="30vw"
          priority
          src='/profile.jpg'
          alt="2020 photo of me"
          height={176}
          width={176}
          className="rounded-xl"
        />
        <ul className='mr-16 flex flex-col text-xl gap-4 dark:text-white text-black'>
        {links.slice(0, 4).map((link) => (
          <li key={link.title}>
            <a
              className='link flex w-fit items-center gap-2 lowercase tracking-wider hover:opacity-100 hover:text-emerald-500'
              href={link.href}
              target='_blank'
              rel='noreferrer'
              onMouseEnter={() => setHoveredLink(link.title)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.icon}
              <span style={link.title === 'Email' ? { display: 'inline-block', width: '150px', fontSize: hoveredLink === 'Email' ? '0.85rem' : 'inherit' } : {}}>
                {link.title === 'Email' && hoveredLink === 'Email' ? email : link.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
      </div>
  

      <Section header={`${greeting}.`}>
      <div className='flex flex-col gap-4 text-right lowercase'>
          {timeMessage && (
            <p className='text-xs opacity-70'>
              fun fact: {timeMessage}
            </p>
          )}
          <p>
            my name is jason kuang.<br></br>
            i am a Software Engineer at meta in nyc.<br></br>
          </p>
          <p>
            i work on business messaging, formerly on in-thread experiences and now on click to whatsapp ads.
          </p>
          <p>
            check out my resume and more from the above.<br></br>
          </p>
        </div>
      </Section>

      <Section header='side projects.'>
        <div className='flex flex-col gap-4 text-right lowercase'>
          <div>
            <a
              href='https://whatipaid.fyi'
              target='_blank'
              rel='noreferrer'
              className='link text-emerald-500 hover:opacity-100 hover:underline'
            >
              www.whatipaid.fyi <span className='font-normal'>↗</span>
            </a>
            <p className='mt-1'>
              crowdsourced platform for sharing real healthcare costs to bring transparency to elective medical procedure pricing.
            </p>
          </div>
          <div>
            <a
              href='http://github.com/jason-kuang/Valor'
              target='_blank'
              rel='noreferrer'
              className='link text-emerald-500 hover:opacity-100 hover:underline'
            >
              valor <span className='font-normal'>↗</span>
            </a>
            <p className='mt-1'>
              discord bot for league of legends players tracking real-time match data and live leaderboards with self-updating champion stats.
            </p>
          </div>
        </div>
      </Section>

      <Section header='currently.' headerClassName='!text-sm !text-left'>
        <div className='flex flex-col gap-2 text-left lowercase text-xs opacity-80'>
          <div>
            <div className='text-emerald-500'>learning:</div>
            <div>programming w ai. figuring out if lasik is right for me. fujifilm colors.</div>
          </div>
          <div>
            <div className='text-emerald-500'>listening:</div>
            <div>k-rnb. k-pop. edm.</div>
          </div>
          <div>
            <div className='text-emerald-500'>playing:</div>
            <div>valorant. league of legends (#t1win). arc raiders.</div>
          </div>
        </div>
      </Section>

    </Layout>
  );
}

export default Home
