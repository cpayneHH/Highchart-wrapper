/**
 * Defines a URL endpoint to request data from.
 */
export type APIEndpoint = string;

/**
 * Defines an array where each row is an array of column spans. e.g. [ [1, 1], [1] ]
 */
export type LayoutGrid = number[][];

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
 * A single chart block, containing Highcharts options.
 */
export interface ChartBlockItem {
    id: string | number;
    type: 'chart';
    title?: string;
    options: any; // ← safest if you’re already validating with JSON schemas or runtime
}

/**
 * A block representing a styled callout.
 */
export interface CalloutBlockItem {
    id: string | number;
    type: 'callout';
    title?: string;
    options: CalloutOptions;
}

/**
 * A block representing a visual title.
 */
export interface TitleBlockItem {
    id: string | number;
    type: 'title';
    title?: string;
    options: TitleOptions;
}

/**
 * Union of all block types that can be rendered.
 */
export type BlockItem = ChartBlockItem | CalloutBlockItem | TitleBlockItem;

/**
 * Shape of the JSON response returned by the data API.
 */
export interface APIResponse {
    status: string;
    message: string;
    attributes: Array<{ name: string; value: string | number }>;
    payload: BlockItem[];
}

/**
 * Props for the GridLayout component.
 */
export interface GridLayoutProps {
    layout: LayoutGrid;
    items: BlockItem[];
}

/**
 * Props for the HighchartWrapper component.
 */
export interface WrapperProps {
    title?: string;
    endpoint?: APIEndpoint;
    items?: BlockItem[];
    layout?: LayoutGrid;
}
