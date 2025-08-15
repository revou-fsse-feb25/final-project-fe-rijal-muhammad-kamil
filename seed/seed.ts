import * as fs from 'fs';

const Gender = { MALE: 'MALE', FEMALE: 'FEMALE' };
const Role = { ATTENDEE: 'ATTENDEE', EVENT_ORGANIZER: 'EVENT_ORGANIZER' };
const EventStatus = { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE', COMPLETED: 'COMPLETED' };
const PeriodStatus = { UPCOMING: 'UPCOMING', ONGOING: 'ONGOING', COMPLETED: 'COMPLETED' };
const TicketTypeName = { VIP: 'VIP', REGULAR: 'REGULAR', EARLY_BIRD: 'EARLY_BIRD' };
const TicketTypeStatus = { AVAILABLE: 'AVAILABLE', SOLD_OUT: 'SOLD_OUT' };

const data: any = {
  users: [],
  userProfiles: [],
  eventOrganizers: [],
  eventCategories: [],
  events: [],
  eventPeriods: [],
  ticketTypes: [],
  tickets: [],
  eventTerms: [],
};

// Buat kategori
const categoryNames = ['Music', 'Tech', 'Sports', 'Festival', 'Exhibition'];
categoryNames.forEach((name, i) => {
  data.eventCategories.push({
    id: i + 1,
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
});

// Buat 2 attendee
for (let i = 1; i <= 2; i++) {
  data.users.push({
    id: i,
    email: `attendee${i}@example.com`,
    createdAt: new Date().toISOString(),
  });
  data.userProfiles.push({
    id: i,
    userId: i,
    firstName: `Attendee${i}`,
    lastName: `User`,
    dateOfBirth: `199${i}-01-01`,
    gender: i % 2 === 0 ? Gender.FEMALE : Gender.MALE,
    phoneNumber: `+62810000000${i}`,
    password: 'hashedpassword',
    role: Role.ATTENDEE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

// Buat 10 organizer
for (let i = 1; i <= 10; i++) {
  const userId = i + 2; // karena attendee ada 2
  data.users.push({
    id: userId,
    email: `organizer${i}@example.com`,
    createdAt: new Date().toISOString(),
  });
  data.userProfiles.push({
    id: userId,
    userId,
    firstName: `Organizer${i}`,
    lastName: `User`,
    dateOfBirth: `198${i}-01-01`,
    gender: i % 2 === 0 ? Gender.FEMALE : Gender.MALE,
    phoneNumber: `+6282000000${i}`,
    password: 'hashedpassword',
    role: Role.EVENT_ORGANIZER,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  data.eventOrganizers.push({
    id: i,
    userId,
    name: `Organizer ${i} Events`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // 5 Event per organizer
  for (let j = 1; j <= 5; j++) {
    const eventId = (i - 1) * 5 + j;
    const categoryId = (eventId - 1) % categoryNames.length + 1;

    data.events.push({
      id: eventId,
      categoryId,
      organizerId: i,
      title: `Event ${eventId} - ${categoryNames[categoryId - 1]}`,
      description: `Deskripsi lengkap untuk Event ${eventId}`,
      location: `Venue ${eventId}, Jakarta`,
      imageUrl: `https://picsum.photos/200?${eventId}`,
      status: EventStatus.ACTIVE,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    data.eventTerms.push({
      id: eventId,
      eventId,
      description: `Syarat dan ketentuan Event ${eventId}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 2 Period per event
    for (let k = 1; k <= 2; k++) {
      const periodId = (eventId - 1) * 2 + k;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + periodId);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      data.eventPeriods.push({
        id: periodId,
        eventId,
        name: `Periode ${k}`,
        periodSequence: k,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        startTime: k === 1 ? '09:00:00' : '14:00:00',
        endTime: k === 1 ? '12:00:00' : '17:00:00',
        capacity: 100 + k * 50,
        status: PeriodStatus.UPCOMING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Ticket types
      const ticketTypesData = [
        { name: TicketTypeName.EARLY_BIRD, price: 50000, discount: 10, quota: 50 },
        { name: TicketTypeName.REGULAR, price: 75000, discount: 0, quota: 200 },
        { name: TicketTypeName.VIP, price: 150000, discount: 0, quota: 50 },
      ];
      ticketTypesData.forEach((t, idx) => {
        const typeId = ((periodId - 1) * 3) + idx + 1;
        data.ticketTypes.push({
          id: typeId,
          periodId,
          name: t.name,
          price: t.price,
          discount: t.discount,
          quota: t.quota,
          status: TicketTypeStatus.AVAILABLE,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      });
    }
  }
}

// Simpan ke file JSON
fs.writeFileSync('seed-data.json', JSON.stringify(data, null, 2));
console.log('JSON file created: seed-data.json');
