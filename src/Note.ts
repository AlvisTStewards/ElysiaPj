import { disableValidators } from 'discord.js';
import { Param } from './../node_modules/@scalar/types/dist/external/httpsnippet-lite.d';
import { Elysia, error, t } from "elysia";


class Note {
    constructor(
      public data: string[] = ['Hello From The Moon']
    ) {}

    add(note: string) { 
        this.data.push(note) 

        return this.data 
    }

    remove(index: number) { 
        return this.data.splice(index, 1) 
    }

    update(index: number, note: string) { 
        return (this.data[index] = note) 
    }

}

// asihdklashdasdasdasasd
// asdasdasdas
// disableValidatorsasd
// AsyncDisposableStackasdas
// DataTransfersd
// AsyncDisposableStackas
// DataTransfersd
// AsyncDisposableStackas
// das
// DataTransfersd
// as
// dasd

export const note = new Elysia({prefix: '/note'})
    .decorate("Note", new Note())
    .guard(
        {
            Params: t.Object({
                id: t.Number()
            })
        }
    )
    .get("/", ({ Note }) => Note.data)
    .get( "/:id", 
            ({ Note , params: { id }, error}) => Note.data[Number(id)] ?? error(422, "Note not found"))
    .put('/', ({ Note, body: { data } }) => Note.add(data), { 
        body: t.Object({ 
            data: t.String() 
        }) 
    })
    .delete('/:id', ({ Note, params: { id }, error }) => Note.remove(id) ?? error(422, "Note not found"), {
        params: t.Object({
            id: t.Number()
        })
    })
    .patch( 
        '/:index', 
        ({ Note, params: { index }, body: { data }, error }) => { 
            if (index in Note.data) return Note.update(index, data) 
            return error(422) 
        }, 
        { 
            params: t.Object({ 
                index: t.Number() 
            }), 
            body: t.Object({ 
                data: t.String() 
            }) 
        } 
    ) 
