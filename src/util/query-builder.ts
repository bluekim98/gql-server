export function createWhere(where: Record<string, any>, alias: string) {
    const keys = Object.keys(where);

    const conditions: string[] = [];
    const param = {};
    let index = 0;
    for (const key of keys) {
        const keySet = key.split('__');
        const property = keySet[0];
        const op = keySet[1];
        const paramTitle = `${property}_${index++}`;
        const query = createQuery(property, op, alias, paramTitle);
        conditions.push(query);
        param[paramTitle] = where[key];
    }

    return {
        condition: conditions.join(' and '),
        param,
    };
}

function createQuery(
    property: string,
    op: string,
    alias: string,
    paramTitle: string,
) {
    switch (op) {
        case 'in':
            return `${alias}.${property} in (:${paramTitle})`;
        default:
            return `${alias}.${property} = :${paramTitle}`;
    }
}
