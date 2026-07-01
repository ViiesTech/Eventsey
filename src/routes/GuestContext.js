import React, { createContext, useState, useContext } from 'react';

const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const [selectedEventId, setSelectedEventId] = useState(null); // null means invite list
  const [guestProfile, setGuestProfile] = useState({
    name: 'Guest User',
    phone: '+1 (555) 123-4567',
  });

  // Track RSVPs per event ID
  const [rsvps, setRsvps] = useState({
    '1': { status: 'Accept', guestCount: '2' },
  });

  // Track blessings/messages sent by the user per event ID
  const [blessings, setBlessings] = useState({
    '1': [
      { id: 'b1', sender: 'Wilson & Emma', time: '12:03 AM', text: 'Congratulations on your upcoming wedding! We are so excited to celebrate with you.' },
      { id: 'b2', sender: 'David Thomas', time: 'Yesterday', text: 'So excited for the big day! Sending you guys all the love.' },
      { id: 'b3', sender: 'James Wilson', time: 'Yesterday', text: 'Thank you so much. Wishing you both a lifetime of happiness.' },
    ],
    '2': [
      { id: 'b4', sender: 'Thomas & Celina', time: '09:20 AM', text: 'Thank you so much for the invitation. We will be there!' },
      { id: 'b5', sender: 'Mike Thomas', time: 'Yesterday', text: 'Excited! Congratulations!' },
    ],
  });

  const events = [
    {
      id: '1',
      title: 'W & E Wedding',
      couple: 'Wilson & Emma',
      date: 'October 25, 2024 • 6:00 PM',
      time: '6:00 PM',
      venue: 'Grand Palace Hall, City Center',
      venueDetails: 'Grand Ballroom, The Plaza Hotel',
      address: '768 5th Ave, New York, NY 10019',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600',
      description: 'We joyfully invite you to celebrate our wedding',
      quote: '"Join us for an evening of love, laughter, and happily ever after"',
      thumbnails: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=150',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=150',
        'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=150',
        'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=150',
      ],
    },
    {
      id: '2',
      title: 'T & C Wedding',
      couple: 'Thomas & Celina',
      date: 'December 12, 2024 • 6:00 PM',
      time: '6:00 PM',
      venue: 'Grand Palace Hall, City Center',
      venueDetails: 'Main Banquet Hall, City Palace',
      address: '123 Palace Way, City Center, NY 10001',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600',
      description: 'Together with their families, Thomas & Celina invite you to share in their joy',
      quote: '"A successful marriage requires falling in love many times, always with the same person."',
      thumbnails: [
        'https://images.unsplash.com/photo-1472653525502-bf569cf1844e?auto=format&fit=crop&q=80&w=150',
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=150',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=150',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=150',
      ],
    },
  ];

  const selectedEvent = events.find(e => e.id === selectedEventId) || null;

  const submitRSVP = (eventId, status, guestCount) => {
    setRsvps(prev => ({
      ...prev,
      [eventId]: { status, guestCount },
    }));
  };

  const addBlessing = (eventId, text) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `user-b-${Date.now()}`,
      sender: guestProfile.name || 'Guest User',
      time: 'Just Now',
      text: text.trim(),
    };
    setBlessings(prev => ({
      ...prev,
      [eventId]: [newMsg, ...(prev[eventId] || [])],
    }));
  };

  return (
    <GuestContext.Provider
      value={{
        selectedEventId,
        setSelectedEventId,
        selectedEvent,
        events,
        guestProfile,
        setGuestProfile,
        rsvps,
        submitRSVP,
        blessings,
        addBlessing,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};

export const useGuest = () => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error('useGuest must be used within a GuestProvider');
  }
  return context;
};
