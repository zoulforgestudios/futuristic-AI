import { useState } from 'react';
import { Edit2, Activity, Zap, CheckCircle, Calendar } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Profile() {
  const { profileStats, theme, setTheme } = useApp();
  const [username, setUsername] = useState('ZoulUser');
  const [isEditing, setIsEditing] = useState(false);

  const recentActivity = [
    { id: 1, action: 'Activated Veil mode', time: '2 hours ago', icon: '🌑' },
    { id: 2, action: 'Completed 3 tasks', time: '5 hours ago', icon: '✅' },
    { id: 3, action: 'Used Shadow Reaper', time: 'Yesterday', icon: '🌑' },
    { id: 4, action: 'Added emergency contact', time: '2 days ago', icon: '🛡️' },
    { id: 5, action: 'Explored Holographic Map', time: '3 days ago', icon: '🗺️' },
  ];

  return (
    <div className="min-h-full overflow-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 p-8 bg-[var(--panel)] border border-[var(--stroke)] rounded-3xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--glow)] shadow-[0_0_40px_rgba(138,92,255,0.3)]" />
              <button className="absolute bottom-2 right-2 p-2 bg-[var(--accent)] text-white rounded-full hover:bg-[var(--glow)] transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="mb-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-4 py-2 bg-[var(--elevated)] text-[var(--text)] border border-[var(--accent)] rounded-xl focus:outline-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--glow)] transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-[var(--elevated)] text-[var(--text)] rounded-lg hover:bg-[var(--stroke)] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-[var(--text)]">{username}</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <p className="text-[var(--muted)] mb-6">ZoulForge User</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-[var(--elevated)] rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-[var(--accent)]">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="text-2xl text-[var(--text)] mb-1">
                    {profileStats.tasksCompleted}
                  </div>
                  <div className="text-sm text-[var(--muted)]">Tasks Done</div>
                </div>
                <div className="p-4 bg-[var(--elevated)] rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-[var(--accent)]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="text-2xl text-[var(--text)] mb-1">
                    {profileStats.aiModesUsed}
                  </div>
                  <div className="text-sm text-[var(--muted)]">AI Modes</div>
                </div>
                <div className="p-4 bg-[var(--elevated)] rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-[var(--accent)]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-2xl text-[var(--text)] mb-1">
                    {profileStats.daysActive}
                  </div>
                  <div className="text-sm text-[var(--muted)]">Days Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        <section className="mb-8">
          <h3 className="text-[var(--text)] mb-4">Appearance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['dark', 'light', 'neon'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  theme === t
                    ? 'border-[var(--accent)] shadow-[0_0_30px_rgba(138,92,255,0.2)]'
                    : 'border-[var(--stroke)] hover:border-[var(--accent)]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[var(--text)] capitalize">{t} Mode</span>
                  {theme === t && (
                    <div className="w-3 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
                  )}
                </div>
                <div className="h-20 rounded-xl bg-gradient-to-br from-[var(--panel)] to-[var(--elevated)] border border-[var(--stroke)]" />
              </button>
            ))}
          </div>
        </section>

        {/* Activity Timeline */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="text-[var(--text)]">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 bg-[var(--panel)] border border-[var(--stroke)] rounded-xl hover:border-[var(--accent)] transition-all"
              >
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="text-[var(--text)]">{activity.action}</div>
                  <div className="text-sm text-[var(--muted)]">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Linked Accounts */}
        <section className="mb-8">
          <h3 className="text-[var(--text)] mb-4">Linked Accounts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[var(--panel)] border border-[var(--stroke)] rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <span>Z</span>
                </div>
                <div>
                  <div className="text-[var(--text)]">ZoulForge Account</div>
                  <div className="text-sm text-[var(--muted)]">Primary</div>
                </div>
              </div>
              <div className="text-[var(--accent)]">Connected</div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section>
          <button className="w-full px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors">
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}
