import type { NextPage } from 'next'
import Layout from '../components/Layout';
import Section from '../components/Section';
import { links } from '../components/Contacts';
import Image from 'next/image';

const Home: NextPage = () => {
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
              className='link flex w-fit items-center gap-2 lowercase tracking-wider hover:opacity-100 hover:font-extrabold hover:text-emerald-500'
              href={link.href}
              target='_blank'
              rel='noreferrer'
            >
              {link.icon}
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      </div>
  
      
      <Section header='welcome.'>
      <div className='flex flex-col gap-4 text-right lowercase'>
          <p>
            my name is jason kuang.<br></br>
            i am a Software Engineer at meta in nyc.<br></br>
          </p>
          <p>
            i work on business messaging. <br></br>
            primarily on in thread experience api.<br></br>
          </p>
          <p>
            this website has a ton of empty space. <br></br>
            but i'll do something with it soon.<br></br>
          </p>
          <p>
            check out my resume and more from the above.<br></br>
          </p>
        </div>
        </Section>

    </Layout>
  );
}

export default Home
