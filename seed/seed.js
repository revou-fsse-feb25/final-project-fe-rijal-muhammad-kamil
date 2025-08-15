"use strict";
const fs = require("fs");

const Gender = { MALE: 'MALE', FEMALE: 'FEMALE' };
const Role = { ATTENDEE: 'ATTENDEE', EVENT_ORGANIZER: 'EVENT_ORGANIZER' };
const EventStatus = { ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE', COMPLETED: 'COMPLETED' };
const PeriodStatus = { UPCOMING: 'UPCOMING', ONGOING: 'ONGOING', COMPLETED: 'COMPLETED' };
const TicketTypeName = { VIP: 'VIP', REGULAR: 'REGULAR', EARLY_BIRD: 'EARLY_BIRD' };
const TicketTypeStatus = { AVAILABLE: 'AVAILABLE', SOLD_OUT: 'SOLD_OUT' };

const data = {
  users: [],
  userProfiles: [],
  eventOrganizers: [],
  eventCategories: [],
  events: [],
  eventTerms: [],
  eventPeriods: [],
  ticketTypes: [],
  tickets: [],
};

// 5 Kategori
const categoryNames = ['Music', 'Tech', 'Sports', 'Festival', 'Exhibition'];
categoryNames.forEach((name, i) => {
  data.eventCategories.push({
    category_id: i + 1,
    name,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
});

// 2 ATTENDEE
for (let i = 1; i <= 2; i++) {
  data.users.push({
    user_id: i,
    email: `attendee${i}@example.com`,
    created_at: new Date().toISOString(),
  });
  data.userProfiles.push({
    profile_id: i,
    user_id: i,
    first_name: `Attendee${i}`,
    last_name: "User",
    date_of_birth: `199${i}-01-01`,
    gender: i % 2 === 0 ? Gender.FEMALE : Gender.MALE,
    phone_number: `+62810000000${i}`,
    password: "hashedpassword",
    role: Role.ATTENDEE,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

// 10 EVENT_ORGANIZER
for (let i = 1; i <= 10; i++) {
  const userId = i + 2;
  data.users.push({
    user_id: userId,
    email: `organizer${i}@example.com`,
    created_at: new Date().toISOString(),
  });
  data.userProfiles.push({
    profile_id: userId,
    user_id: userId,
    first_name: `Organizer${i}`,
    last_name: "User",
    date_of_birth: `198${i}-01-01`,
    gender: i % 2 === 0 ? Gender.FEMALE : Gender.MALE,
    phone_number: `+6282000000${i}`,
    password: "hashedpassword",
    role: Role.EVENT_ORGANIZER,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  data.eventOrganizers.push({
    organizer_id: i,
    user_id: userId,
    name: `Organizer ${i} Events`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  // 5 Event per organizer
  for (let j = 1; j <= 5; j++) {
    const eventId = (i - 1) * 5 + j;
    const categoryId = (eventId - 1) % categoryNames.length + 1;

    data.events.push({
      event_id: eventId,
      category_id: categoryId,
      organizer_id: i,
      title: `Event ${eventId} - ${categoryNames[categoryId-1]}`,
      description: `Deskripsi lengkap Event ${eventId}`,
      location: `Venue ${eventId}, Jakarta`,
      image_url: `https://picsum.photos/200?${eventId}`,
      status: EventStatus.ACTIVE,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    data.eventTerms.push({
      term_id: eventId,
      event_id: eventId,
      description: `Syarat dan ketentuan Event ${eventId}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    // 2 EventPeriod per Event
    for (let k = 1; k <= 2; k++) {
      const periodId = (eventId-1)*2 + k;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + periodId);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      data.eventPeriods.push({
        period_id: periodId,
        event_id: eventId,
        name: `Periode ${k}`,
        period_sequence: k,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        start_time: k===1 ? '09:00:00' : '14:00:00',
        end_time: k===1 ? '12:00:00' : '17:00:00',
        capacity: 100 + k*50,
        status: PeriodStatus.UPCOMING,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      // 3 TicketType per period
      const ticketTypes = [
        { name: TicketTypeName.EARLY_BIRD, price: 50000, discount: 10, quota: 50 },
        { name: TicketTypeName.REGULAR, price: 75000, discount: 0, quota: 200 },
        { name: TicketTypeName.VIP, price: 150000, discount: 0, quota: 50 },
      ];

      ticketTypes.forEach((t, idx) => {
        const typeId = (periodId-1)*3 + idx +1;
        data.ticketTypes.push({
          type_id: typeId,
          period_id: periodId,
          name: t.name,
          price: t.price,
          discount: t.discount,
          quota: t.quota,
          status: TicketTypeStatus.AVAILABLE,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        // Tickets 30% dibeli attendee
        const buyCount = Math.floor(t.quota*0.3);
        for (let l=1; l<=buyCount; l++){
          data.tickets.push({
            ticket_id: data.tickets.length+1,
            type_id: typeId,
            buyer_id: Math.random()>0.5 ? 1 : 2,
            ticket_code: `TKT-${eventId}-${periodId}-${typeId}-${l.toString().padStart(3,'0')}`,
            is_deleted: false,
            created_at: new Date().toISOString(),
          });
        }
      });
    }
  }
}

fs.writeFileSync('seed-data.json', JSON.stringify(data, null,2));
console.log("JSON seed file created: seed-data.json");
