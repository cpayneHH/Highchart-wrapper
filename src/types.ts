import Highcharts from 'highcharts';

/**
 * Defines a url endpoint to request data from.
 */
export type APIEndpoint = string;

/**
 * Defines an array where each row is an array of column spans. e.g. [ [1, 1], [1] ]
 */
export type LayoutGrid = number[][];

/**
 * The supported block types to render: title, callout, or chart.
 */
export type BlockType = 'title' | 'callout' | 'chart';

/**
 * A single content block, which may be a title, callout, or chart.
 */
export interface BlockItem {
    /** Unique identifier for the block. */
    id: string;
    /** The type of block to render. */
    type: BlockType;
    /** The main title text. */
    title: string;
    /** Configuration options for the block. */
    options: Highcharts.SeriesOptions | CalloutOptions | TitleOptions;
}

/**
 * Options for rendering a callout block with title and description.
 */
export interface CalloutOptions {
    /** The heading text displayed prominently in the callout. */
    title?: string;
    /** Additional descriptive text for the callout. */
    description: string;
}

/**
 * Options for rendering a title block with heading and optional description.
 */
export interface TitleOptions {
    /** The main title text. */
    title?: string;
    /** Optional subtitle or description below the title. */
    description?: string;
}

/**
 * Shape of the JSON response returned by the data API.
 */
export interface APIResponse {
    /** Status of the API call (e.g., "success", "error"). */
    status: string;
    /** Human-readable message from the API. */
    message: string;
    /** Additional attributes returned by the API. */
    attributes: Array<{ name: string; value: string | number }>;
    /** The array of blocks to render. */
    payload: BlockItem[];
}

/**
 * Props for the GridLayout component.
 */
export interface GridLayoutProps {
    /** Grid layout configuration where each row defines column spans. */
    layout: LayoutGrid;
    /** The blocks to render within the grid. */
    items: BlockItem[];
}

/**
 * Props passed to the HighchartWrapper component.
 */
export interface WrapperProps {
    /** The title displayed at the top of the wrapper. */
    title?: string;
    /** Optional API endpoint to fetch blocks if `items` is empty. */
    endpoint?: APIEndpoint;
    /** Optional array of blocks to render. */
    items?: BlockItem[];
    /** Optional layout grid to control block positioning. */
    layout?: LayoutGrid;
}
