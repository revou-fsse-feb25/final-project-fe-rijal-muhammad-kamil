async findManyEventWithFilter(where: Prisma.EventWhereInput = {}): Promise<Event[]> {
    return this.prisma.event.findMany({
      where: { deleted_at: null, ...where },
      include: this.defaultInclude,
      orderBy: { created_at: 'desc' },
    });
  }

   async findManyWithFilter(search?: string, category_id?: number, location?: string, start_date?: string): Promise<Event[]> {
    const where: Prisma.EventWhereInput = {
      deleted_at: null,
      ...(category_id && { category_id }),
      ...(location && { location: { contains: location, mode: 'insensitive' } }),
      ...(search && { title: { contains: search, mode: 'insensitive' } }),
      ...(start_date && { periods: { some: { start_date: { gte: start_date }, deleted_at: null } } }),
    };

  @Get()
  @ApiOperation({
    summary: 'Get events with filter (Public)',
    description: `
    Retrieve a list of events with optional filters:
    - search (by title)
    - category_id
    - location
    - start_date (returns events starting on this date)

    If no filters are provided, all active events will be returned.
  `,
  })
  @ApiResponse({ status: 200, description: 'List of events successfully retrieved', type: [Event] })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid query parameter format (e.g., invalid date)' })
  async findManyEventWithFilter(@Query('search') search?: string, @Query('category_id') category_id?: string, @Query('location') location?: string, @Query('start_date') start_date?: string): Promise<Event[]> {
    const catId = category_id ? parseInt(category_id) : undefined;
    return this.eventService.findManyWithFilter(search, catId, location, start_date);
  }
