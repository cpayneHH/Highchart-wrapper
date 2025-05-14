import {http, HttpResponse} from 'msw';
import APIBlocks from '@mocks/api.response.blocks.json';
import APIBlock from '@mocks/api.response.block.json';

export const handlers = [
    http.get('/api/v1/blocks/retrieve', ({params}) => {
        return HttpResponse.json(APIBlocks);
    }),
    http.get('/api/v1/block/1/retrieve', ({params}) => {
        return HttpResponse.json(APIBlock);
    })
];
