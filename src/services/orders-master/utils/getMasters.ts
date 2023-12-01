export function getMastersWhere({
  dateFromQuery,
  dateToQuery,
  clientsQuery,
  categoriesQuery,
  productsQuery,
}: {
  dateFromQuery: string;
  dateToQuery: string;
  clientsQuery: string;
  categoriesQuery: string;
  productsQuery: string;
}) {
  return `
    WHERE mo.date >= '${dateFromQuery}'
    AND mo.date <= '${dateToQuery}'
    ${clientsQuery ? `AND mo.client_id IN (${clientsQuery})` : ""}
    ${productsQuery ? `AND o.product_id IN (${productsQuery})` : ""}
    ${categoriesQuery ? `AND p.category_id IN (${categoriesQuery})` : ""}
`;
}
