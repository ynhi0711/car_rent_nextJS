export class PagingDto<T> {
  items: Array<T>;
  pagination: any;
  constructor(data: Array<T>, total: number, limit: number, offset: number) {
    this.items = data;
    this.pagination = {
      total: total,
      limit: limit,
      offset: offset,
    };
  }
}
