import React from 'react';

import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';
import Footer from '@/components/Footer';

const GETTING_STARTED = [
  {
    title: 'Sign up for an account',
    steps: ['Fill in your details and sign up.'],
    videoSrc: '/1-sign-up.mp4',
  },
  {
    title: 'Create an Organization',
    steps: [
      `Click on "Create Organization" and enter the organization's name then invite your team members and assign them roles (member or admin).`,
    ],
    videoSrc: '/2-create-organization.mp4',
  },
  {
    title: `Create Boards`,
    steps: [
      `Click on "Create Board." enter your board's name then click "Create".`,
    ],
    videoSrc: '/3-invite-members.mp4',
  },
  {
    title: `Start Collaborating`,
    steps: [
      `Use the various tools available (e.g., pen, selection, layer management) to start brainstorming and collaborating in real-time.`,
    ],
    videoSrc: '/4-board-collaboration.mp4',
  },
];

export default function page() {
  return (
    <div>
      <div className='mx-auto w-full max-w-screen-xl px-2.5 md:px-20 mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
        <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur-0 transition-all hover:border-gray-300 hover:bg-white/50'>
          <p className='text-sm font-semibold text-gray-700'>
            Board is now public
          </p>
        </div>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          Board: The Ultimate Brainstorming and Collaboration Tool for Teams
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          Welcome to Board, the premier platform designed to enhance
          brainstorming and collaboration for companies. Ideal for teams, Board
          provides a dynamic and interactive environment that supports real-time
          updates, multiple tools, and seamless layer management.
        </p>
        <SignedIn>
          <Link
            className={buttonVariants({
              size: 'lg',
              className: 'mt-5',
            })}
            href='/dashboard'
            target='_blank'
          >
            Get started <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        </SignedIn>
        <SignedOut>
          <div
            className={buttonVariants({
              size: 'lg',
              className: 'mt-5',
            })}
          >
            <SignUpButton />
          </div>
        </SignedOut>
      </div>

      {/* value proposition section */}
      <section>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <VideoPlayer src='app-showcase.mp4' />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className='max-w-screen-xl w-full mx-auto mb-32 mt-32 sm:mt-56'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Get Started with Board
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Simplify the whiteboarding process with Board.
            </p>
          </div>
        </div>

        <ol className='mx-auto w-full my-8 pt-8 flex flex-col items-center gap-y-28'>
          {GETTING_STARTED.map(({ title, steps, videoSrc }, i) => (
            <li
              className={`w-[90vw] flex flex-col-reverse gap-y-12 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:gap-x-14`}
              key={i}
            >
              <div className='w-full flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 lg:w-[50%]'>
                <span className='text-sm font-medium text-primary'>
                  Step {i + 1}
                </span>
                <span className='text-xl font-semibold'>{title}</span>

                {steps.map((step, i) => (
                  <span
                    className='mt-2 text-zinc-700'
                    key={i}
                  >
                    {step}
                  </span>
                ))}
              </div>
              <div className='w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 lg:w-[50%]'>
                <VideoPlayer src={videoSrc} />
              </div>
            </li>
          ))}
        </ol>
        {/* <ol className='mx-auto w-full my-8 pt-8 flex flex-col gap-y-16 items-center lg:gap-y-28'>
          {GETTING_STARTED.map(({ title, steps, videoSrc }, i) => (
            <li
              className={`w-[90vw] flex flex-col-reverse gap-y-8 lg:${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} lg:gap-x-20`}
              key={i}
            >
              <div className='w-full flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 lg:w-[50%]'>
                <span className='text-sm font-medium text-primary'>
                  Step {i + 1}
                </span>
                <span className='text-xl font-semibold'>{title}</span>

                {steps.map((step, i) => (
                  <span
                    className='mt-2 text-zinc-700'
                    key={i}
                  >
                    {step}
                  </span>
                ))}
              </div>

              <div className='w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 lg:w-[50%]'>
                <VideoPlayer src={videoSrc} />
              </div>
            </li>
          ))}
        </ol> */}
      </section>
      <Footer />
    </div>
  );
}
