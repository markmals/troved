import { z } from 'npm:@hono/zod-openapi';

export const SearchResult = z
    .object({
        id: z.number().int(),
        overview: z.string().optional(),
        name: z.string().optional(),
    })
    .openapi('SearchResult');

export const SearchResults = z.array(SearchResult);

export const AirDates = z
    .object({
        day: z.string(),
        time: z.string(),
        timezone: z.string(),
    })
    .openapi('AirDates');

export const Subscription = z
    .object({ id: z.number().int() })
    .openapi('Subscription');
