import {afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor, within} from '@testing-library/vue';
import '@testing-library/jest-dom';
import HighchartWrapper from '@components/HighchartWrapper.vue';
import {server} from '@mocks/server';
import Highcharts from '@mocks/highcharts';
import APIResponseSingle from '@mocks/api.response.block.json';
import APIResponseMultiple from '@mocks/api.response.blocks.json';
import {BlockItem} from '@types';
import {http, HttpResponse} from 'msw';

describe('HighchartWrapper Component Tests', () => {
    const requests: Request[] = [];

    // Mock Highcharts and its modules
    vi.mock('highcharts', async () => await import('../mocks/highcharts'));
    vi.mock('highcharts/modules/pattern-fill');
    vi.mock('highcharts/modules/exporting');
    vi.mock('highcharts/modules/accessibility');
    vi.mock('highcharts/modules/sankey');
    vi.mock('highcharts/modules/funnel');

    beforeAll(() => {
        server.events.on('request:match', (req) => requests.push(req.request));
    });

    afterEach(() => {
        // Clear tracked requests and mock calls
        requests.length = 0;
        Highcharts.chart.mockClear();
    });

    // Snapshot Test
    it('T001 - Snapshot: Full dashboard layout', async () => {
        const {container} = render(HighchartWrapper, {
            props: {
                title: 'Dashboard Snapshot',
                endpoint: '/api/v1/blocks/retrieve',
                layout: [[2, 1], [1, 1, 1], [1, 2], [2, 1], [3]],
            },
        });

        // Wait for all chart blocks to initialize
        await waitFor(() => {
            expect(Highcharts.chart).toHaveBeenCalledTimes(
                APIResponseMultiple.payload.filter(b => b.type === 'chart').length
            );
        });

        // Compare rendered output to snapshot
        expect(container).toMatchSnapshot();
    });

    // Prop Defaults
    it('T002 - Default Props: handles missing all props', () => {
        render(HighchartWrapper);

        // No level-2 heading when title omitted
        expect(screen.queryByRole('heading', {level: 2})).not.toBeInTheDocument();

        // Fallback message appears
        expect(
            screen.getByText(
                'Please provide an items array of objects or API endpoint to obtain data from.'
            )
        ).toBeInTheDocument();
    });

    // Partial Props
    it('T003 - Partial Props: title undefined, renders provided item', async () => {
        render(HighchartWrapper, {
            props: {
                items: [APIResponseSingle.payload[0]] as BlockItem[],
                layout: null,
            }
        });

        // No heading rendered
        expect(screen.queryByRole('heading', {level: 2})).not.toBeInTheDocument();

        // Chart stub should appear
        const chart = await screen.findByTestId('chart');
        expect(chart).toBeInTheDocument();
        expect(Highcharts.chart).toHaveBeenCalled();
    });

    it('T004 - Fetch via Endpoint: layout undefined', async () => {
        render(HighchartWrapper, {props: {endpoint: '/api/v1/blocks/retrieve'}});

        // Wait for all charts
        await waitFor(() => {
            expect(Highcharts.chart).toHaveBeenCalledTimes(
                APIResponseMultiple.payload.filter(b => b.type === 'chart').length
            );
        });
    });

    // Title Rendering
    it('T005 - Title Rendering: no h2 when title is null', () => {
        render(HighchartWrapper, {
            props: {title: null, endpoint: null, items: null, layout: null},
        });

        expect(
            screen.queryByRole('heading', {level: 2})
        ).not.toBeInTheDocument();
    });

    it('T006 - Title Rendering: renders h2 when title provided', () => {
        render(HighchartWrapper, {props: {title: 'My Title', items: [], layout: []}});

        expect(
            screen.getByRole('heading', {level: 2, name: 'My Title'})
        ).toBeInTheDocument();
    });

    // Fallback UI
    it('T007 - Fallback UI: shows message when no items or endpoint', () => {
        const {container} = render(HighchartWrapper, {
            props: {title: null, endpoint: null, items: null, layout: null},
        });

        const fallback = container.querySelector('.fallback-message');
        within(<HTMLElement>fallback).getByText(
            'Please provide an items array of objects or API endpoint to obtain data from.'
        );
    });

    // Full Endpoint-driven Render
    it('T008 - Full Render: displays grid and blocks from endpoint', async () => {
        render(HighchartWrapper, {
            props: {
                endpoint: '/api/v1/blocks/retrieve',
                layout: [[2, 1], [1, 1, 1], [1, 2], [2, 1], [3]],
            }
        });

        await waitFor(() => {
            // Verify network request
            expect(requests.length).toBeGreaterThan(0);
            const req = requests.find(r => r.url.includes('/api/v1/blocks/retrieve'));
            expect(req).toBeDefined();
        });

        // Inspect grid layout
        const grid = screen.getByTestId('grid-layout');

        // Rows count
        const rows = await within(grid).findAllByTestId('row');
        expect(rows).toHaveLength(5);

        // Columns count
        const cols = await within(grid).findAllByTestId('col');
        expect(cols).toHaveLength(10);

        // Title and callout counts
        const titles = await within(grid).findAllByTestId('title');
        expect(titles).toHaveLength(2);
        const callouts = await within(grid).findAllByTestId('callout');
        expect(callouts).toHaveLength(2);

        // Charts rendered
        expect(Highcharts.chart).toHaveBeenCalled();
        const charts = await within(grid).findAllByTestId('chart');
        expect(charts).toHaveLength(6);
    });

    // Single-item Render
    it('T009 - Single Item: renders one chart via items prop', () => {
        const {container} = render(HighchartWrapper, {
            props: {title: 'Single Chart', items: [APIResponseSingle.payload[0]] as BlockItem[]}
        });

        // Verify heading text
        within(container.querySelector('h2')!).getByText('Single Chart');

        // Container role
        expect(container.querySelector('[role="region"]')).toBeDefined();
    });

    // Error Handling
    it('T010 - Error & Retry: shows error and retries fetch', async () => {
        // Mock server to throw
        server.use(
            http.get('/api/v1/blocks/retrieve', ({request, params, cookies}) => HttpResponse.error())
        );

        render(HighchartWrapper, {props: {endpoint: '/api/v1/blocks/retrieve'}});

        // Error state appears
        const errMsg = await screen.findByText(/Failed to load data/i);
        expect(errMsg).toBeInTheDocument();

        // Mock success on retry
        server.use(
            http.get('/api/v1/blocks/retrieve', () => HttpResponse.json(APIResponseSingle))
        );

        // Click retry
        const retryBtn = screen.getByRole('button', {name: /Retry/i});
        await retryBtn.click();

        // Ensure error cleared and chart called
        await waitFor(() => {
            expect(screen.queryByText(/Failed to load data/i)).not.toBeInTheDocument();
            expect(Highcharts.chart).toHaveBeenCalled();
        });
    });

    // Layout Overflow/Underflow
    it('T011 - Layout Overflow: ignores extra items beyond layout slots', async () => {
        render(HighchartWrapper, {
            props: {
                items: [
                    APIResponseMultiple.payload[0],
                    APIResponseMultiple.payload[0],
                    APIResponseMultiple.payload[0]
                ] as BlockItem[],
                layout: [[1, 1], [1]]
            }
        });

        const grid = screen.getByTestId('grid-layout');
        const cols = await within(grid).findAllByTestId('col');
        expect(cols).toHaveLength(3);
        expect(Highcharts.chart).toHaveBeenCalledTimes(3);
    });

    it('T012 - Layout Underflow: only renders available items', async () => {
        render(HighchartWrapper, {
            props: {
                items: [APIResponseSingle.payload[0]] as BlockItem[],
                layout: [[1, 1, 1]]
            }
        });

        const grid = screen.getByTestId('grid-layout');
        const charts = await within(grid).findAllByTestId('chart');
        expect(charts).toHaveLength(1);
        expect(Highcharts.chart).toHaveBeenCalledTimes(1);
    });

    it('T013 - Option Sanitization: strips axes and pointStart for non-axis charts', async () => {
        const pieBlock: BlockItem = {
            id: 11,
            type: 'chart',
            title: 'Pie Chart',
            options: {
                chart: {type: 'pie'},
                xAxis: {title: {text: 'REMOVE ME'}},
                yAxis: {title: {text: 'REMOVE ME TOO'}},
                plotOptions: {series: {pointStart: 5}},
                series: [{type: 'pie', name: 'A', data: [1, 2, 3]}],
            },
        };

        Highcharts.chart.mockClear();
        render(HighchartWrapper, {
            props: {items: [pieBlock], layout: null}
        });

        // Wait for chart initialization
        await waitFor(() => expect(Highcharts.chart).toHaveBeenCalled());

        const opts = Highcharts.chart.mock.calls[0][1];
        expect(opts.xAxis).toBeUndefined();
        expect(opts.yAxis).toBeUndefined();
        expect(opts.plotOptions?.series?.pointStart).toBeUndefined();
    });

});
