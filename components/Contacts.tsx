import { FaFileAlt } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';
import { SiGithub } from 'react-icons/si';
import {MdAlternateEmail} from 'react-icons/md';

export const github = 'https://github.com/jason-kuang';
export const linkedIn = 'https://www.linkedin.com/in/jasonkuang1/';
export const email = 'jkuang5@buffalo.edu';

export const links: LinkInfo[] = [
  {
    icon: <MdAlternateEmail />,
    title: 'Email',
    href: `mailto:${email}`,
  },
  {
    icon: <SiGithub />,
    title: 'GitHub',
    href: 'https://github.com/jason-kuang',
  },
  {
    icon: <BsLinkedin />,
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jasonkuang1/',
  },
  {
    icon: <FaFileAlt />,
    title: 'Resume',
    href: '/jason-resume.pdf',
  },
];

export interface LinkInfo {
  icon?: React.ReactNode;
  title: string;
  href: string;
}