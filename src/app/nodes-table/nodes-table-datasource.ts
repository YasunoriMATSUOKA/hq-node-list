import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface NodesTableItem {
  port: number;
  host: string;
  protocol: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: NodesTableItem[] = [
  {id: 1, protocol: 'https', host: 'aqualife2.supernode.me', port: 7891},
  {id: 2, protocol: 'https',  host: 'aqualife3.supernode.me', port: 7891},
  {id: 3, protocol: 'https',  host: 'mnbhsgwbeta.supernode.me', port: 7891},
  {id: 4, protocol: 'https',  host: 'nemstrunk.supernode.me', port: 7891},
  {id: 5, protocol: 'https',  host: 'nemstrunk2.supernode.me', port: 7891},
  {id: 6, protocol: 'https',  host: 'pegatennnag.supernode.me', port: 7891},
  {id: 7, protocol: 'https',  host: 'shibuya.supernode.me', port: 7891},
  {id: 8, protocol: 'https',  host: 'nemlovely4.supernode.me', port: 7891},
  {id: 9, protocol: 'https',  host: 'nemlovely5.supernode.me', port: 7891},
];

/**
 * Data source for the NodesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class NodesTableDataSource extends DataSource<NodesTableItem> {
  data: NodesTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<NodesTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: NodesTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: NodesTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'port': return compare(a.port, b.port, isAsc);
        case 'host': return compare(a.host, b.host, isAsc);
        case 'protocol': return compare(a.protocol, b.protocol, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
