import { check } from 'express-validator';

const completa = [
    check('fecha_inicio').isString().withMessage({status: 400, message: 'La fecha_inicio es obligatoria y debe ser string'}),
    check('fecha_final').isString().withMessage({status: 400, message: 'La fecha_final es obligatoria y debe ser string'}),
];

export const DTO = {
    "1.0.0": completa
}