"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMastersWhere = void 0;
function getMastersWhere({ dateFromQuery, dateToQuery, clientsQuery, categoriesQuery, productsQuery, }) {
    return `
    WHERE mo.date >= '${dateFromQuery}'
    AND mo.date <= '${dateToQuery}'
    ${clientsQuery ? `AND mo.client_id IN (${clientsQuery})` : ""}
    ${productsQuery ? `AND o.product_id IN (${productsQuery})` : ""}
    ${categoriesQuery ? `AND p.category_id IN (${categoriesQuery})` : ""}
`;
}
exports.getMastersWhere = getMastersWhere;
