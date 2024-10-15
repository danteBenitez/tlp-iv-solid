import { Request } from "express";
import { Schema, z, ZodError } from "zod";

class ValidationError extends Error {
    constructor(zod: ZodError) {
        super(zod.message);
    }
}

type ValidationResult<TSchema extends Schema> = {
    data: undefined,
    success: false,
    error: ValidationError
} | {
    data: z.infer<TSchema>,
    success: true,
    error: undefined
};

interface RequestValidator {
    validateRequest<TSchema extends Schema>(req: Request, schema: TSchema): Promise<z.infer<Schema>>;
    validateRequestBody<TSchema extends Schema>(req: Request, schema: TSchema): Promise<z.infer<Schema>>;
}

export class ValidationAdapter implements RequestValidator {
    async validateRequest<TSchema extends Schema>(req: Request, schema: TSchema) {
        const { data, success, error } = await schema.safeParseAsync(req);
        if (!success) {
            throw new ValidationError(error);
        }

        return data as z.infer<TSchema>;
    }

    async validateRequestBody<TSchema extends Schema>(req: Request, schema: TSchema) {
        const { data, success, error } = await schema.safeParseAsync(req.body);

        if (!success) {
            throw new ValidationError(error);
        }

        return data as z.infer<TSchema>;
    }
}

export const { validateRequest, validateRequestBody } = new ValidationAdapter();