"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().nonnegative(),
    inStock: zod_1.z.boolean(),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(variantValidationSchema),
    inventory: inventoryValidationSchema,
});
exports.default = productValidationSchema;
