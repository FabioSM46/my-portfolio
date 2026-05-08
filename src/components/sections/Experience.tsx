/**
 * Experience Section
 * Minimal timeline with visual emphasis
 * Clean, understated design that doesn't compete with 3D elements
 */

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: 'Full-Stack Engineer',
    company: 'EagleProjects',
    location: 'Perugia, Italy',
    period: '2023 – Present',
    highlights: [
      'Migrated 5+ backend services to NestJS microservices',
      'Built real-time geospatial rendering engine with Deck.gl + PostGIS (1M+ features)',
      'Developed drone/robotic control interfaces with React + Node.js',
      'Integrated Encore.ts and expanded test coverage',
    ],
  },
];

function ExperienceCard({ experience, index }: { experience: ExperienceItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative"
    >
      <div className="flex items-start gap-6">
        {/* Timeline dot */}
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />
          <div className="w-0.5 h-full bg-border mt-2" />
        </div>

        {/* Content */}
        <div className="pb-12">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-medium">{experience.title}</span>
          </div>

          <h3 className="text-2xl font-bold text-foreground">{experience.company}</h3>

          <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {experience.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {experience.period}
            </span>
          </div>

          <ul className="mt-4 space-y-2">
            {experience.highlights.map((highlight, i) => (
              <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gradient">Experience</h2>
        <p className="mt-4 text-muted-foreground">Current role and key contributions</p>
      </motion.div>

      <div className="w-full max-w-3xl">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.company} experience={exp} index={index} />
        ))}

        {/* Education - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 p-6 rounded-lg border border-border bg-card/50"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Education</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-foreground font-medium">Full-Stack Web Development Bootcamp</p>
                <p className="text-sm text-muted-foreground">Ironhack — 2023</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-foreground font-medium">Radiology Technology</p>
                <p className="text-sm text-muted-foreground">University of Perugia — 2014-2017</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
