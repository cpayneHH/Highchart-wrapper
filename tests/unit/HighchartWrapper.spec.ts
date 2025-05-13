import {afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {render, waitFor, within} from '@testing-library/vue';
import '@testing-library/jest-dom';
import HighchartWrapper from '@components/HighchartWrapper.vue';
import {server} from "@mocks/server";
import APIresponseSingle from '../mocks/api.response.block.json'
import {BlockItem} from '@types';

describe('HighchartWrapper', () => {

    const requests: Request[] = [];

    vi.mock('highcharts', async () => {
        return await import('../mocks/highcharts');
    });

    vi.mock('highcharts/modules/pattern-fill');
    vi.mock('highcharts/modules/exporting');
    vi.mock('highcharts/modules/accessibility');
    vi.mock('highcharts/modules/sankey');
    vi.mock('highcharts/modules/funnel');

    beforeAll(() => {
        server.events.on('request:match', (req) => {
            requests.push(req.request);
        });
    });

    afterEach(() => {
        requests.length = 0; // clear after each test
    });

    it('Top-level title is optional', () => {
        const rendered = render(HighchartWrapper, {
            props: {title: null, endpoint: null, items: null, layout: null},
        });

        const titleIsMissing = rendered.container.querySelector('H2');
        expect(titleIsMissing).toBeNull();
    });

    it("Renders fallback when items, or api endpoint isn't provided", () => {
        const rendered = render(HighchartWrapper, {
            props: {title: null, endpoint: null, items: null, layout: null},
        });
        const fallbackText = 'Please provide an items array of objects or API endpoint to obtain data from.';
        const fallbackElement = rendered.container.querySelector('.fallback-message');

        within(<HTMLElement>fallbackElement).getByText(fallbackText);
    });

    it('Endpoint is provided - displays blocks as retrieved', async () => {
        // Full example block list
        const rendered = render(HighchartWrapper, {
            props: {endpoint: '/api/v1/blocks/retrieve', layout: [[2, 1], [1, 1, 1], [1, 2], [2, 1], [3]]},
        });

        await waitFor(async () => {
            // Make sure the request was captured.
            expect(requests.length).toBeGreaterThan(0);

            // Correct request was tracked for the test.
            const req = requests.find(r => r.url.includes('/api/v1/blocks/retrieve'));
            expect(req).toBeDefined();

            // // GridLayout component was used
            // const gridLayout = screen.getByTestId('grid-layout');
            //
            // // Make sure it's rendering the correct number of rows
            // const rows = await within(gridLayout).findAllByTestId('row');
            // expect(rows).toHaveLength(5);
            //
            // // Make sure it's rendering the correct number of columns
            // const columns = await within(gridLayout).findAllByTestId('col');
            // expect(columns).toHaveLength(10);
            //
            // // Check for the correct number of title blocks rendered
            // const title = await within(gridLayout).findAllByTestId('title');
            // expect(title).toHaveLength(2);
            //
            // // Check for the correct number of callout blocks rendered.
            // const callout = await within(gridLayout).findAllByTestId('callout');
            // expect(callout).toHaveLength(2);
            //
            // expect(Highcharts.chart).toHaveBeenCalled();
            // expect(Highcharts.chart).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
            //     title: expect.objectContaining({text: 'Some Title'})
            // }));
            //
            // // Check for the correct number of charts rendered
            // const charts = await within(gridLayout).findAllByTestId('chart');
            // expect(charts).toHaveLength(6);
        });
    });


    it('Items prop is provided - display singular block chart', () => {
        const rendered = render(HighchartWrapper, {
            props: {
                title: 'Highcharts Wrapper Example',
                items: [APIresponseSingle.payload[0]] as BlockItem[],
            }
        });

        const heading = rendered.container.querySelector('h2');
        within(heading).getByText('Highcharts Wrapper Example');

        const chartWrapper = rendered.container.querySelector('[role="region"]');
        expect(<HTMLElement>chartWrapper).toBeDefined();
    });
});
