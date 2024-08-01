'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ContentTimeline = () => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const timelineItems = [
    {
      title: 'Class #1',
      duration: '15 min',
      description: 'Introduction to Programming',
      image: '/theoretical.png'
    },
    {
      title: 'Class #2',
      duration: '15 min',
      description: 'Setting Up Python Environment',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop #1',
      duration: '30 min',
      description: 'Writing Your First Python Program',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #1',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Class #3',
      duration: '15 min',
      description: 'Variables and Data Types',
      image: '/theoretical.png'
    },
    {
      title: 'Class #4',
      duration: '15 min',
      description: 'Basic Operations',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop #2',
      duration: '30 min',
      description: 'Working with Variables and Data Types',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #2',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Class #5',
      duration: '15 min',
      description: 'Conditional Statements (if, elif, else)',
      image: '/theoretical.png'
    },
    {
      title: 'Class #6',
      duration: '15 min',
      description: 'Loops (for, while)',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop #3',
      duration: '30 min',
      description: 'Implementing Control Structures',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #3',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Class #7',
      duration: '15 min',
      description: 'Defining and Calling Functions',
      image: '/theoretical.png'
    },
    {
      title: 'Class #8',
      duration: '15 min',
      description: 'Function Parameters and Return Values',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop #4',
      duration: '30 min',
      description: 'Creating and Using Functions',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #4',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Class #9',
      duration: '15 min',
      description: 'Lists and Tuples',
      image: '/theoretical.png'
    },
    {
      title: 'Class #10',
      duration: '15 min',
      description: 'Dictionaries and Sets',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop #5',
      duration: '30 min',
      description: 'Manipulating Data Structures',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #5',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Class #11',
      duration: '15 min',
      description: 'Working with Strings',
      image: '/theoretical.png'
    },
    {
      title: 'Class #12',
      duration: '15 min',
      description: 'String Methods and Formatting',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop #6',
      duration: '30 min',
      description: 'Practical String Manipulation',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #6',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Class #13',
      duration: '15 min',
      description: 'Reading from Files',
      image: '/theoretical.png'
    },
    {
      title: 'Class #14',
      duration: '15 min',
      description: 'Writing to Files',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop #7',
      duration: '30 min',
      description: 'File Input and Output Operations',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #7',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Class #15',
      duration: '15 min',
      description: 'Exception Handling',
      image: '/theoretical.png'
    },
    {
      title: 'Class #16',
      duration: '15 min',
      description: 'Debugging Techniques',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop #8',
      duration: '30 min',
      description: 'Writing Robust Programs with Error Handling',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #8',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Class #17',
      duration: '15 min',
      description: 'Using Standard Libraries',
      image: '/theoretical.png'
    },
    {
      title: 'Class #18',
      duration: '15 min',
      description: 'Exploring Popular Libraries (e.g., math, datetime)',
      image: '/theoretical.png'
    },
    {
      title: 'Workshop #9',
      duration: '30 min',
      description: 'Implementing Libraries in Projects',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #9',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Workshop #10',
      duration: '30 min',
      description: 'Project Planning',
      image: '/workshop.png'
    },
    {
      title: 'Assessment #10: Final Project',
      duration: '2 hours',
      description: '',
      image: '/assessment.png'
    },
    {
      title: 'Final Project Revision',
      duration: '30 min',
      description: '',
      image: '/idea.png'
    },
    {
      title: 'Obtain Certificate',
      duration: '',
      description: '',
      image: '/certificate.png'
    }
  ];
  return (
    <div className="flex flex-col w-full max-w-screen-md mt-6">
      {timelineItems.slice(0, showAll ? timelineItems.length : 3).map((item, index) => (
        <div key={index}>
          <div className="w-full flex items-center">
            <div className="bg-foreground text-background rounded-full h-16 w-16 text-center items-center justify-center flex text-2xl flex-none p-3">
              <Image src={item.image} width={200} height={200} alt={item.title} className="invert dark:invert-0" />
            </div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-4">{item.title}</h4>
            <p className="text-md text-muted-foreground ml-auto">{item.duration}</p>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-16">
              <div className="flex justify-center h-full w-16">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-max">
              <p className="leading-7">{item.description}</p>
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center relative w-16">
              <div className="flex justify-center h-full w-16">
                <div className="w-1 bg-foreground"></div>
              </div>
            </div>
            <div className="flex flex-col pl-4 w-auto space-y-2 h-8"></div>
          </div>
        </div>
      ))}
      <Button onClick={handleToggle} className="rounded-full h-16 w-16">
        {showAll ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </div>
  );
};

export default ContentTimeline;
