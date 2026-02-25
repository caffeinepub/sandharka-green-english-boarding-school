import { BookOpen, MapPin, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3 border-b-2 border-accent pb-1">
            Our Story
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About Our School
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden shadow-hero">
              <img
                src="/assets/generated/sandharka_green_english_boarding_school.jpg"
                alt="Sandharka Green English Boarding School Campus"
                className="w-full h-80 lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-primary text-primary-foreground rounded-sm px-6 py-4 shadow-card">
              <div className="font-serif text-2xl font-bold">2063</div>
              <div className="font-sans text-xs tracking-wider uppercase opacity-80">Established B.S.</div>
            </div>
            {/* Decorative border */}
            <div className="absolute -top-3 -left-3 w-24 h-24 border-t-4 border-l-4 border-accent rounded-tl-sm" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground leading-snug">
              A Legacy of Academic Excellence in the Heart of Arghakhanchi
            </h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Sandharka Green English Boarding School was established in 2063 B.S. with a vision to provide quality English-medium education to the children of Arghakhanchi and surrounding districts. Nestled amidst the lush green hills of Sandharka-2, our school has grown into one of the most respected educational institutions in the region.
            </p>
            <p className="font-sans text-muted-foreground leading-relaxed">
              Our campus is a vibrant community of over 1,500 students and 55 dedicated teachers, all working together to create an environment where academic achievement, character development, and holistic growth go hand in hand.
            </p>

            {/* Key Points */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                { icon: BookOpen, title: 'English Medium', desc: 'Quality education in English from early grades' },
                { icon: MapPin, title: 'Arghakhanchi, Nepal', desc: 'Sandharka-2, surrounded by natural beauty' },
                { icon: Award, title: 'Academic Excellence', desc: 'Consistent top results in board examinations' },
                { icon: Users, title: 'Boarding Facility', desc: 'Safe and nurturing residential environment' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 bg-secondary rounded-sm border border-border hover:border-primary/30 transition-colors">
                  <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-sm text-foreground">{title}</div>
                    <div className="font-sans text-xs text-muted-foreground mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
