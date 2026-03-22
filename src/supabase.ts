import { db, getNextId } from './mockData';

type Operator = 'eq' | 'neq' | 'in' | 'contains';

interface Filter {
  op: Operator;
  field: string;
  value: any;
}

const clone = (x: any) => JSON.parse(JSON.stringify(x));

class Query {
  table: keyof typeof db;
  filters: Filter[] = [];
  orderField?: string;
  orderAscending = true;
  limitCount?: number;
  shouldSingle = false;

  constructor(table: keyof typeof db) {
    this.table = table;
  }

  select(): this {
    return this;
  }

  eq(field: string, value: any): this {
    this.filters.push({ op: 'eq', field, value });
    return this;
  }

  'in'(field: string, values: any[]): this {
    this.filters.push({ op: 'in', field, value: values });
    return this;
  }

  contains(field: string, value: any): this {
    this.filters.push({ op: 'contains', field, value });
    return this;
  }

  or(expression: string): this {
    const clauses = expression.split(',').map(c => c.trim());
    const orFn = (row: any) => {
      return clauses.some(clause => {
        const [expr, value] = clause.split('=');
        const [field, op] = expr.split('.');
        if (op === 'eq') {
          return row[field] === value;
        }
        return false;
      });
    };
    this.filters.push({ op: 'eq', field: '__or__', value: orFn });
    return this;
  }

  order(field: string, opt: { ascending: boolean }) {
    this.orderField = field;
    this.orderAscending = opt?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  single() {
    this.shouldSingle = true;
    return this;
  }

  private applyFilters(rows: any[]) {
    return rows.filter(row => {
      return this.filters.every(filter => {
        if (filter.field === '__or__') {
          return (filter.value as (row: any) => boolean)(row);
        }
        const actual = row[filter.field];
        switch (filter.op) {
          case 'eq':
            return actual === filter.value;
          case 'in':
            return Array.isArray(filter.value) ? (filter.value as any[]).includes(actual) : false;
          case 'contains':
            if (Array.isArray(actual)) {
              if (Array.isArray(filter.value)) {
                return (filter.value as any[]).every(v => actual.includes(v));
              }
              return actual.includes(filter.value);
            }
            if (typeof actual === 'string' && typeof filter.value === 'string') {
              return actual.toLowerCase().includes(filter.value.toLowerCase());
            }
            return false;
          default:
            return true;
        }
      });
    });
  }

  async exec() {
    const tableData = (db[this.table] ?? []) as any[];
    let results = clone(tableData);

    if (this.filters.length > 0) {
      results = this.applyFilters(results);
    }

    if (this.orderField) {
      results.sort((a, b) => {
        const aVal = a[this.orderField!];
        const bVal = b[this.orderField!];
        if (aVal === bVal) return 0;
        if (aVal === undefined || aVal === null) return 1;
        if (bVal === undefined || bVal === null) return -1;
        return this.orderAscending ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
      });
    }

    if (typeof this.limitCount === 'number') {
      results = results.slice(0, this.limitCount);
    }

    if (this.shouldSingle) {
      return { data: results[0] ?? null, error: null };
    }

    return { data: results, error: null };
  }

  then(resolve: (value: any) => void, reject: (reason?: any) => void) {
    this.exec().then(resolve).catch(reject);
  }

  async insert(payload: any) {
    const items: any[] = Array.isArray(payload) ? payload : [payload];
    const created = items.map(entry => {
      const newRow = { id: entry.id ?? getNextId(), ...entry };
      (db[this.table] as any[]).push(newRow);
      return newRow;
    });
    return { data: Array.isArray(payload) ? created : created[0], error: null };
  }

  async update(payload: any) {
    const tableData = db[this.table] as any[];
    const matched = this.applyFilters(clone(tableData));
    const updated: any[] = [];

    for (const row of matched) {
      const idx = tableData.findIndex(item => item.id === row.id);
      if (idx >= 0) {
        tableData[idx] = { ...tableData[idx], ...payload };
        updated.push(tableData[idx]);
      }
    }

    return { data: updated, error: null };
  }

  async delete() {
    const tableData = db[this.table] as any[];
    const matched = this.applyFilters(clone(tableData));
    db[this.table] = tableData.filter(item => !matched.some(row => row.id === item.id)) as any;
    return { data: matched, error: null };
  }
}

export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: db.profiles[0] }, error: null }),
    signInWithPassword: async (email: string, password: string) => ({ data: { user: db.profiles.find(u => u.email === email) ?? db.profiles[0] }, error: null}),
    signInWithOAuth: async () => ({ data: { user: db.profiles[0] }, error: null }),
    signOut: async () => ({ data: null, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => null } } }),
  },
  from: (table: keyof typeof db) => new Query(table),
  storage: {
    from: () => ({ upload: async () => ({ data: null, error: null }), download: async () => ({ data: null, error: null }), createSignedUrl: async () => ({ data: { signedUrl: '' }, error: null }), getPublicUrl: async () => ({ data: { publicUrl: '' }, error: null}), remove: async () => ({ data: null, error: null }) }),
  },
  channel: (name: string) => {
    const channelObj = {
      on: (event: string, opts: any, callback?: any) => {
        // no real realtime; return chainable placeholder
        return channelObj;
      },
      subscribe: () => ({ unsubscribe: () => null }),
      unsubscribe: () => null,
    };
    return channelObj;
  },
  removeChannel: () => null,
  rpc: async () => ({ data: null, error: null }),
};
