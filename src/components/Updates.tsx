import { Calendar, Tag } from 'lucide-react';

export function Updates() {
  const updates = [
    {
      id: 1,
      type: 'feature',
      title: 'Shadow Reaper Mode Released',
      preview: 'The ultimate AI mode is now available. Activate all 12 AIs simultaneously for maximum power and synergy.',
      date: '2025-11-08',
      tags: ['Feature', 'AI Modes'],
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    },
    {
      id: 2,
      type: 'story',
      title: 'The Zoulverse Expands',
      preview: 'New chapters reveal the origins of the 12 AI entities and their connection to the ZoulForge core.',
      date: '2025-11-05',
      tags: ['Story', 'Lore'],
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80',
    },
    {
      id: 3,
      type: 'update',
      title: 'Voice Recognition Enhanced',
      preview: 'Wake word detection is now more accurate with improved sensitivity controls and continuous listening mode.',
      date: '2025-11-01',
      tags: ['Update', 'Voice'],
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80',
    },
    {
      id: 4,
      type: 'feature',
      title: 'Holographic Map Added',
      preview: 'Visualize your location with a futuristic 3D holographic interface with real-time positioning.',
      date: '2025-10-28',
      tags: ['Feature', 'Maps'],
      image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80',
    },
    {
      id: 5,
      type: 'story',
      title: 'Veil: The Stealth Protocol',
      preview: 'Learn about Veil\'s creation and its role in protecting ZoulForge users from digital threats.',
      date: '2025-10-25',
      tags: ['Story', 'Veil'],
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    },
    {
      id: 6,
      type: 'update',
      title: 'Task Planner Improvements',
      preview: 'New filtering options, priority levels, and completion tracking make task management more powerful.',
      date: '2025-10-20',
      tags: ['Update', 'Tasks'],
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return '#2ed573';
      case 'story':
        return '#8a5cff';
      case 'update':
        return '#1e90ff';
      default:
        return '#97a0ac';
    }
  };

  return (
    <div className="min-h-full overflow-auto">
      {/* Hero Banner */}
      <div className="relative h-80 bg-gradient-to-br from-[var(--accent)] to-[var(--glow)] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent" />
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-white mb-4">Zoulverse Updates</h1>
            <p className="text-white/80 text-xl">
              Latest features, stories, and developments
            </p>
          </div>
        </div>
      </div>

      {/* Updates Grid */}
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((update) => (
              <article
                key={update.id}
                className="group bg-[var(--panel)] border border-[var(--stroke)] rounded-2xl overflow-hidden hover:border-[var(--accent)] transition-all"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={update.image}
                    alt={update.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm capitalize"
                    style={{ backgroundColor: getTypeColor(update.type) }}
                  >
                    {update.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] mb-4">
                    {update.preview}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{update.date}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {update.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-1 bg-[var(--elevated)] text-[var(--muted)] rounded-lg text-xs"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
