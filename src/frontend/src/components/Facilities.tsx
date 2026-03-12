import {
  BookOpen,
  Dumbbell,
  FlaskConical,
  Home,
  Monitor,
  Music,
  TreePine,
  Utensils,
} from "lucide-react";

const facilities = [
  {
    icon: BookOpen,
    title: "Library",
    description:
      "A well-stocked library with thousands of books, reference materials, and digital resources to support learning.",
  },
  {
    icon: FlaskConical,
    title: "Science Laboratories",
    description:
      "Fully equipped physics, chemistry, and biology labs for hands-on practical learning and experiments.",
  },
  {
    icon: Monitor,
    title: "Computer Lab",
    description:
      "Modern computer laboratory with internet access, enabling students to develop digital literacy skills.",
  },
  {
    icon: Dumbbell,
    title: "Sports Facilities",
    description:
      "Spacious playground and sports facilities for cricket, football, volleyball, and athletics.",
  },
  {
    icon: Home,
    title: "Boarding House",
    description:
      "Safe, comfortable, and supervised boarding facilities for residential students with all amenities.",
  },
  {
    icon: Utensils,
    title: "Dining Hall",
    description:
      "Nutritious and hygienic meals served in a spacious dining hall, catering to all students daily.",
  },
  {
    icon: Music,
    title: "Arts & Culture",
    description:
      "Dedicated spaces for music, dance, and cultural activities to nurture creativity and expression.",
  },
  {
    icon: TreePine,
    title: "Green Campus",
    description:
      "A beautiful, eco-friendly campus surrounded by gardens and trees, providing a peaceful learning environment.",
  },
];

export default function Facilities() {
  return (
    <section id="facilities" className="py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3 border-b-2 border-accent pb-1">
            Infrastructure
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            World-Class Facilities
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            We provide a comprehensive range of facilities to ensure every
            student has access to the best resources for their academic and
            personal development.
          </p>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-card border border-border rounded-sm p-6 hover:border-primary/40 hover:shadow-card transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif font-bold text-foreground text-lg mb-2">
                {title}
              </h3>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
