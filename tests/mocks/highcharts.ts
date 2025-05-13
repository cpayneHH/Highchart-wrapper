// tests/__mocks__/highcharts.ts
import {vi} from "vitest";

export const chart = vi.fn();
export const setOptions = vi.fn();
export const addEvent = vi.fn();
export const removeEvent = vi.fn();
export const wrap = vi.fn();

export default {
    chart,
    setOptions,
    addEvent,
    removeEvent,
    wrap,
    Series: {
        types: {
            sankey: {
                prototype: {}
            }
        }
    }
};
