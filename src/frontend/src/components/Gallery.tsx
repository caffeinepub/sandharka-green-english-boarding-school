import { Camera } from "lucide-react";

const REAL_PHOTO_1 = "/assets/FB_IMG_1772019352532.jpg";
const REAL_PHOTO_2 = "/assets/FB_IMG_1772019352532-1.jpg";
const REAL_PHOTO_3 = "/assets/FB_IMG_1772019352532-2.jpg";
const REAL_PHOTO_4 = "/assets/FB_IMG_1772019352532-3.jpg";

const gridImages = [
  {
    src: REAL_PHOTO_1,
    alt: "Sandharka Green English Boarding School – Montessori Block",
    label: "Montessori Block",
  },
  {
    src: REAL_PHOTO_2,
    alt: "Sandharka Green English Boarding School – Main Campus Building",
    label: "Main Campus",
  },
  {
    src: REAL_PHOTO_3,
    alt: "Sandharka Green English Boarding School – Campus View",
    label: "Campus View",
  },
  {
    src: REAL_PHOTO_4,
    alt: "Sandharka Green English Boarding School – School Buildings",
    label: "School Buildings",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 lg:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-sans font-semibold tracking-widest uppercase text-primary mb-3 border-b-2 border-accent pb-1">
            Campus Life
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Photo Gallery
          </h2>
          <p className="font-sans text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            A glimpse into the vibrant life at Sandharka Green English Boarding
            School.
          </p>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mt-4" />
        </div>

        {/* Two featured real campus photos side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Featured Photo 1 */}
          <div className="relative rounded-sm overflow-hidden shadow-hero group">
            <img
              src={REAL_PHOTO_1}
              alt="Sandharka Green English Boarding School – Montessori Block & Campus"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-1">
                <Camera className="w-4 h-4 text-gold-300" />
                <span className="font-sans text-gold-300 text-xs font-medium tracking-wider uppercase">
                  Campus View
                </span>
              </div>
              <h3 className="font-serif text-white text-lg sm:text-xl font-bold">
                Montessori Block
              </h3>
              <p className="font-sans text-white/70 text-sm mt-0.5">
                Sandharka Green English Boarding School
              </p>
            </div>
          </div>

          {/* Featured Photo 2 */}
          <div className="relative rounded-sm overflow-hidden shadow-hero group">
            <img
              src={REAL_PHOTO_3}
              alt="Sandharka Green English Boarding School – Main Building & School Bus"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-1">
                <Camera className="w-4 h-4 text-gold-300" />
                <span className="font-sans text-gold-300 text-xs font-medium tracking-wider uppercase">
                  Campus View
                </span>
              </div>
              <h3 className="font-serif text-white text-lg sm:text-xl font-bold">
                Main Campus Building
              </h3>
              <p className="font-sans text-white/70 text-sm mt-0.5">
                Sandharka-2, Arghakhanchi, Nepal
              </p>
            </div>
          </div>
        </div>

        {/* Grid of smaller images */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {gridImages.map((img) => (
            <div
              key={img.src}
              className="relative rounded-sm overflow-hidden shadow-card group aspect-square"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-forest-900/30 group-hover:bg-forest-900/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-sans text-white text-xs font-medium">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
