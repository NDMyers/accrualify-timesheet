import { z } from 'zod'

export const addLineItemValidator = z.object({
    // We expect minutes input in form to be a number only
    minutes: z.number()
})