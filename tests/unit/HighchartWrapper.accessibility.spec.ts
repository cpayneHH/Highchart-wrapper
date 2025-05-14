import {afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/vue';
import '@testing-library/jest-dom';
import HighchartWrapper from '@components/HighchartWrapper.vue';
import Highcharts from '@mocks/highcharts';
import {server} from '@mocks/server';
import APIResponseMultiple from '@mocks/api.response.blocks.json';
import type {BlockItem} from '@types';

describe('HighchartWrapper Accessibility Tests', () => {
    const requests: Request[] = [];

    // Mock Highcharts and its modules
    vi.mock('highcharts', async () => import('../mocks/highcharts'));
    vi.mock('highcharts/modules/pattern-fill');
    vi.mock('highcharts/modules/exporting');
    vi.mock('highcharts/modules/accessibility');
    vi.mock('highcharts/modules/sankey');
    vi.mock('highcharts/modules/funnel');

    beforeAll(() => {
        // Capture every outgoing request
        server.events.on('request:match', (req) => {
            requests.push(req.request);
        });
    });

    afterEach(() => {
        // Reset between tests
        requests.length = 0;
        Highcharts.chart.mockClear();
    });

    it('A001 – Landmark roles: renders a page heading and three chart regions', async () => {
        // Arrange: pick the first three chart‐type blocks
        const chartItems = (APIResponseMultiple.payload.filter(b => b.type === 'chart') as BlockItem[]).slice(0, 3);

        // Act: render with a simple 3-column layout
        render(HighchartWrapper, {
            props: {
                title: 'Dashboard Overview',
                items: chartItems,
                layout: [[1, 1, 1]],
            },
        });

        // Wait for all three charts to initialize
        await waitFor(() => {
            expect(Highcharts.chart).toHaveBeenCalledTimes(3);
        });

        // Assert: there’s a level-2 heading with the page title
        const pageTitle = screen.getByRole('heading', {
            level: 2,
            name: 'Dashboard Overview',
        });
        expect(pageTitle).toBeInTheDocument();

        // Assert: exactly three chart regions are present
        const regions = screen.getAllByTestId('chart-region');
        expect(regions).toHaveLength(3);

        // Assert: each region has an aria-label matching its chart’s title
        regions.forEach((region, i) => {
            const expectedTitle = chartItems[i].options.title.text;
            expect(region).toHaveAccessibleName(expectedTitle);
        });
    });
});
