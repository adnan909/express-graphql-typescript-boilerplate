import { GraphQLID, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';

import { Context } from '../../context';
import { BookType } from './book.type';
import { AbstractQuery, IGraphQLQuery } from '../abstract.query';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:book:FindBookByIdQuery');


export class FindBookByIdQuery extends AbstractQuery implements GraphQLFieldConfig, IGraphQLQuery {

    public type = BookType;

    public allow = ['admin'];

    public args = {
        id: { type: new GraphQLNonNull(GraphQLID) }
    };

    public before(context: Context, args: arguments.ID) {
        log.debug('hook before args', args);
        return Promise.resolve(args);
    }

    public after(result: any, context: Context, args: any, source?: any) {
        log.debug('hook after args', args);
        log.debug('hook after source', source);
        return Promise.resolve(result);
    }

    public execute(root, args: arguments.ID, context: Context) {
        log.debug('resolve findBookById(%s)', args.id);
        return context.repos.book.findBookById(args.id);
    }

}