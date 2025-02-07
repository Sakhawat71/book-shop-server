import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        (this.modelQuery = modelQuery);
        (this.query = query);
    }

    search(searchableFields: string[]) {
        const search = this?.query?.search;
        if (this?.query?.search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' }
                }) as FilterQuery<T>)
            })
        }
        return this;
    };

    sort() {
        const sortBy = this?.query?.sortBy || 'createdAt';
        const sortOrder = this.query.sortOrder === "desc" ? "-" : "";
        this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
        return this;
    };

    filter() {
        const filter = this.query.filter as string;
        if (filter) {
            this.modelQuery = this.modelQuery.find({ author: filter } as FilterQuery<T>);
        }
        return this;
    }
};

export default QueryBuilder;