import {
    JsonController,
    Get,
    HttpCode,
    NotFoundError,
    Param,
    QueryParams,
} from 'routing-controllers';
import { PeopleProcessing } from '../services/people_processing.service';

const peopleProcessing = new PeopleProcessing();

@JsonController('/people', { transformResponse: false })
export default class PeopleController {
    @HttpCode(200)
    @Get('/')
    getAllPeople(@QueryParams() params: {
      search?: string, 
      page?: string;
     }) {
        const {
          data,
          total,
          page,
        } = peopleProcessing.getAll(params.search, params.page ? Number.parseInt(params.page) : 1);

        if (!data) {
            throw new NotFoundError('No people found');
        }

        return {
            data,
            page,
            total,
        };
    }

    @HttpCode(200)
    @Get('/:id')
    getPerson(@Param('id') id: number) {
        const person = peopleProcessing.getById(id);

        if (!person) {
            throw new NotFoundError('No person found');
        }

        return {
            data: person,
        };
    }
}
