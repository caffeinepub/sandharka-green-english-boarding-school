import { Clock, Mail, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["Sandharka-2, Arghakhanchi", "Lumbini Province, Nepal"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["077-420586"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@sandharkagreen.edu.np", "principal@sandharkagreen.edu.np"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Sunday – Friday: 9:00 AM – 5:00 PM", "Saturday: Closed"],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3 border-b-2 border-accent pb-1">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="font-sans text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            We'd love to hear from you. Reach out to us for admissions,
            inquiries, or any information about our school.
          </p>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              School Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {contactInfo.map(({ icon: Icon, title, lines }) => (
                <div
                  key={title}
                  className="flex gap-4 p-5 bg-secondary rounded-sm border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-sm text-foreground mb-1">
                      {title}
                    </div>
                    {lines.map((line) => (
                      <div
                        key={line}
                        className="font-sans text-xs text-muted-foreground leading-relaxed"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder with campus photo */}
            <div className="relative rounded-sm overflow-hidden border border-border h-48 bg-muted flex items-center justify-center">
              <img
                src="/assets/FB_IMG_1772019352532-2.jpg"
                alt="School location"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-forest-900/50 flex flex-col items-center justify-center gap-2">
                <MapPin className="w-8 h-8 text-gold-300" />
                <span className="font-sans text-white font-semibold text-sm">
                  Sandharka-2, Arghakhanchi, Nepal
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-sm p-6 sm:p-8 shadow-card">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              Send Us a Message
            </h3>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Thank you for your message! We will get back to you soon.",
                );
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-sans text-sm font-medium text-foreground mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block font-sans text-sm font-medium text-foreground mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="+977-XXXXXXXXXX"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-sans text-sm font-medium text-foreground mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-sans text-sm font-medium text-foreground mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Admission inquiry / General question"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-sans text-sm font-medium text-foreground mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-sm font-sans text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold rounded-sm transition-colors duration-200 text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
