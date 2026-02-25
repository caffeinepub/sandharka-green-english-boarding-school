import { Users, GraduationCap, BookOpen, Trophy } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '1500+',
    label: 'Students Enrolled',
    description: 'From Arghakhanchi and beyond',
  },
  {
    icon: GraduationCap,
    value: '55+',
    label: 'Qualified Teachers',
    description: 'Dedicated and experienced faculty',
  },
  {
    icon: BookOpen,
    value: '2063',
    label: 'Established B.S.',
    description: 'Decades of academic tradition',
  },
  {
    icon: Trophy,
    value: '100%',
    label: 'Pass Rate',
    description: 'Consistent board exam results',
  },
];

export default function Stats() {
  return (
    <section id="stats" className="py-20 bg-forest-800 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-sans font-semibold tracking-widest uppercase text-gold-300 mb-3">
            By The Numbers
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            Our School at a Glance
          </h2>
          <div className="w-16 h-1 bg-gold-400 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map(({ icon: Icon, value, label, description }) => (
            <div
              key={label}
              className="group text-center p-6 lg:p-8 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-gold-400/40 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gold-400/20 border border-gold-400/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-400/30 transition-colors">
                <Icon className="w-6 h-6 text-gold-300" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-white mb-1">
                {value}
              </div>
              <div className="font-sans font-semibold text-gold-300 text-sm mb-1">
                {label}
              </div>
              <div className="font-sans text-white/50 text-xs">
                {description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
