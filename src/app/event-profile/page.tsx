"use client";

import React, { useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridApi, CellValueChangedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Types
interface Event {
  event_id: number;
  title: string;
  category_id: number;
  organizer_id: number;
  description: string;
  terms: string;
  location: string;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface EventPeriod {
  period_id: number;
  event_id: number;
  name: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface TicketType {
  type_id: number;
  period_id: number;
  category_id: number;
  price: number;
  discount: number;
  quota: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Mock data berdasarkan struktur yang diberikan
const mockEvents: Event[] = [
  {
    event_id: 1,
    title: "Tech Conference 2025",
    category_id: 2,
    organizer_id: 1001,
    description: "A conference about the latest in tech.",
    terms: "No refund after purchase.",
    location: "Jakarta Convention Center",
    image_url: "/images/event1.jpg",
    status: "active",
    created_at: "2025-08-01T10:00:00Z",
    updated_at: "2025-08-10T12:00:00Z",
  },
  {
    event_id: 2,
    title: "Music Festival 2025",
    category_id: 3,
    organizer_id: 1002,
    description: "Annual music festival with top artists.",
    terms: "Tickets are non-transferable.",
    location: "Bali Beach Stage",
    image_url: "/images/event2.jpg",
    status: "active",
    created_at: "2025-08-05T11:00:00Z",
    updated_at: "2025-08-12T09:00:00Z",
  },
];

const mockEventPeriods: EventPeriod[] = [
  {
    period_id: 1,
    event_id: 1,
    name: "Early Bird",
    start_date: "2025-09-01",
    end_date: "2025-09-15",
    start_time: "08:00",
    end_time: "18:00",
    status: "open",
    created_at: "2025-08-10T12:00:00Z",
    updated_at: "2025-08-15T12:00:00Z",
  },
  {
    period_id: 2,
    event_id: 1,
    name: "Regular Sale",
    start_date: "2025-09-16",
    end_date: "2025-09-30",
    start_time: "08:00",
    end_time: "18:00",
    status: "open",
    created_at: "2025-08-12T12:00:00Z",
    updated_at: "2025-08-18T12:00:00Z",
  },
  {
    period_id: 3,
    event_id: 2,
    name: "VIP Access",
    start_date: "2025-10-01",
    end_date: "2025-10-15",
    start_time: "09:00",
    end_time: "22:00",
    status: "closed",
    created_at: "2025-08-14T12:00:00Z",
    updated_at: "2025-08-20T12:00:00Z",
  },
];

const mockTicketTypes: TicketType[] = [
  {
    type_id: 1,
    period_id: 1,
    category_id: 10,
    price: 100.0,
    discount: 10.0,
    quota: 100,
    status: "available",
    created_at: "2025-08-10T12:00:00Z",
    updated_at: "2025-08-15T12:00:00Z",
  },
  {
    type_id: 2,
    period_id: 1,
    category_id: 11,
    price: 150.0,
    discount: 20.0,
    quota: 50,
    status: "available",
    created_at: "2025-08-11T12:00:00Z",
    updated_at: "2025-08-15T12:00:00Z",
  },
  {
    type_id: 3,
    period_id: 2,
    category_id: 10,
    price: 200.0,
    discount: 0,
    quota: 200,
    status: "available",
    created_at: "2025-08-12T12:00:00Z",
    updated_at: "2025-08-18T12:00:00Z",
  },
];

export default function EventProfilePage() {
  const [activeTab, setActiveTab] = useState<"events" | "periods" | "tickets">("events");
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [eventPeriods, setEventPeriods] = useState<EventPeriod[]>(mockEventPeriods);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(mockTicketTypes);

  const [eventGridApi, setEventGridApi] = useState<GridApi | null>(null);
  const [periodGridApi, setPeriodGridApi] = useState<GridApi | null>(null);
  const [ticketGridApi, setTicketGridApi] = useState<GridApi | null>(null);

  // Helper functions
  const getCurrentTimestamp = () => new Date().toISOString();
  const getNextId = (data: any[], idField: string) => {
    return Math.max(...data.map((item) => item[idField]), 0) + 1;
  };

  // Grid ready handlers
  const onEventGridReady = useCallback((params: any) => {
    setEventGridApi(params.api);
  }, []);

  const onPeriodGridReady = useCallback((params: any) => {
    setPeriodGridApi(params.api);
  }, []);

  const onTicketGridReady = useCallback((params: any) => {
    setTicketGridApi(params.api);
  }, []);

  // Cell value changed handlers
  const onEventCellValueChanged = (params: CellValueChangedEvent) => {
    console.log("Event cell changed:", params.data);
    const updatedEvent = { ...params.data, updated_at: getCurrentTimestamp() };
    setEvents((prev) => prev.map((event) => (event.event_id === updatedEvent.event_id ? updatedEvent : event)));
  };

  const onPeriodCellValueChanged = (params: CellValueChangedEvent) => {
    console.log("Period cell changed:", params.data);
    const updatedPeriod = { ...params.data, updated_at: getCurrentTimestamp() };
    setEventPeriods((prev) => prev.map((period) => (period.period_id === updatedPeriod.period_id ? updatedPeriod : period)));
  };

  const onTicketCellValueChanged = (params: CellValueChangedEvent) => {
    console.log("Ticket cell changed:", params.data);
    const updatedTicket = { ...params.data, updated_at: getCurrentTimestamp() };
    setTicketTypes((prev) => prev.map((ticket) => (ticket.type_id === updatedTicket.type_id ? updatedTicket : ticket)));
  };

  // Debug effect
  useEffect(() => {
    console.log("Events data:", events);
    console.log("Event Periods data:", eventPeriods);
    console.log("Ticket Types data:", ticketTypes);
  }, [events, eventPeriods, ticketTypes]);

  // CRUD Operations
  const addEvent = () => {
    const newEvent: Event = {
      event_id: getNextId(events, "event_id"),
      title: "New Event",
      category_id: 1,
      organizer_id: 1000,
      description: "New event description",
      terms: "Standard terms",
      location: "TBD",
      image_url: "/images/default.jpg",
      status: "draft",
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const addPeriod = () => {
    const newPeriod: EventPeriod = {
      period_id: getNextId(eventPeriods, "period_id"),
      event_id: events[0]?.event_id || 1,
      name: "New Period",
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date().toISOString().split("T")[0],
      start_time: "09:00",
      end_time: "17:00",
      status: "draft",
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };
    setEventPeriods((prev) => [...prev, newPeriod]);
  };

  const addTicketType = () => {
    const newTicketType: TicketType = {
      type_id: getNextId(ticketTypes, "type_id"),
      period_id: eventPeriods[0]?.period_id || 1,
      category_id: 1,
      price: 0,
      discount: 0,
      quota: 0,
      status: "draft",
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };
    setTicketTypes((prev) => [...prev, newTicketType]);
  };

  const deleteSelectedRows = (gridApi: GridApi | null, setData: Function, idField: string) => {
    if (!gridApi) return;

    const selectedRows = gridApi.getSelectedRows();
    if (selectedRows.length === 0) {
      alert("Please select rows to delete");
      return;
    }

    const selectedIds = selectedRows.map((row) => row[idField]);
    setData((prev: any[]) => prev.filter((item) => !selectedIds.includes(item[idField])));

    // Cascade delete for related data
    if (idField === "event_id") {
      setEventPeriods((prev) => prev.filter((period) => !selectedIds.includes(period.event_id)));
      setTicketTypes((prev) =>
        prev.filter((ticket) => {
          const relatedPeriods = eventPeriods.filter((period) => selectedIds.includes(period.event_id));
          return !relatedPeriods.some((period) => period.period_id === ticket.period_id);
        }),
      );
    } else if (idField === "period_id") {
      setTicketTypes((prev) => prev.filter((ticket) => !selectedIds.includes(ticket.period_id)));
    }
  };

  // Column definitions
  const eventColumns: ColDef[] = [
    { field: "event_id", headerName: "ID", width: 80, editable: false },
    { field: "title", headerName: "Title", flex: 1, editable: true },
    { field: "category_id", headerName: "Category ID", width: 120, editable: true },
    { field: "organizer_id", headerName: "Organizer ID", width: 120, editable: true },
    { field: "description", headerName: "Description", flex: 1, editable: true },
    { field: "location", headerName: "Location", flex: 1, editable: true },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["active", "inactive", "draft", "cancelled"],
      },
    },
    {
      field: "created_at",
      headerName: "Created",
      width: 150,
      editable: false,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "updated_at",
      headerName: "Updated",
      width: 150,
      editable: false,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
  ];

  const periodColumns: ColDef[] = [
    { field: "period_id", headerName: "ID", width: 80, editable: false },
    {
      field: "event_id",
      headerName: "Event",
      width: 150,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: events.map((e) => e.event_id),
        valueListGap: 0,
      },
      valueFormatter: (params) => {
        const event = events.find((e) => e.event_id === params.value);
        return event ? `${event.event_id} - ${event.title}` : params.value;
      },
    },
    { field: "name", headerName: "Name", flex: 1, editable: true },
    { field: "start_date", headerName: "Start Date", width: 120, editable: true },
    { field: "end_date", headerName: "End Date", width: 120, editable: true },
    { field: "start_time", headerName: "Start Time", width: 100, editable: true },
    { field: "end_time", headerName: "End Time", width: 100, editable: true },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["open", "closed", "draft", "cancelled"],
      },
    },
    {
      field: "created_at",
      headerName: "Created",
      width: 150,
      editable: false,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
  ];

  const ticketColumns: ColDef[] = [
    { field: "type_id", headerName: "ID", width: 80, editable: false },
    {
      field: "period_id",
      headerName: "Period",
      width: 150,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: eventPeriods.map((p) => p.period_id),
        valueListGap: 0,
      },
      valueFormatter: (params) => {
        const period = eventPeriods.find((p) => p.period_id === params.value);
        return period ? `${period.period_id} - ${period.name}` : params.value;
      },
    },
    { field: "category_id", headerName: "Category ID", width: 120, editable: true },
    { field: "price", headerName: "Price", width: 100, editable: true, valueFormatter: (params) => `$${params.value}` },
    { field: "discount", headerName: "Discount", width: 100, editable: true, valueFormatter: (params) => `${params.value}%` },
    { field: "quota", headerName: "Quota", width: 100, editable: true },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["available", "sold_out", "draft", "cancelled"],
      },
    },
    {
      field: "created_at",
      headerName: "Created",
      width: 150,
      editable: false,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Event Management</h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Events</h3>
            <p className="text-3xl font-bold text-blue-600">{events.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Periods</h3>
            <p className="text-3xl font-bold text-green-600">{eventPeriods.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Ticket Types</h3>
            <p className="text-3xl font-bold text-purple-600">{ticketTypes.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: "events", label: "Events", count: events.length },
                { key: "periods", label: "Event Periods", count: eventPeriods.length },
                { key: "tickets", label: "Ticket Types", count: ticketTypes.length },
              ].map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className={`py-4 px-6 border-b-2 font-medium text-sm ${activeTab === tab.key ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Events Tab */}
            {activeTab === "events" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Events</h2>
                  <div className="space-x-2">
                    <button onClick={addEvent} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Add Event
                    </button>
                    <button onClick={() => deleteSelectedRows(eventGridApi, setEvents, "event_id")} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                      Delete Selected
                    </button>
                  </div>
                </div>
                <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
                  <AgGridReact
                    rowData={events}
                    columnDefs={eventColumns}
                    onGridReady={onEventGridReady}
                    onCellValueChanged={onEventCellValueChanged}
                    rowSelection="multiple"
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    enableCellTextSelection={true}
                    suppressRowClickSelection={true}
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      resizable: true,
                      minWidth: 100,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Event Periods Tab */}
            {activeTab === "periods" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Event Periods</h2>
                  <div className="space-x-2">
                    <button onClick={addPeriod} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                      Add Period
                    </button>
                    <button onClick={() => deleteSelectedRows(periodGridApi, setEventPeriods, "period_id")} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                      Delete Selected
                    </button>
                  </div>
                </div>
                <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
                  <AgGridReact
                    rowData={eventPeriods}
                    columnDefs={periodColumns}
                    onGridReady={onPeriodGridReady}
                    onCellValueChanged={onPeriodCellValueChanged}
                    rowSelection="multiple"
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    enableCellTextSelection={true}
                    suppressRowClickSelection={true}
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      resizable: true,
                      minWidth: 100,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Ticket Types Tab */}
            {activeTab === "tickets" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Ticket Types</h2>
                  <div className="space-x-2">
                    <button onClick={addTicketType} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                      Add Ticket Type
                    </button>
                    <button onClick={() => deleteSelectedRows(ticketGridApi, setTicketTypes, "type_id")} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                      Delete Selected
                    </button>
                  </div>
                </div>
                <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
                  <AgGridReact
                    rowData={ticketTypes}
                    columnDefs={ticketColumns}
                    onGridReady={onTicketGridReady}
                    onCellValueChanged={onTicketCellValueChanged}
                    rowSelection="multiple"
                    pagination={true}
                    paginationPageSize={10}
                    animateRows={true}
                    enableCellTextSelection={true}
                    suppressRowClickSelection={true}
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      resizable: true,
                      minWidth: 100,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
