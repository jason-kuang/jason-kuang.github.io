import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { links, email } from '../components/Contacts';
import Image from 'next/image';

const Home: NextPage = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [greetingTime, setGreetingTime] = useState('');
  const [timeMessage, setTimeMessage] = useState('');
  const [displayedGreeting, setDisplayedGreeting] = useState('good ');
  const [displayedTimeMessage, setDisplayedTimeMessage] = useState('');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();

      // Determine greeting based on local time
      let timeOfDay = '';
      if (hour >= 5 && hour < 12) {
        timeOfDay = 'morning';
      } else if (hour >= 12 && hour < 17) {
        timeOfDay = 'afternoon';
      } else if (hour >= 17 && hour < 24) {
        timeOfDay = 'evening';
      } else {
        timeOfDay = 'evening'; // late night/early morning
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

      setGreetingTime(timeOfDay);
      setTimeMessage(message);
    };

    updateGreeting();
    // Update every minute
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation effect for greeting
  useEffect(() => {
    if (!greetingTime) return;

    // Start with dots
    setDisplayedGreeting('good ...');

    // Delete dots one by one (500ms per dot)
    const deleteDots = [
      setTimeout(() => setDisplayedGreeting('good ..'), 500),
      setTimeout(() => setDisplayedGreeting('good .'), 1000),
      setTimeout(() => setDisplayedGreeting('good '), 1500),
    ];

    // Start typing the time of day after dots are deleted
    let currentIndex = 0;
    const startTypingDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < greetingTime.length) {
          setDisplayedGreeting('good ' + greetingTime.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 300);
    }, 1700); // Start after 1700ms (1500ms for dot deletion + 200ms buffer)

    return () => {
      deleteDots.forEach(timeout => clearTimeout(timeout));
      clearTimeout(startTypingDelay);
    };
  }, [greetingTime]);

  // Typing animation effect for time message
  useEffect(() => {
    if (!timeMessage) return;

    setDisplayedTimeMessage('');
    let currentIndex = 0;
    const fullMessage = 'fun fact: ' + timeMessage;

    // Start typing after greeting is done (1700ms for dots + greetingTime.length * 300ms + 200ms buffer)
    const startDelay = 1700 + greetingTime.length * 300 + 200;

    const delayTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < fullMessage.length) {
          setDisplayedTimeMessage(fullMessage.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    }, startDelay);

    return () => clearTimeout(delayTimeout);
  }, [timeMessage, greetingTime]);

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
  

      <Section header={`${displayedGreeting}.`}>
      <div className='flex flex-col gap-4 text-right lowercase pr-4 sm:pr-0'>
          {displayedTimeMessage && (
            <p className='text-xs opacity-70'>
              {displayedTimeMessage}
            </p>
          )}
          <p>
            my name is jason kuang.<br></br>
            i am a Software Engineer at <span style={{ color: '#0081FB' }}>meta</span> in nyc.<br></br>
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
        <div className='flex flex-col gap-2 text-right lowercase pr-4 sm:pr-0'>
          <div
            className='cursor-pointer'
            onClick={() => setExpandedProject(expandedProject === 'whatipaid' ? null : 'whatipaid')}
          >
            <div className='flex items-center justify-end gap-2'>
              <span className='text-emerald-500 text-sm opacity-70'>
                {expandedProject === 'whatipaid' ? <IoChevronUp /> : <IoChevronDown />}
              </span>
              <a
                href='https://whatipaid.fyi'
                target='_blank'
                rel='noreferrer'
                className='link text-emerald-500 hover:opacity-100 hover:underline'
                onClick={(e) => {
                  // Allow link click on desktop, prevent on mobile when toggling
                  if (window.innerWidth < 640 && expandedProject !== 'whatipaid') {
                    e.preventDefault();
                  }
                }}
              >
                www.whatipaid.fyi <span className='font-normal'>↗</span>
              </a>
            </div>
            <p className={`max-h-0 overflow-hidden transition-all duration-1000 ${expandedProject === 'whatipaid' ? 'max-h-40 mt-1' : ''}`}>
              crowdsourced platform for sharing real healthcare costs to bring transparency to elective medical procedure pricing.
            </p>
          </div>
          <div
            className='cursor-pointer'
            onClick={() => setExpandedProject(expandedProject === 'valor' ? null : 'valor')}
          >
            <div className='flex items-center justify-end gap-2'>
              <span className='text-emerald-500 text-sm opacity-70'>
                {expandedProject === 'valor' ? <IoChevronUp /> : <IoChevronDown />}
              </span>
              <a
                href='http://github.com/jason-kuang/Valor'
                target='_blank'
                rel='noreferrer'
                className='link text-emerald-500 hover:opacity-100 hover:underline'
                onClick={(e) => {
                  // Allow link click on desktop, prevent on mobile when toggling
                  if (window.innerWidth < 640 && expandedProject !== 'valor') {
                    e.preventDefault();
                  }
                }}
              >
                valor <span className='font-normal'>↗</span>
              </a>
            </div>
            <p className={`max-h-0 overflow-hidden transition-all duration-1000 ${expandedProject === 'valor' ? 'max-h-40 mt-1' : ''}`}>
              discord bot for league of legends players tracking real-time match data and live leaderboards with self-updating champion stats.
            </p>
          </div>
        </div>
      </Section>

      <Section header='currently.' headerClassName='!text-sm !text-left'>
        <div className='flex flex-col gap-2 text-left lowercase text-xs opacity-80 pl-4 sm:pl-0'>
          <div>
            <div className='text-emerald-500'>learning:</div>
            <div>programming w ai. figuring out if lasik is right for me. fujifilm colors. poker.</div>
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
